import React, { useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// import { penaltyService } from "../../../services/penaltyService";

/* ---------------- OPTIONS (DOC BASED) ---------------- */
const FREQUENCY_OPTIONS = ["Recurring", "One-time"];
const BASIS_OPTIONS = ["Fixed", "Percentage", "Slab"];
const RECOVERY_STAGE_OPTIONS = ["Missed EMI", "Post Default"];
const RECOVERY_MODE_OPTIONS = ["Auto", "Manual"];

const AddPenalty = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    frequency: "",
    basis: "",
    recovery_stage: "",
    recovery_mode: "",
    rate: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const validate = (v) => {
    const e = {};

    if (!v.name.trim())
      e.name = "Penalty name is required";

    if (!v.frequency)
      e.frequency = "Frequency is required";

    if (!v.basis)
      e.basis = "Basis of recovery is required";

    if (!v.recovery_stage)
      e.recovery_stage = "Recovery stage is required";

    if (!v.recovery_mode)
      e.recovery_mode = "Recovery mode is required";

    if (v.rate === "")
      e.rate = "Penalty rate is required";
    else if (+v.rate <= 0)
      e.rate = "Rate must be greater than 0";

    return e;
  };

  const hasErrors = useMemo(
    () => Object.keys(validate(form)).length > 0,
    [form]
  );

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = { ...form, [name]: value };
    setForm(updated);

    if (touched[name]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e) => {
    setTouched((p) => ({ ...p, [e.target.name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({
      name: true,
      frequency: true,
      basis: true,
      recovery_stage: true,
      recovery_mode: true,
      rate: true,
    });

    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    try {
      /*
      const payload = {
        name: form.name,
        frequency: form.frequency,
        basis: form.basis,
        recovery_stage: form.recovery_stage,
        recovery_mode: form.recovery_mode,
        rate: Number(form.rate),
      };

      await penaltyService.addPenalty(payload);
      */

      navigate("/penalties");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Add Penalty
          </h1>
          <p className="text-gray-500 text-sm">
            Configure penalty rules for non-compliance
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* NAME */}
          <InputField
            label="Penalty Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
          />

          {/* FREQUENCY */}
          <SelectField
            label="Frequency"
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            onBlur={handleBlur}
            options={FREQUENCY_OPTIONS}
            error={errors.frequency}
          />

          {/* BASIS */}
          <SelectField
            label="Basis of Recovery"
            name="basis"
            value={form.basis}
            onChange={handleChange}
            onBlur={handleBlur}
            options={BASIS_OPTIONS}
            error={errors.basis}
          />

          {/* RECOVERY STAGE */}
          <SelectField
            label="Recovery Stage"
            name="recovery_stage"
            value={form.recovery_stage}
            onChange={handleChange}
            onBlur={handleBlur}
            options={RECOVERY_STAGE_OPTIONS}
            error={errors.recovery_stage}
          />

          {/* RECOVERY MODE */}
          <SelectField
            label="Mode of Recovery"
            name="recovery_mode"
            value={form.recovery_mode}
            onChange={handleChange}
            onBlur={handleBlur}
            options={RECOVERY_MODE_OPTIONS}
            error={errors.recovery_mode}
          />

          {/* RATE */}
          <InputField
            label="Rate of Penalties"
            type="number"
            name="rate"
            value={form.rate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.rate}
          />

          {/* SUBMIT */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={hasErrors || submitting}
              className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-white shadow-md transition ${
                hasErrors || submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <FiSave />
              {submitting ? "Saving..." : "Add Penalty"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddPenalty;

/* ---------------- REUSABLE UI ---------------- */

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
}) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="mt-2 p-3 rounded-xl bg-gray-50 focus:bg-white shadow-sm outline-none"
    />
    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
}) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="mt-2 p-3 rounded-xl bg-gray-50 shadow-sm outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((op, i) => (
        <option key={i} value={op}>
          {op}
        </option>
      ))}
    </select>
    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
  </div>
);
