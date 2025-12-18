import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/* OPTIONS (backend ready later) */
const CATEGORY_OPTIONS = ["Loan", "Credit"];
const TYPE_OPTIONS = ["Personal Loan", "Home Loan"];
const FACILITY_OPTIONS = ["Top-up", "Insurance"];
const PERIOD_UNITS = ["Days", "Months", "Years"];

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "",
    type: "",
    name: "",
    facilities: [],
    amount: "",
    periodValue: "",
    periodUnit: "Months",
  });

  /* -------------------- HANDLERS -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacilitiesChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (o) => o.value);
    setForm((prev) => ({ ...prev, facilities: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
      🔗 Backend payload (ready)
      const payload = {
        product_category: form.category,
        product_type: form.type,
        product_name: form.name,
        product_facilities: form.facilities,
        product_amount: Number(form.amount),
        product_period: {
          value: Number(form.periodValue),
          unit: form.periodUnit,
        },
      };

      await productService.addProduct(payload);
    */

    navigate(-1);
  };

  return (
    <MainLayout>
      {/* HEADER (SAME AS ADD USER) */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Add New Product
          </h1>
          <p className="text-gray-500 text-sm">
            Enter product details and configuration
          </p>
        </div>
      </div>

      {/* FORM CARD (SAME AS ADD USER) */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <SelectField
            label="Product Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            options={CATEGORY_OPTIONS}
          />

          <SelectField
            label="Product Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            options={TYPE_OPTIONS}
          />

          <InputField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <InputField
            label="Product Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
          />

          {/* Product Period */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Product Period
            </label>
            <div className="mt-2 flex gap-3">
              <input
                type="number"
                name="periodValue"
                value={form.periodValue}
                onChange={handleChange}
                className="p-3 rounded-xl bg-gray-50 shadow-sm outline-none w-1/2"
              />
              <select
                name="periodUnit"
                value={form.periodUnit}
                onChange={handleChange}
                className="p-3 rounded-xl bg-gray-50 shadow-sm outline-none w-1/2"
              >
                {PERIOD_UNITS.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Facilities (MULTI SELECT) */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Product Facilities
            </label>
            <select
              multiple
              value={form.facilities}
              onChange={handleFacilitiesChange}
              className="mt-2 p-3 rounded-xl bg-gray-50 shadow-sm outline-none h-28"
            >
              {FACILITY_OPTIONS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="md:col-span-2">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md">
              <FiSave /> Add Product
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

/* -------------------- REUSED FROM ADD USER -------------------- */
const InputField = ({ label, type = "text", name, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
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
    <label className="text-gray-700 text-sm font-medium">{label}</label>
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

export default AddProduct;
