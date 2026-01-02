import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
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

const EditProductMix = () => {
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

  /* ================= LOAD PRODUCT MIX ================= */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await productMixService.getProductMixById(id);

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

        // TEMP MOCK (remove after API)
        setForm({
          category: "Loan",
          type: "Personal Loan",
          name: "Personal Loan Combo",
          facilities: ["Top-up", "Insurance"],
          amount: 550000,
          periodValue: 24,
          periodUnit: "Months",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

      await productMixService.updateProductMix(id, payload);
    */

    navigate(-1);
  };

  if (loading) {
    return (
      <MainLayout>
        <p className="text-gray-500 text-sm">Loading product mix...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* ================= HEADER ================= */}
      <SubPageHeader
        title="Edit Product Mix"
        subtitle="Update bundled product configuration"
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
              label="Update Product Mix"
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditProductMix;
