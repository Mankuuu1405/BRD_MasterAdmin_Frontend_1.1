// src/pages/products/EditProduct.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";

// import { productService } from "../../../services/productService";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    category: "",
    type: "",
    name: "",
    facilities: [],
    amount: "",
    periodValue: "",
    periodUnit: "Months",
  });

  /* -------------------- LOAD PRODUCT -------------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await productService.getProductById(id);

        setForm({
          category: data.product_category,
          type: data.product_type,
          name: data.product_name,
          facilities: data.product_facilities || [],
          amount: data.product_amount,
          periodValue: data.product_period?.value,
          periodUnit: data.product_period?.unit || "Months",
        });
        */

        // TEMP mock (remove when API ready)
        setForm({
          category: "Loan",
          type: "Personal Loan",
          name: "Personal Loan Premium",
          facilities: ["Top-up", "Insurance"],
          amount: 500000,
          periodValue: 24,
          periodUnit: "Months",
        });

      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

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

    await productService.updateProduct(id, payload);
    */

    navigate(-1);
  };

  if (loading) {
    return (
      <MainLayout>
        <p className="text-gray-500">Loading product...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* HEADER (SAME AS ADD USER / ADD PRODUCT) */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Product
          </h1>
          <p className="text-gray-500 text-sm">
            Update product configuration
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
            label="Product Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            options={["Loan", "Credit"]}
          />

          <SelectField
            label="Product Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            options={["Personal Loan", "Home Loan"]}
          />

          <InputField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <InputField
            label="Product Amount"
            type="number"
            name="amount"
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
                <option>Days</option>
                <option>Months</option>
                <option>Years</option>
              </select>
            </div>
          </div>

          {/* Facilities */}
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
              <option>Top-up</option>
              <option>Insurance</option>
            </select>
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md">
              <FiSave /> Update Product
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

/* ---------- Reused Fields (same as AddUser) ---------- */

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
        <option key={i}>{op}</option>
      ))}
    </select>
  </div>
);

export default EditProduct;
