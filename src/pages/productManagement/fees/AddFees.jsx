import React, { useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/* ---------------- OPTIONS (BACKEND READY) ---------------- */
const FEE_FREQUENCY_OPTIONS = ["One-time", "Monthly", "Annually"];
const FEE_BASIS_OPTIONS = ["Fixed", "Percentage", "Slab-based"];
const RECOVERY_STAGE_OPTIONS = ["Disbursement", "Ongoing", "Closure"];
const RECOVERY_MODE_OPTIONS = ["Direct Debit", "Auto-debit", "Cash"];

const AddFees = () => {
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

  /* ---------------- VALIDATION (DOC BASED) ---------------- */
  const validate = (v) => {
    const e = {};

    if (!v.name.trim()) e.name = "Fee name is required";

    if (!v.frequency) e.frequency = "Fees frequency is required";

    if (!v.basis) e.basis = "Basis of fees is required";

    if (!v.recovery_stage)
      e.recovery_stage = "Recovery stage is required";

    if (!v.recovery_mode)
      e.recovery_mode = "Recovery mode is required";

    if (v.rate === "") {
      e.rate = "Fees rate is required";
    } else if (Number(v.rate) < 0) {
      e.rate = "Fees rate cannot be negative";
    }

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
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
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
        🔗 BACKEND PAYLOAD (READY)
        const payload = {
          name: form.name,
          fees_frequency: form.frequency,
          basis_of_fees: form.basis,
          recovery_stage: form.recovery_stage,
          recovery_mode: form.recovery_mode,
          fees_rate: Number(form.rate),
        };

        await feesService.addFee(payload);
      */

      navigate(-1);
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <MainLayout>
      {/* HEADER (CONSISTENT UI) */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Add Fee
          </h1>
          <p className="text-gray-500 text-sm">
            Define how fees are applied and recovered
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <InputField
            label="Fee Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
          />

          <SelectField
            label="Fees Frequency"
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            onBlur={handleBlur}
            options={FEE_FREQUENCY_OPTIONS}
            error={errors.frequency}
          />

          <SelectField
            label="Basis of Fees Frequency"
            name="basis"
            value={form.basis}
            onChange={handleChange}
            onBlur={handleBlur}
            options={FEE_BASIS_OPTIONS}
            error={errors.basis}
          />

          <SelectField
            label="Fees Recovery Stage"
            name="recovery_stage"
            value={form.recovery_stage}
            onChange={handleChange}
            onBlur={handleBlur}
            options={RECOVERY_STAGE_OPTIONS}
            error={errors.recovery_stage}
          />

          <SelectField
            label="Fees Recovery Mode"
            name="recovery_mode"
            value={form.recovery_mode}
            onChange={handleChange}
            onBlur={handleBlur}
            options={RECOVERY_MODE_OPTIONS}
            error={errors.recovery_mode}
          />

          <InputField
            label="Fees Rate"
            name="rate"
            type="number"
            value={form.rate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.rate}
          />

          {/* SUBMIT */}
          <div className="md:col-span-2">
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
              {submitting ? "Saving..." : "Add Fee"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

/* ---------------- REUSABLE INPUTS (SAME STYLE) ---------------- */

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

export default AddFees;
