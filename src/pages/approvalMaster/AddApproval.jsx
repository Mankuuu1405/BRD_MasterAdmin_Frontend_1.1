import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { FiSave } from "react-icons/fi";

import { approvalMasterService } from "../../services/approvalMasterService";
import {
  SubPageHeader,
  InputField,
  SelectField,
  Button,
} from "../../components/Controls/SharedUIHelpers";

/* ================= OPTIONS ================= */
const LEVEL_OPTIONS = [
  { label: "L1", value: "L1" },
  { label: "L2", value: "L2" },
  { label: "L3", value: "L3" },
  { label: "L4", value: "L4" },
  { label: "FINAL", value: "FINAL" },
];

const TYPE_OPTIONS = [
  { label: "Individual", value: "INDIVIDUAL" },
  { label: "Team", value: "TEAM" },
];

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

export default function AddApproval() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    level: "",
    type: "",
    product_type: "",
    product_name: "",
    sanction_name: "",
    rate_inc: "",
    rate_dec: "",
    fees_inc: "",
    fees_dec: "",
    tenure_inc: "",
    tenure_dec: "",
    moratorium_interest: "",
    moratorium_period: "",
    approval_range: "",
    status: "ACTIVE",
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
      await approvalMasterService.createApproval(form);
      navigate("/approvals");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* ================= HEADER ================= */}
      <SubPageHeader
        title="Add Approval"
        subtitle="Create approval rule"
        onBack={() => navigate(-1)}
      />

      {/* ================= FORM ================= */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-5xl">
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* -------- BASIC DETAILS -------- */}
          <Section title="Basic Details">
            <SelectField
              label="Level"
              name="level"
              value={form.level}
              onChange={handleChange}
              options={LEVEL_OPTIONS}
              placeholder="Select Level"
            />

            <SelectField
              label="Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              options={TYPE_OPTIONS}
              placeholder="Select Type"
            />

            <InputField
              label="Product Type"
              name="product_type"
              value={form.product_type}
              onChange={handleChange}
            />

            <InputField
              label="Product Name"
              name="product_name"
              value={form.product_name}
              onChange={handleChange}
            />

            <InputField
              label="Sanction Name"
              name="sanction_name"
              value={form.sanction_name}
              onChange={handleChange}
            />
          </Section>

          {/* -------- RATE & FEES -------- */}
          <Section title="Rate & Fees">
            <InputField
              label="Rate Increase (%)"
              type="number"
              name="rate_inc"
              value={form.rate_inc}
              onChange={handleChange}
            />

            <InputField
              label="Rate Decrease (%)"
              type="number"
              name="rate_dec"
              value={form.rate_dec}
              onChange={handleChange}
            />

            <InputField
              label="Fees Increase"
              type="number"
              name="fees_inc"
              value={form.fees_inc}
              onChange={handleChange}
            />

            <InputField
              label="Fees Decrease"
              type="number"
              name="fees_dec"
              value={form.fees_dec}
              onChange={handleChange}
            />
          </Section>

          {/* -------- TENURE & MORATORIUM -------- */}
          <Section title="Tenure & Moratorium">
            <InputField
              label="Tenure Increase"
              type="number"
              name="tenure_inc"
              value={form.tenure_inc}
              onChange={handleChange}
            />

            <InputField
              label="Tenure Decrease"
              type="number"
              name="tenure_dec"
              value={form.tenure_dec}
              onChange={handleChange}
            />

            <InputField
              label="Moratorium Interest"
              type="number"
              name="moratorium_interest"
              value={form.moratorium_interest}
              onChange={handleChange}
            />

            <InputField
              label="Moratorium Period"
              type="number"
              name="moratorium_period"
              value={form.moratorium_period}
              onChange={handleChange}
            />

            <InputField
              label="Approval Range"
              type="number"
              name="approval_range"
              value={form.approval_range}
              onChange={handleChange}
            />

            <SelectField
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={STATUS_OPTIONS}
            />
          </Section>

          {/* -------- SUBMIT -------- */}
          <Button
            type="submit"
            fullWidth
            icon={<FiSave />}
            label={loading ? "Saving..." : "Save Approval"}
            disabled={loading}
          />
        </form>
      </div>
    </MainLayout>
  );
}

/* ================= LOCAL LAYOUT WRAPPER ================= */
const Section = ({ title, children }) => (
  <div>
    <h3 className="mb-4 text-sm font-semibold text-gray-700">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);
