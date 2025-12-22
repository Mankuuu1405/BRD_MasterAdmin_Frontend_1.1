import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function EscalationPage() {
  const navigate = useNavigate();

  // MOCK USERS – replace with API
  const users = ["john.doe", "risk.manager", "admin.user"];

  const [form, setForm] = useState({
    escalation_level: "",
    escalation_time: "",
    escalation_manage: "",
    escalation_to: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      escalation_level: form.escalation_level,
      escalation_time: form.escalation_time,
      escalation_manage: form.escalation_manage,
      escalation_to: form.escalation_to,
      status: form.status,
    };

    console.log("Escalation Payload:", payload);
    navigate(-1);
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200"
        >
          <FiArrowLeft className="text-lg text-gray-700" />
        </button>

        <Header
          title="Escalation Master"
          subtitle="Manage delayed approval escalation rules"
        />
      </div>

      {/* FORM CARD */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-10">
          <Section title="Escalation Details">
            {/* ESCALATION LEVEL */}
            <SelectField
              label="Escalation Level *"
              name="escalation_level"
              value={form.escalation_level}
              onChange={handleChange}
              options={["1", "2", "3", "4"]}
            />

            {/* ESCALATION TIME */}
            <InputField
              label="Escalation Time *"
              name="escalation_time"
              type="datetime-local"
              value={form.escalation_time}
              onChange={handleChange}
            />

            {/* ESCALATION MANAGER */}
            <SelectField
              label="Escalation Manager *"
              name="escalation_manage"
              value={form.escalation_manage}
              onChange={handleChange}
              options={users}
            />

            {/* ESCALATION TO */}
            <SelectField
              label="Escalation To *"
              name="escalation_to"
              value={form.escalation_to}
              onChange={handleChange}
              options={users}
            />

            {/* STATUS */}
            <SelectField
              label="Status *"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={["Active", "Inactive"]}
            />
          </Section>

          {/* SAVE */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <FiSave className="text-lg" />
            Save Escalation Rule
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

/* ---------- HEADER COMPONENT ---------- */
function Header({ title, subtitle }) {
  return (
    <div>
      <h1 className="text-[22px] font-semibold text-gray-900">
        {title}
      </h1>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  );
}
