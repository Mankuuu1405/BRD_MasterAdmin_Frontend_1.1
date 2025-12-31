import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { controlsManagementService } from "../../../services/controlsManagementService";

export default function GeoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    area: "",
  });

  useEffect(() => {
    if (isEdit) fetchGeoLocation();
  }, [id]);

  const fetchGeoLocation = async () => {
    setLoading(true);
    const data = await controlsManagementService.geo_locations.retrieve(id);
    if (data) {
      setFormData({
        country: data.country || "",
        state: data.state || "",
        city: data.city || "",
        area: data.area || "",
      });
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (isEdit) {
      await controlsManagementService.geo_locations.update(
        id,
        formData
      );
    } else {
      await controlsManagementService.geo_locations.create(formData);
    }
    setLoading(false);
    navigate("/controls/geo");
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Edit Geo Location" : "Add Geo Location"}
          </h1>
          <p className="text-sm text-gray-500">
            Define country, state, city and area
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-6 space-y-5"
        >
          <FormInput
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
          />

          <FormInput
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
          />

          <FormInput
            label="City / District"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
          />

          <FormInput
            label="Area / Locality"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Enter area"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/controls/geo")}
              className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

const FormInput = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      required
    />
  </div>
);
