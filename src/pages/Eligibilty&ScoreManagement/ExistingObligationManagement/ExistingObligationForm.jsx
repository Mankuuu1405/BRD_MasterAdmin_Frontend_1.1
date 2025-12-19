import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/* OPTIONS */
const LOAN_STATUS_OPTIONS = ["Active", "Closed", "Overdue"];
const LOAN_PERFORMANCE_OPTIONS = ["Good", "Average", "Poor"];
const CARD_TYPE_OPTIONS = ["Credit", "Debit"];
const CREDIT_CARD_STATUS_OPTIONS = ["Active", "Blocked", "Closed"];
const CREDIT_CARD_PERFORMANCE_OPTIONS = ["Excellent", "Good", "Average", "Poor"];
const STATUS_OPTIONS = ["Active", "Inactive"];

const ExistingObligationForm = ({ isEdit = false }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    status_of_loan: "",
    loan_performance: "",
    card_type: "",
    status_of_credit_card: "",
    credit_card_performance: "",
    total_loans: "",
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
      const payload = { ...form };
    */

    console.log("Existing Obligation:", form);
    navigate("/obligation");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Edit" : "Add"} Existing Obligation
          </h1>
          <p className="text-gray-500 text-sm">
            Configure existing loan and credit card obligations
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <SelectField
            label="Status of Loan"
            name="status_of_loan"
            value={form.status_of_loan}
            onChange={handleChange}
            options={LOAN_STATUS_OPTIONS}
          />

          <SelectField
            label="Loan Performance"
            name="loan_performance"
            value={form.loan_performance}
            onChange={handleChange}
            options={LOAN_PERFORMANCE_OPTIONS}
          />

          <SelectField
            label="Card Type"
            name="card_type"
            value={form.card_type}
            onChange={handleChange}
            options={CARD_TYPE_OPTIONS}
          />

          <SelectField
            label="Status of Credit Card"
            name="status_of_credit_card"
            value={form.status_of_credit_card}
            onChange={handleChange}
            options={CREDIT_CARD_STATUS_OPTIONS}
          />

          <SelectField
            label="Credit Card Performance"
            name="credit_card_performance"
            value={form.credit_card_performance}
            onChange={handleChange}
            options={CREDIT_CARD_PERFORMANCE_OPTIONS}
          />

          <InputField
            label="Total Loans"
            name="total_loans"
            type="number"
            value={form.total_loans}
            onChange={handleChange}
          />

          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={STATUS_OPTIONS}
          />

          {/* SUBMIT BUTTON */}
          <div className="md:col-span-2">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md">
              <FiSave />
              {isEdit ? "Update Obligation" : "Save Obligation"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

/* -------------------- REUSABLE UI FIELDS -------------------- */
const InputField = ({ label, type = "text", name, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 p-3 rounded-xl bg-gray-50 shadow-sm focus:bg-white outline-none"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 p-3 rounded-xl bg-gray-50 shadow-sm outline-none focus:bg-white"
    >
      <option value="">Select {label}</option>
      {options.map((op) => (
        <option key={op} value={op}>
          {op}
        </option>
      ))}
    </select>
  </div>
);

export default ExistingObligationForm;
