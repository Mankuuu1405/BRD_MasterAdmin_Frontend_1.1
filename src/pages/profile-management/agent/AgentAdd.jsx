import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { useNavigate } from "react-router-dom";

export default function AgentAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    agent_type: "",
    agent_category: "",
    agent_level: "",
    agent_constitution: "",
    agent_location: "",
    agent_service_type: "",
    agent_responsibility: [],
  });

  const handleChange = (e) => {
    const { name, value, options } = e.target;

    // handle multi-select
    if (options) {
      const selectedValues = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);

      setForm({ ...form, [name]: selectedValues });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = () => {
    console.log("Add Agent Profile:", form);
    navigate("/profile-management/agent");
  };

  return (
    <MainLayout>
      <h1 className="text-xl font-semibold mb-4">
        Agent Profile Management
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Agent Type */}
        <Select name="agent_type" label="Agent Type" onChange={handleChange}>
          <option value="">Select</option>
          <option>DSA</option>
          <option>Sourcing</option>
          <option>Field</option>
          <option>Collection</option>
        </Select>

        {/* Agent Category */}
        <Select name="agent_category" label="Agent Category" onChange={handleChange}>
          <option value="">Select</option>
          <option>Freelance</option>
          <option>Company</option>
          <option>Employee</option>
        </Select>

        {/* Agent Level */}
        <Select name="agent_level" label="Agent Level" onChange={handleChange}>
          <option value="">Select</option>
          <option>Tier 1</option>
          <option>Tier 2</option>
          <option>Tier 3</option>
        </Select>

        {/* Agent Constitution */}
        <Select
          name="agent_constitution"
          label="Agent Constitution"
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option>Individual</option>
          <option>Firm</option>
          <option>Company</option>
        </Select>

        {/* Agent Location */}
        <Input
          name="agent_location"
          label="Agent Location"
          placeholder="Operational geography"
          onChange={handleChange}
        />

        {/* Agent Service Type */}
        <Select
          name="agent_service_type"
          label="Agent Service Type"
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option>Lead Gen</option>
          <option>Documentation</option>
          <option>Verification</option>
        </Select>

        {/* ✅ Agent Responsibility – MULTI SELECT DROPDOWN */}
        <MultiSelect
          name="agent_responsibility"
          label="Agent Responsibility"
          value={form.agent_responsibility}
          onChange={handleChange}
        >
          <option value="Sourcing">Sourcing</option>
          <option value="Collection">Collection</option>
          <option value="Support">Support</option>
        </MultiSelect>

        {/* Actions */}
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

/* Reusable Components */

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

const MultiSelect = ({ label, children, ...props }) => (
  <div className="md:col-span-2">
    <label className="text-sm font-medium">{label}</label>
    <select
      multiple
      {...props}
      className="w-full mt-1 p-2 border rounded-lg h-32"
    >
      {children}
    </select>
    <p className="text-xs text-gray-500 mt-1">
      Hold Ctrl / Cmd to select multiple
    </p>
  </div>
);
