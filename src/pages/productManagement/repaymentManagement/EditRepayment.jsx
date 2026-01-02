import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

// import { repaymentService } from "../../../services/repaymentService";

/* ---------------- OPTIONS (DOC BASED) ---------------- */
const TYPE_OPTIONS = ["EMI", "Bullet", "Step-up"];
const FREQUENCY_OPTIONS = ["Monthly", "Bi-weekly"];
const SEQUENCE_OPTIONS = ["Principal First", "Interest First"];
const COLLECTION_MODE_OPTIONS = ["NACH", "Cash", "Online"];

const MONTH_OPTIONS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const DAY_OPTIONS = [
  "Monday","Tuesday","Wednesday",
  "Thursday","Friday","Saturday","Sunday",
];

const DATE_OPTIONS = ["1","5","10","15","20","25","30"];

const EditRepayment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    type: "",
    frequency: "",
    limit_in_month: "",
    gap_first_repayment: "",
    no_of_repayments: "",
    sequence: "",
    repayment_months: [],
    repayment_days: [],
    repayment_dates: [],
    collection_mode: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await repaymentService.getRepaymentById(id);

        setForm({
          type: data.type,
          frequency: data.frequency,
          limit_in_month: data.limit_in_month,
          gap_first_repayment: data.gap_first_repayment,
          no_of_repayments: data.no_of_repayments,
          sequence: data.sequence,
          repayment_months: data.repayment_months || [],
          repayment_days: data.repayment_days || [],
          repayment_dates: data.repayment_dates || [],
          collection_mode: data.collection_mode,
        });
        */

        // TEMP MOCK DATA
        setForm({
          type: "EMI",
          frequency: "Monthly",
          limit_in_month: 24,
          gap_first_repayment: 1,
          no_of_repayments: 24,
          sequence: "Principal First",
          repayment_months: ["January", "February", "March"],
          repayment_days: ["Monday"],
          repayment_dates: ["5"],
          collection_mode: "NACH",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* ---------------- VALIDATION ---------------- */
  const validate = (v) => {
    const e = {};

    if (!v.type) e.type = "Repayment type is required";
    if (!v.frequency) e.frequency = "Frequency is required";

    if (v.limit_in_month === "")
      e.limit_in_month = "Limit in months is required";
    else if (+v.limit_in_month <= 0)
      e.limit_in_month = "Must be greater than 0";

    if (v.gap_first_repayment === "")
      e.gap_first_repayment = "Gap is required";
    else if (+v.gap_first_repayment < 0)
      e.gap_first_repayment = "Gap cannot be negative";

    if (v.no_of_repayments === "")
      e.no_of_repayments = "Number of repayments is required";
    else if (+v.no_of_repayments <= 0)
      e.no_of_repayments = "Must be greater than 0";

    if (!v.sequence) e.sequence = "Sequence is required";
    if (!v.collection_mode)
      e.collection_mode = "Mode of collection is required";

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

  const toggleMulti = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({
      type: true,
      frequency: true,
      limit_in_month: true,
      gap_first_repayment: true,
      no_of_repayments: true,
      sequence: true,
      collection_mode: true,
    });

    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    try {
      /*
      const payload = {
        type: form.type,
        frequency: form.frequency,
        limit_in_month: Number(form.limit_in_month),
        gap_first_repayment: Number(form.gap_first_repayment),
        no_of_repayments: Number(form.no_of_repayments),
        sequence: form.sequence,
        repayment_months: form.repayment_months,
        repayment_days: form.repayment_days,
        repayment_dates: form.repayment_dates,
        collection_mode: form.collection_mode,
      };

      await repaymentService.updateRepayment(id, payload);
      */

      navigate(-1);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <p className="text-gray-500">Loading repayment rule...</p>
      </MainLayout>
    );
  }

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
            Edit Repayment Rule
          </h1>
          <p className="text-gray-500 text-sm">
            Update repayment schedule and collection rules
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <SelectField label="Type" name="type" value={form.type} onChange={handleChange} onBlur={handleBlur} options={TYPE_OPTIONS} error={errors.type} />
          <SelectField label="Frequency" name="frequency" value={form.frequency} onChange={handleChange} onBlur={handleBlur} options={FREQUENCY_OPTIONS} error={errors.frequency} />

          <InputField label="Limit in Month" type="number" name="limit_in_month" value={form.limit_in_month} onChange={handleChange} onBlur={handleBlur} error={errors.limit_in_month} />
          <InputField label="Gap b/w Disbursement & 1st Repayment (Months)" type="number" name="gap_first_repayment" value={form.gap_first_repayment} onChange={handleChange} onBlur={handleBlur} error={errors.gap_first_repayment} />

          <InputField label="No. of Repayments" type="number" name="no_of_repayments" value={form.no_of_repayments} onChange={handleChange} onBlur={handleBlur} error={errors.no_of_repayments} />
          <SelectField label="Sequence of Repayment Adjustment" name="sequence" value={form.sequence} onChange={handleChange} onBlur={handleBlur} options={SEQUENCE_OPTIONS} error={errors.sequence} />

          <MultiSelect label="Repayment Months" options={MONTH_OPTIONS} values={form.repayment_months} onToggle={(v) => toggleMulti("repayment_months", v)} />
          <MultiSelect label="Repayment Days" options={DAY_OPTIONS} values={form.repayment_days} onToggle={(v) => toggleMulti("repayment_days", v)} />

          <MultiSelect label="Repayment Dates" options={DATE_OPTIONS} values={form.repayment_dates} onToggle={(v) => toggleMulti("repayment_dates", v)} />
          <SelectField label="Mode of Collection" name="collection_mode" value={form.collection_mode} onChange={handleChange} onBlur={handleBlur} options={COLLECTION_MODE_OPTIONS} error={errors.collection_mode} />

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
              {submitting ? "Updating..." : "Update Repayment Rule"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditRepayment;

/* ---------------- REUSABLE UI ---------------- */

const InputField = ({ label, type = "text", name, value, onChange, onBlur, error }) => (
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

const SelectField = ({ label, name, value, onChange, onBlur, options, error }) => (
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
        <option key={i} value={op}>{op}</option>
      ))}
    </select>
    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
  </div>
);

const MultiSelect = ({ label, options, values, onToggle }) => (
  <div className="md:col-span-2">
    <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((op) => (
        <button
          type="button"
          key={op}
          onClick={() => onToggle(op)}
          className={`px-3 py-1 rounded-full text-xs transition ${
            values.includes(op)
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {op}
        </button>
      ))}
    </div>
  </div>
);
