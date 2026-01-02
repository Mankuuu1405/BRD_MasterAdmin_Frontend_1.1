import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { productManagementService } from "../../../services/productManagementService";

import {
  SubPageHeader,
  InputField,
  SelectField,
  MultiSelectField,
  Button,
} from "../../../components/Controls/SharedUIHelpers";

/* ================= OPTIONS ================= */
const CATEGORY_OPTIONS = [
  { label: "Loan", value: "Loan" },
  { label: "Credit", value: "Credit" },
];

const TYPE_OPTIONS = [
  { label: "Personal Loan", value: "Personal Loan" },
  { label: "Home Loan", value: "Home Loan" },
];

const FACILITY_OPTIONS = [
  { label: "Top-up", value: "Top-up" },
  { label: "Insurance", value: "Insurance" },
];

const PERIOD_UNITS = [
  { label: "Days", value: "Days" },
  { label: "Months", value: "Months" },
  { label: "Years", value: "Years" },
];

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "",
    type: "",
    name: "",
    amount: "",
    periodValue: "",
    periodUnit: "Months",
    facilities: [],
  });

  const [loading, setLoading] = useState(false);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        product_category: form.category,
        product_type: form.type,
        product_name: form.name,
        product_amount: Number(form.amount),
        product_period_value: Number(form.periodValue),
        product_period_unit: form.periodUnit,
        product_facilities: form.facilities,
      };

      await productManagementService.createProduct(payload);
      navigate("/product-management/list");
    } catch (error) {
      console.error("Failed to create product:", error);
      alert("Error creating product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* ===== SUB HEADER ===== */}
      <SubPageHeader
        title="Add New Product"
        subtitle="Enter product details and configuration"
        onBack={() => navigate(-1)}
      />

      {/* ===== FORM CARD ===== */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Product Category */}
          <SelectField
            label="Product Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            options={CATEGORY_OPTIONS}
            placeholder="Select Product Category"
          />

          {/* Product Type */}
          <SelectField
            label="Product Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            options={TYPE_OPTIONS}
            placeholder="Select Product Type"
          />

          {/* Product Name */}
          <InputField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />

          {/* Product Amount */}
          <InputField
            label="Product Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
          />

          {/* Product Period */}
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Product Period"
              name="periodValue"
              type="number"
              value={form.periodValue}
              onChange={handleChange}
              placeholder="Enter value"
            />

            <SelectField
              label="Unit"
              name="periodUnit"
              value={form.periodUnit}
              onChange={handleChange}
              options={PERIOD_UNITS}
            />
          </div>

          {/* Product Facilities */}
          <MultiSelectField
            label="Product Facilities"
            values={form.facilities}
            onChange={(values) =>
              setForm((prev) => ({ ...prev, facilities: values }))
            }
            options={FACILITY_OPTIONS}
          />

          {/* SUBMIT BUTTON */}
          <div className="md:col-span-2 pt-4">
            <Button
              type="submit"
              fullWidth
              icon={<FiSave />}
              label={loading ? "Saving..." : "Add Product"}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddProduct;
