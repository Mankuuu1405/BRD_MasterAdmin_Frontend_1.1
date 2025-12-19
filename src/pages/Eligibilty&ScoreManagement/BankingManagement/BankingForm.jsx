import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/* OPTIONS */
const ACCOUNT_TYPE_OPTIONS = ["Savings", "Current"];

const BankingForm = ({ isEdit = false }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bank_account_type: "",
    average_banking_dates: "",
    average_banking_criteria: "",
    status: "Active",
  });

  /* -------------------- HANDLERS -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /*
      🔗 Backend payload ready
      const payload = {
        ...form
      };
    */

    navigate("/banking");
  };

  return (
    <MainLayout>
      {/* HEADER (SAME AS ADD PRODUCT / ELIGIBILITY) */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Edit Banking Rule" : "Add Banking Rule"}
          </h1>
          <p className="text-gray-500 text-sm">
            Define banking criteria and rules
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <SelectField
            label="Bank Account Type"
            name="bank_account_type"
            value={form.bank_account_type}
            onChange={handleChange}
            options={ACCOUNT_TYPE_OPTIONS}
          />

          <InputField
            label="Average Banking Dates"
            name="average_banking_dates"
            type="number"
            value={form.average_banking_dates}
            onChange={handleChange}
          />

          <InputField
            label="Average Banking Criteria"
            name="average_banking_criteria"
            placeholder="Last 6 Months"
            value={form.average_banking_criteria}
            onChange={handleChange}
          />

          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={["Active", "Inactive"]}
          />

          {/* SUBMIT */}
          <div className="md:col-span-2">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md">
              <FiSave />
              {isEdit ? "Update Banking Rule" : "Save Banking Rule"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

/* -------------------- SHARED UI FIELDS -------------------- */

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="mt-2 p-3 rounded-xl bg-gray-50 focus:bg-white shadow-sm outline-none"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 p-3 rounded-xl bg-gray-50 shadow-sm outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((op, i) => (
        <option key={i} value={op}>
          {op}
        </option>
      ))}
    </select>
  </div>
);

export default BankingForm;
