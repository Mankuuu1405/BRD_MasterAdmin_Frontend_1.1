import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { useNavigate } from "react-router-dom";

export default function AgentAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "",
    category: "",
    level: "",
    constitution: "",
    location: "",
    serviceType: "",
    responsibilities: [],
  });

  const toggle = (value) => {
    setForm((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.includes(value)
        ? prev.responsibilities.filter((v) => v !== value)
        : [...prev.responsibilities, value],
    }));
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    console.log("Add Agent:", form);
    navigate("/profile-management/agent");
  };

  return (
    <MainLayout>
      <h1 className="text-xl font-semibold mb-4">Add Agent</h1>

      <div className="bg-white p-6 rounded-2xl shadow grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select name="type" label="Agent Type" onChange={handleChange}>
          <option value="">Select</option>
          <option>DSA</option>
          <option>Sourcing</option>
          <option>Collection</option>
        </Select>

        <Select name="category" label="Agent Category" onChange={handleChange}>
          <option value="">Select</option>
          <option>Freelance</option>
          <option>Company</option>
          <option>Employee</option>
        </Select>

        <Select name="level" label="Agent Level" onChange={handleChange}>
          <option value="">Select</option>
          <option>Tier 1</option>
          <option>Tier 2</option>
        </Select>

        <Select
          name="constitution"
          label="Agent Constitution"
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option>Individual</option>
          <option>Firm</option>
          <option>Company</option>
        </Select>

        <Input
          name="location"
          label="Location"
          onChange={handleChange}
        />

        <Select
          name="serviceType"
          label="Service Type"
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option>Lead Generation</option>
          <option>Documentation</option>
          <option>Collection</option>
        </Select>

        {/* Responsibilities */}
        <div className="md:col-span-2">
          <p className="text-sm font-medium mb-2">Responsibilities</p>
          <div className="grid grid-cols-2 gap-2">
            {["Sourcing", "Collection", "Support"].map((r) => (
              <label key={r} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.responsibilities.includes(r)}
                  onChange={() => toggle(r)}
                />
                {r}
              </label>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-xl bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl"
          >
            Save Agent
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

/* Reusable */
const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input {...props} className="w-full mt-1 p-2 border rounded-lg" />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select {...props} className="w-full mt-1 p-2 border rounded-lg">
      {children}
    </select>
  </div>
);
