import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { FiSave } from "react-icons/fi";

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

const AddProductMix = () => {
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

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
      Backend payload (ready)
      const payload = {
        mix_category: form.category,
        mix_type: form.type,
        mix_name: form.name,
        mix_facilities: form.facilities,
        mix_amount: Number(form.amount),
        mix_period: {
          value: Number(form.periodValue),
          unit: form.periodUnit,
        },
      };
    */

    navigate(-1);
  };

  return (
    <MainLayout>
      {/* ================= HEADER ================= */}
      <SubPageHeader
        title="Add Product Mix"
        subtitle="Create a bundled product offering"
        onBack={() => navigate(-1)}
      />

      {/* ================= FORM ================= */}
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
            placeholder="Select Category"
          />

          <SelectField
            label="Product Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            options={TYPE_OPTIONS}
            placeholder="Select Type"
          />

          <InputField
            label="Product Mix Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <InputField
            label="Product Mix Amount"
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />

          {/* -------- PERIOD -------- */}
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Period Value"
              type="number"
              name="periodValue"
              value={form.periodValue}
              onChange={handleChange}
            />

            <SelectField
              label="Unit"
              name="periodUnit"
              value={form.periodUnit}
              onChange={handleChange}
              options={PERIOD_UNITS}
            />
          </div>

          {/* -------- FACILITIES -------- */}
          <MultiSelectField
            label="Product Facilities"
            values={form.facilities}
            onChange={(values) =>
              setForm((prev) => ({ ...prev, facilities: values }))
            }
            options={FACILITY_OPTIONS}
          />

          {/* -------- SUBMIT -------- */}
          <div className="md:col-span-2 pt-4">
            <Button
              type="submit"
              fullWidth
              icon={<FiSave />}
              label="Add Product Mix"
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddProductMix;
