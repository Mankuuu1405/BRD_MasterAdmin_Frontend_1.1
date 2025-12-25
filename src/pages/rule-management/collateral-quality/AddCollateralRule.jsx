import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const COLLATERAL_TYPES = ["Property", "Vehicle", "Gold", "FD", "Insurance"];
const OWNERSHIP_TYPES = ["Self", "Family", "Company"];
const RISK_LEVELS = ["Low", "Medium", "High"];
const STATUS = ["Active", "Inactive"];

export default function AddCollateralRule() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    collateral_type: "",
    ownership: "",
    min_value: "",
    max_value: "",
    ltv: "",
    risk: "",
    remarks: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Collateral Rule:", form);
    navigate("/rule-management/collateral-quality");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">Add Collateral Quality Rule</h1>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Select
          label="Collateral Type"
          name="collateral_type"
          value={form.collateral_type}
          onChange={handleChange}
          options={COLLATERAL_TYPES}
          required
        />

        <Select
          label="Ownership"
          name="ownership"
          value={form.ownership}
          onChange={handleChange}
          options={OWNERSHIP_TYPES}
          required
        />

        <Input
          label="Minimum Market Value"
          name="min_value"
          type="number"
          value={form.min_value}
          onChange={handleChange}
          required
        />

        <Input
          label="Maximum Market Value"
          name="max_value"
          type="number"
          value={form.max_value}
          onChange={handleChange}
        />

        <Input
          label="Allowed LTV (%)"
          name="ltv"
          value={form.ltv}
          onChange={handleChange}
          placeholder="e.g. 60, 70, 80"
          required
        />

        <Select
          label="Risk Level"
          name="risk"
          value={form.risk}
          onChange={handleChange}
          options={RISK_LEVELS}
          required
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={STATUS}
        />

        <Textarea
          label="Remarks"
          name="remarks"
          value={form.remarks}
          onChange={handleChange}
          className="md:col-span-2"
        />

        <div className="md:col-span-2 flex justify-end">
          <button className="px-5 py-3 bg-indigo-600 text-white rounded-xl flex items-center gap-2">
            <FiSave /> Save Rule
          </button>
        </div>
      </form>
    </MainLayout>
  );
}

/* ---------- UI HELPERS ---------- */

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

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <textarea
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border text-sm"
    />
  </div>
);
