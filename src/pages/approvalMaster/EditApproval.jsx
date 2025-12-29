/* ---------------- UI HELPERS (MUST BE ON TOP) ---------------- */

const Section = ({ title, children }) => (
  <div>
    <h3 className="font-semibold text-gray-700 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="w-full mt-2 p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white text-sm"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="w-full mt-2 p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white text-sm"
    >
      <option value="">Select</option>
      {options.map((op) => (
        <option key={op} value={op}>{op}</option>
      ))}
    </select>
  </div>
);

/* ---------------- MAIN COMPONENT ---------------- */

import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { approvalMasterService } from "../../services/approvalMasterService";

const EditApproval = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  /* FETCH APPROVAL */
  useEffect(() => {
    fetchApproval();
  }, [id]);

  const fetchApproval = async () => {
    try {
      const res = await approvalMasterService.getApprovalById(id);
      setForm({
        level: res.level,
        type: res.type,
        product_type: res.product_type,
        product_name: res.product_name,
        sanction_name: res.sanction_name,
        rate_inc: res.rate_inc ?? "",
        rate_dec: res.rate_dec ?? "",
        fees_inc: res.fees_inc ?? "",
        fees_dec: res.fees_dec ?? "",
        tenure_inc: res.tenure_inc ?? "",
        tenure_dec: res.tenure_dec ?? "",
        moratorium_interest: res.moratorium_interest ?? "",
        moratorium_period: res.moratorium_period ?? "",
        approval_range: res.approval_range ?? "",
        status: res.status,
      });
    } catch (err) {
      console.error("Failed to fetch approval", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await approvalMasterService.updateApproval(id, form);
      navigate("/approvals");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
        >
          <FiArrowLeft />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Approval
          </h1>
          <p className="text-sm text-gray-500">
            Modify approval configuration
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-5xl">
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* BASIC DETAILS */}
          <Section title="Basic Details">
            <Select
              label="Approval Level"
              name="level"
              value={form.level}
              options={["L1", "L2", "L3", "L4", "FINAL"]}
              onChange={handleChange}
            />

            <Select
              label="Approval Type"
              name="type"
              value={form.type}
              options={["INDIVIDUAL", "TEAM"]}
              onChange={handleChange}
            />

            <Input
              label="Product Type"
              name="product_type"
              value={form.product_type}
              onChange={handleChange}
            />

            <Input
              label="Product Name"
              name="product_name"
              value={form.product_name}
              onChange={handleChange}
            />

            <Input
              label="Sanction Name"
              name="sanction_name"
              value={form.sanction_name}
              onChange={handleChange}
            />

            <Input
              label="Approval Range"
              name="approval_range"
              value={form.approval_range}
              onChange={handleChange}
            />
          </Section>

          {/* RATE & FEES */}
          <Section title="Rate & Fees">
            <Input label="Rate Increase (%)" name="rate_inc" value={form.rate_inc} onChange={handleChange} />
            <Input label="Rate Decrease (%)" name="rate_dec" value={form.rate_dec} onChange={handleChange} />
            <Input label="Fees Increase" name="fees_inc" value={form.fees_inc} onChange={handleChange} />
            <Input label="Fees Decrease" name="fees_dec" value={form.fees_dec} onChange={handleChange} />
          </Section>

          {/* TENURE & MORATORIUM */}
          <Section title="Tenure & Moratorium">
            <Input label="Tenure Increase (Months)" name="tenure_inc" value={form.tenure_inc} onChange={handleChange} />
            <Input label="Tenure Decrease (Months)" name="tenure_dec" value={form.tenure_dec} onChange={handleChange} />
            <Input label="Moratorium Interest (%)" name="moratorium_interest" value={form.moratorium_interest} onChange={handleChange} />
            <Input label="Moratorium Period (Months)" name="moratorium_period" value={form.moratorium_period} onChange={handleChange} />

            <Select
              label="Status"
              name="status"
              value={form.status}
              options={["ACTIVE", "INACTIVE"]}
              onChange={handleChange}
            />
          </Section>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            <FiSave /> Update Approval
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditApproval;
