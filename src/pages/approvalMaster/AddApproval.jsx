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
      rate_inc: 0,
      rate_dec: 0,
      fees_inc: 0,
      fees_dec: 0,
      tenure_inc: 0,
      tenure_dec: 0,
      range: 0,
      moratorium: {
        interest: 0,
        period: 0,
      },
    },
    status: "Active",
  });

  /* ---------- SAFE STATE UPDATE ---------- */
  const handleChange = (e, path = null, isNumber = false) => {
    const value = isNumber ? Number(e.target.value) : e.target.value;

    if (!path) {
      setForm((prev) => ({ ...prev, [e.target.name]: value }));
      return;
    }

    setForm((prev) => {
      const updated = structuredClone(prev);
      let obj = updated;
      for (let i = 0; i < path.length - 1; i++) {
        obj = obj[path[i]];
      }
      obj[path[path.length - 1]] = value;
      return updated;
    });
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
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50"
        >
          <FiArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Add Approval</h1>
          <p className="text-gray-500 text-sm">Create approval rule</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md max-w-5xl">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* BASIC DETAILS */}
          <Section title="Basic Details">
            <Select
              label="Level"
              name="level"
              value={form.level}
              options={["1", "2", "3", "4", "Final"]}
              onChange={handleChange}
            />

            <Select
              label="Type"
              name="type"
              value={form.type}
              options={["Individual", "Team"]}
              onChange={handleChange}
            />

            <Input
              label="Product Type"
              name="product_type"
              placeholder="e.g. Loan, Credit Card, Overdraft"
              value={form.product_type}
              onChange={handleChange}
            />

            <Input
              label="Product Name"
              name="product_name"
              placeholder="e.g. Home Loan, Personal Loan"
              value={form.product_name}
              onChange={handleChange}
            />

            <Input
              label="Sanction Name"
              placeholder="e.g. Standard Sanction, Special Approval"
              value={form.approval_name.sanction}
              onChange={(e) =>
                handleChange(e, ["approval_name", "sanction"])
              }
            />
          </Section>

          {/* RATE & FEES */}
          <Section title="Rate & Fees">
            <NumberInput
              label="Rate Increase (%)"
              value={form.approval_name.rate_inc}
              onChange={(e) =>
                handleChange(e, ["approval_name", "rate_inc"], true)
              }
            />

            <NumberInput
              label="Rate Decrease (%)"
              value={form.approval_name.rate_dec}
              onChange={(e) =>
                handleChange(e, ["approval_name", "rate_dec"], true)
              }
            />

            <NumberInput
              label="Fees Increase"
              value={form.approval_name.fees_inc}
              onChange={(e) =>
                handleChange(e, ["approval_name", "fees_inc"], true)
              }
            />

            <NumberInput
              label="Fees Decrease"
              value={form.approval_name.fees_dec}
              onChange={(e) =>
                handleChange(e, ["approval_name", "fees_dec"], true)
              }
            />
          </Section>

          {/* TENURE & MORATORIUM */}
          <Section title="Tenure & Moratorium">
            <NumberInput
              label="Tenure Increase (Months)"
              value={form.approval_name.tenure_inc}
              onChange={(e) =>
                handleChange(e, ["approval_name", "tenure_inc"], true)
              }
            />

            <NumberInput
              label="Tenure Decrease (Months)"
              value={form.approval_name.tenure_dec}
              onChange={(e) =>
                handleChange(e, ["approval_name", "tenure_dec"], true)
              }
            />

            <NumberInput
              label="Moratorium Interest (%)"
              value={form.approval_name.moratorium.interest}
              onChange={(e) =>
                handleChange(
                  e,
                  ["approval_name", "moratorium", "interest"],
                  true
                )
              }
            />

            <NumberInput
              label="Moratorium Period (Months)"
              value={form.approval_name.moratorium.period}
              onChange={(e) =>
                handleChange(
                  e,
                  ["approval_name", "moratorium", "period"],
                  true
                )
              }
            />

            <NumberInput
              label="Approval Range"
              value={form.approval_name.range}
              onChange={(e) =>
                handleChange(e, ["approval_name", "range"], true)
              }
            />

            <Select
              label="Status"
              name="status"
              value={form.status}
              options={["Active", "Inactive"]}
              onChange={handleChange}
            />
          </Section>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700"
          >
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
