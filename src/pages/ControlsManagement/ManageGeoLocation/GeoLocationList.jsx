import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit3, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { controlsManagementService } from "../../../services/controlsManagementService";

export default function GeoLocationList() {
  const navigate = useNavigate();
  const [geoList, setGeoList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // ============================
  // Fetch Geo Locations
  // ============================
  const fetchGeoLocations = async () => {
    setLoading(true);
    const data = await controlsManagementService.geo_locations.list();
    setGeoList(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchGeoLocations();
  }, []);

  // ============================
  // Delete Geo Location
  // ============================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this geo location?")) return;
    const success = await controlsManagementService.geo_locations.delete(id);
    if (success) fetchGeoLocations();
  };

  // ============================
  // Search Filter
  // ============================
  const filteredList = geoList.filter((item) =>
    `${item.country} ${item.state} ${item.city} ${item.area}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Geo Location Management</h1>
        <p className="text-sm text-gray-500">
          Manage country, state, city and area hierarchy
        </p>
      </div>

      {/* Search + Add */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <div className="flex items-center bg-white rounded-2xl p-3 gap-3 shadow-sm w-full md:w-1/2">
          <FiSearch className="text-gray-400" />
          <input
            placeholder="Search by country, state, city or area"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm text-gray-700"
          />
        </div>

        <button
          onClick={() => navigate("/controls/geo-location/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-2xl shadow hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Geo Location
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-50 rounded-2xl p-4 shadow-inner">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredList.length === 0 ? (
          <p className="text-center text-gray-500">No geo locations found</p>
        ) : (
          <GeoTable
            data={filteredList}
            onEdit={(id) => navigate(`/controls/geo-location/edit/${id}`)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </MainLayout>
  );
}

// ======================================================
// Table Component
// ======================================================
const GeoTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="hidden md:grid grid-cols-5 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
        <div>Country</div>
        <div>State</div>
        <div>City</div>
        <div>Area</div>
        <div className="text-right">Actions</div>
      </div>

      {/* Rows */}
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl px-5 py-4 shadow hover:shadow-md transition grid grid-cols-2 md:grid-cols-5 gap-y-2 items-center text-sm"
        >
          <div className="font-medium text-gray-900">{item.country}</div>
          <div>{item.state}</div>
          <div>{item.city}</div>
          <div>{item.area}</div>

          <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
            <IconButton color="blue" onClick={() => onEdit(item.id)}>
              <FiEdit3 />
            </IconButton>
            <IconButton color="red" onClick={() => onDelete(item.id)}>
              <FiTrash2 />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

// ======================================================
// Icon Button
// ======================================================
const IconButton = ({ children, onClick, color }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200 transition`}
  >
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
