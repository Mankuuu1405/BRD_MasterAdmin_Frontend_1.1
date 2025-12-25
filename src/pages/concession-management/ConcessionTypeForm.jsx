import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const APPLICABLE_ON = ["Sanction", "Disbursement", "Repayment"];
const STATUS = ["Active", "Inactive"];

export default function ConcessionTypeForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type_name: "",
    applicable_on: "",
    description: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Concession Type:", form);
    navigate("/concession-management");
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
        <div>
          <h1 className="text-2xl font-bold">Add Concession Type</h1>
          <p className="text-sm text-gray-500">
            Define where and how concessions apply
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Input
          label="Concession Type Name"
          name="type_name"
          value={form.type_name}
          onChange={handleChange}
          placeholder="e.g. Interest Rate"
          required
        />

        <Select
          label="Applicable On"
          name="applicable_on"
          value={form.applicable_on}
          onChange={handleChange}
          options={APPLICABLE_ON}
          required
        />

        <Textarea
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="md:col-span-2"
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={STATUS}
          required
        />

        <div className="md:col-span-2 flex justify-end">
          <button className="px-5 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2">
            <FiSave /> Save Type
          </button>
        </div>
      </form>
    </MainLayout>
  );
}

/* INPUTS */
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
