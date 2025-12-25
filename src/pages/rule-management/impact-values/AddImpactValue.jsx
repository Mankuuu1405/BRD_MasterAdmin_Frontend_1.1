import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const RULES = [
  "Age Eligibility Rule",
  "Business Vintage Rule",
  "Credit Score Rule",
];

export default function AddImpactValue() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rule_name: "",
    impact_type: "Positive",
    impact_value: "",
    risk_impact: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Impact Value:", form);
    navigate("/rule-management/impact-values");
  };

  return (
    <MainLayout>
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">Add Impact Value</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Select
          label="Rule Name"
          name="rule_name"
          value={form.rule_name}
          onChange={handleChange}
          options={RULES}
          required
        />

        <Select
          label="Impact Type"
          name="impact_type"
          value={form.impact_type}
          onChange={handleChange}
          options={["Positive", "Negative"]}
        />

        <Input
          label="Impact Value"
          name="impact_value"
          type="number"
          value={form.impact_value}
          onChange={handleChange}
          required
        />

        <Select
          label="Risk Impact"
          name="risk_impact"
          value={form.risk_impact}
          onChange={handleChange}
          options={["Low", "Medium", "High"]}
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={["Active", "Inactive"]}
        />

        <div className="md:col-span-2 flex justify-end">
          <button className="px-5 py-3 bg-indigo-600 text-white rounded-xl flex items-center gap-2">
            <FiSave /> Save Impact
          </button>
        </div>
      </form>
    </MainLayout>
  );
}

/* ---- Inputs ---- */

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border text-sm"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border text-sm"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);
