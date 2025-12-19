import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const EditApproval = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    level: "",
    type: "",
    product_type: "",
    product_name: "",
    approval_name: {
      sanction: "",
      rate_inc: "",
      rate_dec: "",
      fees_inc: "",
      fees_dec: "",
      tenure_inc: "",
      tenure_dec: "",
      range: "",
      moratorium: {
        interest: "",
        period: "",
      },
    },
    status: "Active",
  });

  /* MOCK FETCH – replace with API */
  useEffect(() => {
    const mockData = {
      level: "1",
      type: "Individual",
      product_type: "Loan",
      product_name: "Home Loan",
      approval_name: {
        sanction: "Branch Sanction",
        rate_inc: 2,
        rate_dec: 1,
        fees_inc: 5000,
        fees_dec: 2000,
        tenure_inc: 12,
        tenure_dec: 6,
        range: "0 – 25L",
        moratorium: {
          interest: 1.5,
          period: 6,
        },
      },
      status: "Active",
    };
    setForm(mockData);
  }, [id]);

  /* NESTED CHANGE HANDLER */
  const handleChange = (e, path = null) => {
    if (!path) {
      setForm({ ...form, [e.target.name]: e.target.value });
      return;
    }

    const updated = { ...form };
    let obj = updated;

    for (let i = 0; i < path.length - 1; i++) {
      obj = obj[path[i]];
    }

    obj[path[path.length - 1]] = e.target.value;
    setForm(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Approval:", id, form);
    navigate("/approvals");
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
              options={["1","2","3","4","Final"]}
              value={form.level}
              onChange={(e)=>handleChange(e)}
              name="level"
            />

            <Select
              label="Approval Type"
              options={["Individual","Team"]}
              value={form.type}
              onChange={(e)=>handleChange(e)}
              name="type"
            />

            <Input
              label="Product Type"
              value={form.product_type}
              onChange={(e)=>handleChange(e)}
              name="product_type"
            />

            <Input
              label="Product Name"
              value={form.product_name}
              onChange={(e)=>handleChange(e)}
              name="product_name"
            />

            <Input
              label="Sanction Name"
              value={form.approval_name.sanction}
              onChange={(e)=>handleChange(e,["approval_name","sanction"])}
            />

            <Input
              label="Approval Range"
              value={form.approval_name.range}
              onChange={(e)=>handleChange(e,["approval_name","range"])}
            />
          </Section>

          {/* RATE & FEES */}
          <Section title="Rate & Fees">
            <Input label="Rate Increase (%)"
              value={form.approval_name.rate_inc}
              onChange={(e)=>handleChange(e,["approval_name","rate_inc"])} />

            <Input label="Rate Decrease (%)"
              value={form.approval_name.rate_dec}
              onChange={(e)=>handleChange(e,["approval_name","rate_dec"])} />

            <Input label="Fees Increase"
              value={form.approval_name.fees_inc}
              onChange={(e)=>handleChange(e,["approval_name","fees_inc"])} />

            <Input label="Fees Decrease"
              value={form.approval_name.fees_dec}
              onChange={(e)=>handleChange(e,["approval_name","fees_dec"])} />
          </Section>

          {/* TENURE & MORATORIUM */}
          <Section title="Tenure & Moratorium">
            <Input label="Tenure Increase (Months)"
              value={form.approval_name.tenure_inc}
              onChange={(e)=>handleChange(e,["approval_name","tenure_inc"])} />

            <Input label="Tenure Decrease (Months)"
              value={form.approval_name.tenure_dec}
              onChange={(e)=>handleChange(e,["approval_name","tenure_dec"])} />

            <Input label="Moratorium Interest (%)"
              value={form.approval_name.moratorium.interest}
              onChange={(e)=>handleChange(e,["approval_name","moratorium","interest"])} />

            <Input label="Moratorium Period (Months)"
              value={form.approval_name.moratorium.period}
              onChange={(e)=>handleChange(e,["approval_name","moratorium","period"])} />

            <Select
              label="Status"
              options={["Active","Inactive"]}
              value={form.status}
              onChange={(e)=>handleChange(e)}
              name="status"
            />
          </Section>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            <FiSave />
            Update Approval
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditApproval;

/* ---------------- UI HELPERS ---------------- */

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
