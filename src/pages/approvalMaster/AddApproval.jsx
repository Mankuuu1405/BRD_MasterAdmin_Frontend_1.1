import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AddApproval = () => {
  const navigate = useNavigate();

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
    console.log("Approval Payload:", form);
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
          {/* BASIC INFO */}
          <Section title="Basic Details">
            <Select label="Level" options={["1","2","3","4","Final"]}
              onChange={(e)=>handleChange(e)} name="level" />
            <Select label="Type" options={["Individual","Team"]}
              onChange={(e)=>handleChange(e)} name="type" />
            <Input label="Product Type" name="product_type"
              onChange={(e)=>handleChange(e)} />
            <Input label="Product Name" name="product_name"
              onChange={(e)=>handleChange(e)} />
            <Input label="Sanction Name"
              onChange={(e)=>handleChange(e,["approval_name","sanction"])} />
          </Section>

          {/* RATE & FEES */}
          <Section title="Rate & Fees">
            <Input label="Rate Increase (%)"
              onChange={(e)=>handleChange(e,["approval_name","rate_inc"])} />
            <Input label="Rate Decrease (%)"
              onChange={(e)=>handleChange(e,["approval_name","rate_dec"])} />
            <Input label="Fees Increase"
              onChange={(e)=>handleChange(e,["approval_name","fees_inc"])} />
            <Input label="Fees Decrease"
              onChange={(e)=>handleChange(e,["approval_name","fees_dec"])} />
          </Section>

          {/* TENURE & MORATORIUM */}
          <Section title="Tenure & Moratorium">
            <Input label="Tenure Increase (Months)"
              onChange={(e)=>handleChange(e,["approval_name","tenure_inc"])} />
            <Input label="Tenure Decrease (Months)"
              onChange={(e)=>handleChange(e,["approval_name","tenure_dec"])} />
            <Input label="Moratorium Interest (%)"
              onChange={(e)=>handleChange(e,["approval_name","moratorium","interest"])} />
            <Input label="Moratorium Period (Months)"
              onChange={(e)=>handleChange(e,["approval_name","moratorium","period"])} />
            <Input label="Approval Range"
              onChange={(e)=>handleChange(e,["approval_name","range"])} />
            <Select label="Status" options={["Active","Inactive"]}
              onChange={(e)=>handleChange(e)} name="status" />
          </Section>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl">
            <FiSave /> Save Approval
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddApproval;

/* ---------- REUSABLE ---------- */

const Section = ({ title, children }) => (
  <div>
    <h3 className="font-semibold text-gray-700 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input {...props} className="w-full mt-2 p-3 bg-gray-50 rounded-xl" />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select {...props} className="w-full mt-2 p-3 bg-gray-50 rounded-xl">
      <option value="">Select</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);
