/* ---------- REUSABLE COMPONENTS (MUST BE ON TOP) ---------- */

const Section = ({ title, children }) => (
  <div>
    <h3 className="font-semibold text-gray-700 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      {...props}
      className="w-full mt-2 p-3 bg-gray-50 rounded-xl"
    />
  </div>
);

const NumberInput = (props) => (
  <Input {...props} type="number" min="0" />
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select
      {...props}
      className="w-full mt-2 p-3 bg-gray-50 rounded-xl"
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

/* ---------- MAIN COMPONENT ---------- */

import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { approvalMasterService } from "../../services/approvalMasterService";

const AddApproval = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await approvalMasterService.createApproval(form);
    navigate("/approvals");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-gray-50">
          <FiArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Add Approval</h1>
          <p className="text-gray-500 text-sm">Create approval rule</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md max-w-5xl">
        <form onSubmit={handleSubmit} className="space-y-10">

          <Section title="Basic Details">
            <Select label="Level" name="level" value={form.level}
              options={["L1", "L2", "L3", "L4", "FINAL"]} onChange={handleChange} />

            <Select label="Type" name="type" value={form.type}
              options={["INDIVIDUAL", "TEAM"]} onChange={handleChange} />

            <Input label="Product Type" name="product_type" value={form.product_type} onChange={handleChange} />
            <Input label="Product Name" name="product_name" value={form.product_name} onChange={handleChange} />
            <Input label="Sanction Name" name="sanction_name" value={form.sanction_name} onChange={handleChange} />
          </Section>

          <Section title="Rate & Fees">
            <NumberInput label="Rate Increase (%)" name="rate_inc" value={form.rate_inc} onChange={handleChange} />
            <NumberInput label="Rate Decrease (%)" name="rate_dec" value={form.rate_dec} onChange={handleChange} />
            <NumberInput label="Fees Increase" name="fees_inc" value={form.fees_inc} onChange={handleChange} />
            <NumberInput label="Fees Decrease" name="fees_dec" value={form.fees_dec} onChange={handleChange} />
          </Section>

          <Section title="Tenure & Moratorium">
            <NumberInput label="Tenure Increase" name="tenure_inc" value={form.tenure_inc} onChange={handleChange} />
            <NumberInput label="Tenure Decrease" name="tenure_dec" value={form.tenure_dec} onChange={handleChange} />
            <NumberInput label="Moratorium Interest" name="moratorium_interest" value={form.moratorium_interest} onChange={handleChange} />
            <NumberInput label="Moratorium Period" name="moratorium_period" value={form.moratorium_period} onChange={handleChange} />
            <NumberInput label="Approval Range" name="approval_range" value={form.approval_range} onChange={handleChange} />

            <Select label="Status" name="status" value={form.status}
              options={["ACTIVE", "INACTIVE"]} onChange={handleChange} />
          </Section>

          <button type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
            <FiSave /> Save Approval
          </button>

        </form>
      </div>
    </MainLayout>
  );
};

export default AddApproval;
