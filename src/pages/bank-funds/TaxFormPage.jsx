import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const TAX_TYPES = ["GST", "TDS", "Surcharge"];
const TAX_CATEGORIES = ["Processing Fee", "Interest", "Foreclosure"];
const STATUS = ["Active", "Inactive"];

const TaxFormPage = ({ modeType }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    type: "",
    category: "",
    rate: "",
    valid_from: "",
    valid_to: "",
    status: "Active",
  });

  useEffect(() => {
    if (modeType === "edit" && id) {
      const existingTax = {
        type: "GST",
        category: "Processing Fee",
        rate: 18,
        valid_from: "2024-01-01",
        valid_to: "2025-12-31",
        status: "Active",
      };
      setForm(existingTax);
    }
  }, [id, modeType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
    navigate("/taxation-management");
  };

  return (
    <MainLayout>
      <div className="max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100"
          >
            <FiArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{modeType === "add" ? "Add Tax" : "Edit Tax"}</h1>
            <p className="text-gray-500 text-sm">Configure taxation details</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 gap-4"
        >
          <Select label="Tax Type" name="type" value={form.type} onChange={handleChange} options={TAX_TYPES} required />
          <Select label="Category" name="category" value={form.category} onChange={handleChange} options={TAX_CATEGORIES} required />
          <Input label="Rate (%)" name="rate" value={form.rate} onChange={handleChange} type="number" required />

          <div className="grid grid-cols-2 gap-2">
            <Input label="Valid From" name="valid_from" value={form.valid_from} onChange={handleChange} type="date" />
            <Input label="Valid To" name="valid_to" value={form.valid_to} onChange={handleChange} type="date" />
          </div>

          <Select label="Status" name="status" value={form.status} onChange={handleChange} options={STATUS} />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-700"
          >
            <FiSave /> Save
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default TaxFormPage;

/* ---------------- REUSABLE ---------------- */
const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
