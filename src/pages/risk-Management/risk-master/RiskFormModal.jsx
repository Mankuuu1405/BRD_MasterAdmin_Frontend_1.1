import React, { useState } from "react";

const RISK_CATEGORIES = [
  "Credit Risk",
  "Operational Risk",
  "Market Risk",
  "Compliance Risk",
];

const SEVERITIES = ["Low", "Medium", "High"];

const RiskFormModal = ({ risk, onClose }) => {
  const [form, setForm] = useState({
    category: risk?.category || "",
    parameter: risk?.parameter || "",
    severity: risk?.severity || "",
    trigger: risk?.trigger || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // API CALL PAYLOAD
    /*
    {
      risk_category: form.category,
      risk_parameter: form.parameter,
      risk_severity: form.severity,
      risk_trigger_event: form.trigger
    }
    */

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">
          {risk ? "Edit Risk" : "Add Risk"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4"
        >
          <SelectField
            label="Risk Category"
            name="category"
            value={form.category}
            options={RISK_CATEGORIES}
            onChange={handleChange}
          />

          <InputField
            label="Risk Parameter"
            name="parameter"
            value={form.parameter}
            onChange={handleChange}
          />

          <SelectField
            label="Risk Severity"
            name="severity"
            value={form.severity}
            options={SEVERITIES}
            onChange={handleChange}
          />

          <TextareaField
            label="Risk Trigger Event"
            name="trigger"
            value={form.trigger}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-xl"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RiskFormModal;

/* ---------------- FIELD HELPERS ---------------- */

const InputField = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      {...props}
      className="mt-1 w-full p-3 rounded-xl bg-gray-50"
    />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      {...props}
      className="mt-1 w-full p-3 rounded-xl bg-gray-50"
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

const TextareaField = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      {...props}
      rows={3}
      className="mt-1 w-full p-3 rounded-xl bg-gray-50"
    />
  </div>
);
