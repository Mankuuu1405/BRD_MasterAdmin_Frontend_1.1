import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit3, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MOCK_GEO_DATA = [
  {
    id: "298dc7df-c302-4429-bf57-5ad25de2c40e",
    status: "ACTIVE",
    country: "India",
    state: "Gujarat",
    city: "Vadodara",
    area: "Karelibaug"
  },
  {
    id: "ab12c7df-c302-1111-bf57-5ad25de21111",
    status: "ACTIVE",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    area: "Andheri"
  }
];

export default function GeoLocationList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [geoList, setGeoList] = useState(MOCK_GEO_DATA);

  const filtered = geoList.filter((g) =>
    `${g.country} ${g.state} ${g.city} ${g.area}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!window.confirm("Delete this geo location?")) return;
    setGeoList(geoList.filter((g) => g.id !== id));
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Geo Locations</h1>
          <p className="text-sm text-gray-500">
            Manage country, state, city and area hierarchy
          </p>
        </div>

        <button
          onClick={() => navigate("/controls/geo/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          <FiPlus /> Add Geo Location
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          placeholder="Search country, state, city or area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Table */}
      <div className="space-y-3">
        <div className="hidden md:grid grid-cols-6 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Country</div>
          <div>State</div>
          <div>City</div>
          <div>Area</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filtered.map((g) => (
          <div
            key={g.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-6 gap-y-2 items-center text-sm"
          >
            <div className="font-medium">{g.country}</div>
            <div>{g.state}</div>
            <div>{g.city}</div>
            <div>{g.area}</div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                {g.status}
              </span>
            </div>
            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <IconButton
                color="blue"
                onClick={() =>
                  navigate(`/controls/geo/edit/${g.id}`)
                }
              >
                <FiEdit3 />
              </IconButton>
              <IconButton color="red" onClick={() => handleDelete(g.id)}>
                <FiTrash2 />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

const IconButton = ({ children, onClick, color }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200`}
  >
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
