import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function EscalationPage() {
  const navigate = useNavigate();

  // MOCK USERS – replace with API
  const users = ["john.doe", "risk.manager", "admin.user"];

  const [form, setForm] = useState({
    ascalation_level: "",
    ascalation_time: "",
    ascalation_manage: "",
    ascalation_to: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ascalation_level: form.ascalation_level,
      ascalation_time: form.ascalation_time,
      ascalation_manage: form.ascalation_manage,
      ascalation_to: form.ascalation_to,
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
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200"
        >
          <FiArrowLeft className="text-lg text-gray-700" />
        </button>

        <_toggleHeader
          title="Escalation Configuration"
          subtitle="Define escalation levels, timing and responsibility"
        />
      </div>

      {/* FORM CARD */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* ESCALATION DETAILS */}
          <Section title="Escalation Details">
            <SelectField
              label="Escalation Level *"
              name="ascalation_level"
              value={form.ascalation_level}
              onChange={handleChange}
              options={["1", "2", "3", "4"]}
            />

            <InputField
              label="Escalation Time *"
              name="ascalation_time"
              type="datetime-local"
              value={form.ascalation_time}
              onChange={handleChange}
            />

            <SelectField
              label="Escalation Manager *"
              name="ascalation_manage"
              value={form.ascalation_manage}
              onChange={handleChange}
              options={users}
            />

            <SelectField
              label="Escalation To *"
              name="ascalation_to"
              value={form.ascalation_to}
              onChange={handleChange}
              options={users}
            />

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
            Save Escalation
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
function _toggleHeader({ title, subtitle }) {
  return (
    <div>
      <h1 className="text-[22px] font-semibold text-gray-900">
        {title}
      </h1>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  );
}
