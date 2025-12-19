import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/* OPTIONS (backend ready later) */
const TYPE_OPTIONS = ["Loan", "Credit Card"];
const CATEGORY_OPTIONS = ["Home Loan", "Personal Loan"];
const INCOME_TYPE_OPTIONS = ["Salaried", "Self Employed"];

const EligibilityForm = ({ isEdit = false }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "",
    category: "",
    income_type: "",
    other_income: "",
    margin: "",
    salary: "",
    salary_receipt: false,
    update_turnover: false,
    status: "Active",
  });

  /* -------------------- HANDLERS -------------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /*
      🔗 Backend payload ready
      const payload = {
        ...form
      };
    */

    navigate("/eligibility");
  };

  return (
    <MainLayout>
      {/* HEADER (SAME STYLE AS ADD PRODUCT) */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Edit Eligibility" : "Add Eligibility"}
          </h1>
          <p className="text-gray-500 text-sm">
            Configure eligibility rules and criteria
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
            label="Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            options={TYPE_OPTIONS}
          />

          <SelectField
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            options={CATEGORY_OPTIONS}
          />

          <SelectField
            label="Income Type"
            name="income_type"
            value={form.income_type}
            onChange={handleChange}
            options={INCOME_TYPE_OPTIONS}
          />

          <InputField
            label="Other Income"
            name="other_income"
            type="number"
            value={form.other_income}
            onChange={handleChange}
          />

          <InputField
            label="Margin (%)"
            name="margin"
            type="number"
            value={form.margin}
            onChange={handleChange}
          />

          <InputField
            label="Salary"
            name="salary"
            type="number"
            value={form.salary}
            onChange={handleChange}
          />

          {/* CHECKBOXES */}
          <div className="flex items-center gap-3 md:col-span-2">
            <input
              type="checkbox"
              name="salary_receipt"
              checked={form.salary_receipt}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label className="text-sm text-gray-700">
              Salary Receipt Required
            </label>
          </div>

          <div className="flex items-center gap-3 md:col-span-2">
            <input
              type="checkbox"
              name="update_turnover"
              checked={form.update_turnover}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label className="text-sm text-gray-700">
              Update Turnover
            </label>
          </div>

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
              {isEdit ? "Update Eligibility" : "Add Eligibility"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

/* -------------------- SHARED UI FIELDS (SAME AS ADD PRODUCT) -------------------- */

const InputField = ({ label, type = "text", name, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
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

export default EligibilityForm;
