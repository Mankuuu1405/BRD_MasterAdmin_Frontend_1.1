import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function ManageApprovalPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_type: "",
    status: "Active",
    checklist: {
      id_proof: false,
      address_proof: false,
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
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
    console.log("Manage Approval:", form);
    navigate(-1);
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition border border-gray-200"
        >
          <FiArrowLeft className="text-gray-700 text-lg" />
        </button>

        <div>
          <h1 className="text-[22px] font-semibold text-gray-900">
            Manage Approval
          </h1>
          <p className="text-gray-500 text-sm">
            Configure approval rules and checklist.
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* SELECT FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SelectField
              label="User Type *"
              name="user_type"
              value={form.user_type}
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
          </div>

          {/* CHECKLIST */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">
              Group Checklist
            </h3>

            <div className="space-y-3">
              <Checkbox
                label="ID Proof"
                name="id_proof"
                checked={form.checklist.id_proof}
                onChange={handleCheckbox}
              />
              <Checkbox
                label="Address Proof"
                name="address_proof"
                checked={form.checklist.address_proof}
                onChange={handleCheckbox}
              />
            </div>
          </div>

          {/* SAVE BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition text-sm"
          >
            <FiSave className="text-lg" />
            Save Configuration
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

/* ---------- SELECT FIELD ---------- */
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

/* ---------- CHECKBOX ---------- */
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
