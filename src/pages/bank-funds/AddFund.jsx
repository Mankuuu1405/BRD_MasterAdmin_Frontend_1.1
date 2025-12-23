import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const FUND_TYPES = ["Internal Fund", "Borrowed Fund", "Corpus Fund"];

export default function AddFund() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fund_type: "",
    fund_source: "",
    available_amount: "",
    allocation_logic: "",
  });

  /* ---------- SAFE STATE UPDATE ---------- */
  const handleChange = (e, isNumber = false) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: isNumber ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add Fund Payload:", form);
    navigate("/fund-management");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100"
        >
          <FiArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Add Fund</h1>
          <p className="text-gray-500 text-sm">Configure a new fund pool</p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* FUND TYPE */}
        <Select
          label="Fund Type"
          name="fund_type"
          value={form.fund_type}
          onChange={handleChange}
          options={FUND_TYPES}
          required
        />

        {/* FUND SOURCE */}
        <Input
          label="Fund Source"
          name="fund_source"
          value={form.fund_source}
          onChange={handleChange}
          placeholder="e.g. Internal allocation or external loan"
          required
        />

        {/* AVAILABLE AMOUNT */}
        <NumberInput
          label="Available Amount"
          name="available_amount"
          value={form.available_amount}
          onChange={(e) => handleChange(e, true)}
          required
        />

        {/* ALLOCATION LOGIC */}
        <Textarea
          label="Fund Allocation Logic"
          name="allocation_logic"
          value={form.allocation_logic}
          onChange={handleChange}
          rows={3}
          className="md:col-span-2"
        />

        {/* ACTIONS */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="px-5 py-3 rounded-xl text-white bg-blue-600 flex items-center gap-2 hover:bg-blue-700"
          >
            <FiSave /> Save Fund
          </button>
        </div>
      </form>
    </MainLayout>
  );
}

/* ---------------- REUSABLE INPUTS ---------------- */

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const NumberInput = (props) => <Input {...props} type="number" min="0" />;

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <textarea
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
