import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function ManageApprovalPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tenant_id: "",
    user_id: "",
    status: "Active",
    checklist: {
      id_proof: false,
      address_proof: false,
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChecklistChange = (e) => {
    setForm({
      ...form,
      checklist: {
        ...form.checklist,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      tenant_id: form.tenant_id,
      user_id: form.user_id,
      status: form.status,
      checklist:
        form.user_id === "Group" ? form.checklist : null,
    };

    console.log("Manage Approval Payload:", payload);
    navigate(-1);
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200"
        >
          <FiArrowLeft className="text-lg text-gray-700" />
        </button>

        <div>
          <h1 className="text-[22px] font-semibold text-gray-900">
            Manage Approval
          </h1>
          <p className="text-sm text-gray-500">
            Configure approval user rules
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* BASIC DETAILS */}
          <Section title="Basic Details">
            <InputField
              label="Tenant ID *"
              name="tenant_id"
              value={form.tenant_id}
              onChange={handleChange}
              placeholder="Enter tenant identifier"
            />

            <SelectField
              label="User Type *"
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
              options={["Individual", "Group"]}
            />

            <SelectField
              label="Status *"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={["Active", "Inactive"]}
            />
          </Section>

          {/* GROUP CHECKLIST */}
          {form.user_id === "Group" && (
            <Section title="Group Checklist">
              <div className="space-y-4">
                <Checkbox
                  label="ID Proof Required"
                  name="id_proof"
                  checked={form.checklist.id_proof}
                  onChange={handleChecklistChange}
                />

                <Checkbox
                  label="Address Proof Required"
                  name="address_proof"
                  checked={form.checklist.address_proof}
                  onChange={handleChecklistChange}
                />
              </div>
            </Section>
          )}

          {/* SAVE */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <FiSave className="text-lg" />
            Save Configuration
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

/* ================= UI HELPERS ================= */

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-gray-900 font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {children}
    </div>
  </div>
);

function InputField({ label, ...props }) {
  return (
    <div>
      <label className="text-gray-700 text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full mt-2 p-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white outline-none text-sm"
      />
    </div>
  );
}

function SelectField({ label, options, ...props }) {
  return (
    <div>
      <label className="text-gray-700 text-sm font-medium">{label}</label>
      <select
        {...props}
        className="w-full mt-2 p-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white outline-none text-sm"
      >
        <option value="">Select</option>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-3 text-sm text-gray-700">
      <input
        type="checkbox"
        {...props}
        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      {label}
    </label>
  );
}
