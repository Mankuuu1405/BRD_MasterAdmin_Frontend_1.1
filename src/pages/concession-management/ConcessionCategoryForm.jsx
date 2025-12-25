import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CONCESSION_TYPES = ["Interest Rate", "Processing Fee"];
const PRODUCTS = ["Home Loan", "Business Loan", "Personal Loan"];
const STATUS = ["Active", "Inactive"];

export default function ConcessionCategoryForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category_name: "",
    linked_concession_type: "",
    eligibility_criteria: "",
    product_type: "",
    valid_from: "",
    valid_to: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Concession Category:", form);
    navigate("/concession-management");
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
        <h1 className="text-2xl font-bold">Add Concession Category</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Input
          label="Category Name"
          name="category_name"
          value={form.category_name}
          onChange={handleChange}
          required
        />

        <Select
          label="Linked Concession Type"
          name="linked_concession_type"
          value={form.linked_concession_type}
          onChange={handleChange}
          options={CONCESSION_TYPES}
          required
        />

        <Select
          label="Product Type"
          name="product_type"
          value={form.product_type}
          onChange={handleChange}
          options={PRODUCTS}
          required
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={STATUS}
        />

        <Input
          type="date"
          label="Valid From"
          name="valid_from"
          value={form.valid_from}
          onChange={handleChange}
        />

        <Input
          type="date"
          label="Valid To"
          name="valid_to"
          value={form.valid_to}
          onChange={handleChange}
        />

        <Textarea
          label="Eligibility Criteria"
          name="eligibility_criteria"
          value={form.eligibility_criteria}
          onChange={handleChange}
          className="md:col-span-2"
        />

        <div className="md:col-span-2 flex justify-end">
          <button className="px-5 py-3 bg-indigo-600 text-white rounded-xl flex items-center gap-2">
            <FiSave /> Save Category
          </button>
        </div>
      </form>
    </MainLayout>
  );
}

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
