import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

// import { interestService } from "../../../services/interestService";

/* ---------------- OPTIONS (DOC BASED) ---------------- */
const BENCHMARK_TYPE_OPTIONS = ["MCLR", "RBI Rate"];
const BENCHMARK_FREQUENCY_OPTIONS = ["Monthly", "Quarterly"];

const INTEREST_TYPE_OPTIONS = ["Fixed", "Floating"];
const ACCRUAL_STAGE_OPTIONS = ["Pre-EMI", "Post-EMI"];
const ACCRUAL_METHOD_OPTIONS = ["Simple", "Compound"];

const EditInterest = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    benchmark_type: "",
    benchmark_frequency: "",
    benchmark_rate: "",
    benchmark_markup: "",
    interest_type: "",
    accrual_stage: "",
    accrual_method: "",
    interest_rate: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /* ---------------- LOAD INTEREST ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await interestService.getInterestById(id);

        setForm({
          benchmark_type: data.benchmark.type,
          benchmark_frequency: data.benchmark.frequency,
          benchmark_rate: data.benchmark.rate,
          benchmark_markup: data.benchmark.mark_up,
          interest_type: data.interest.type,
          accrual_stage: data.interest.accrual_stage,
          accrual_method: data.interest.accrual_method,
          interest_rate: data.interest.rate,
        });
        */

        // TEMP MOCK DATA
        setForm({
          benchmark_type: "MCLR",
          benchmark_frequency: "Quarterly",
          benchmark_rate: 8.5,
          benchmark_markup: 1.5,
          interest_type: "Floating",
          accrual_stage: "Post-EMI",
          accrual_method: "Compound",
          interest_rate: 10,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* ---------------- VALIDATION ---------------- */
  const validate = (v) => {
    const e = {};

    if (!v.benchmark_type) e.benchmark_type = "Benchmark type required";
    if (!v.benchmark_frequency) e.benchmark_frequency = "Frequency required";

    if (v.benchmark_rate === "")
      e.benchmark_rate = "Benchmark rate required";
    else if (+v.benchmark_rate < 0)
      e.benchmark_rate = "Rate cannot be negative";

    if (v.benchmark_markup === "")
      e.benchmark_markup = "Markup required";
    else if (+v.benchmark_markup < 0)
      e.benchmark_markup = "Markup cannot be negative";

    if (!v.interest_type) e.interest_type = "Interest type required";
    if (!v.accrual_stage) e.accrual_stage = "Accrual stage required";
    if (!v.accrual_method) e.accrual_method = "Accrual method required";

    if (v.interest_rate === "")
      e.interest_rate = "Interest rate required";
    else if (+v.interest_rate < 0)
      e.interest_rate = "Interest rate cannot be negative";

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
      benchmark_type: true,
      benchmark_frequency: true,
      benchmark_rate: true,
      benchmark_markup: true,
      interest_type: true,
      accrual_stage: true,
      accrual_method: true,
      interest_rate: true,
    });

    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    try {
      /*
      const payload = {
        benchmark: {
          type: form.benchmark_type,
          frequency: form.benchmark_frequency,
          rate: Number(form.benchmark_rate),
          mark_up: Number(form.benchmark_markup),
        },
        interest: {
          type: form.interest_type,
          accrual_stage: form.accrual_stage,
          accrual_method: form.accrual_method,
          rate: Number(form.interest_rate),
        },
      };

      await interestService.updateInterest(id, payload);
      */

      navigate(-1);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <p className="text-gray-500">Loading interest configuration...</p>
      </MainLayout>
    );
  }

  /* ---------------- UI ---------------- */
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
            Edit Interest Configuration
          </h1>
          <p className="text-gray-500 text-sm">
            Update benchmark and interest calculation rules
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* BENCHMARK SECTION */}
          <SectionTitle title="Benchmark Configuration" />

          <SelectField
            label="Benchmark Type"
            name="benchmark_type"
            value={form.benchmark_type}
            onChange={handleChange}
            onBlur={handleBlur}
            options={BENCHMARK_TYPE_OPTIONS}
            error={errors.benchmark_type}
          />

          <SelectField
            label="Frequency"
            name="benchmark_frequency"
            value={form.benchmark_frequency}
            onChange={handleChange}
            onBlur={handleBlur}
            options={BENCHMARK_FREQUENCY_OPTIONS}
            error={errors.benchmark_frequency}
          />

          <InputField
            label="Benchmark Rate (%)"
            type="number"
            name="benchmark_rate"
            value={form.benchmark_rate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.benchmark_rate}
          />

          <InputField
            label="Mark Up (%)"
            type="number"
            name="benchmark_markup"
            value={form.benchmark_markup}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.benchmark_markup}
          />

          {/* INTEREST SECTION */}
          <SectionTitle title="Interest Configuration" />

          <SelectField
            label="Interest Type"
            name="interest_type"
            value={form.interest_type}
            onChange={handleChange}
            onBlur={handleBlur}
            options={INTEREST_TYPE_OPTIONS}
            error={errors.interest_type}
          />

          <SelectField
            label="Stage of Accrual"
            name="accrual_stage"
            value={form.accrual_stage}
            onChange={handleChange}
            onBlur={handleBlur}
            options={ACCRUAL_STAGE_OPTIONS}
            error={errors.accrual_stage}
          />

          <SelectField
            label="Method of Accrual"
            name="accrual_method"
            value={form.accrual_method}
            onChange={handleChange}
            onBlur={handleBlur}
            options={ACCRUAL_METHOD_OPTIONS}
            error={errors.accrual_method}
          />

          <InputField
            label="Interest Rate (% p.a.)"
            type="number"
            name="interest_rate"
            value={form.interest_rate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.interest_rate}
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
              {submitting ? "Updating..." : "Update Interest"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

/* ---------------- REUSABLE UI ---------------- */

const SectionTitle = ({ title }) => (
  <div className="md:col-span-2 mt-4 mb-2">
    <h3 className="text-sm font-semibold text-gray-700 uppercase">
      {title}
    </h3>
  </div>
);

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

export default EditInterest;
