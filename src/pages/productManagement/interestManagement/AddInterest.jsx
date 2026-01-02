import React, { useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  SubPageHeader,
  InputField,
  SelectField,
  Button,
} from "../../../components/Controls/SharedUIHelpers";

// import { interestService } from "../../../services/interestService";

/* ---------------- OPTIONS ---------------- */
const BENCHMARK_TYPE_OPTIONS = [
  { label: "MCLR", value: "MCLR" },
  { label: "RBI Rate", value: "RBI Rate" },
];

const BENCHMARK_FREQUENCY_OPTIONS = [
  { label: "Monthly", value: "Monthly" },
  { label: "Quarterly", value: "Quarterly" },
];

const INTEREST_TYPE_OPTIONS = [
  { label: "Fixed", value: "Fixed" },
  { label: "Floating", value: "Floating" },
];

const ACCRUAL_STAGE_OPTIONS = [
  { label: "Pre-EMI", value: "Pre-EMI" },
  { label: "Post-EMI", value: "Post-EMI" },
];

const ACCRUAL_METHOD_OPTIONS = [
  { label: "Simple", value: "Simple" },
  { label: "Compound", value: "Compound" },
];

const AddInterest = () => {
  const navigate = useNavigate();

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
  const [submitting, setSubmitting] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const validate = (v) => {
    const e = {};
    if (!v.benchmark_type) e.benchmark_type = "Required";
    if (!v.benchmark_frequency) e.benchmark_frequency = "Required";
    if (v.benchmark_rate === "") e.benchmark_rate = "Required";
    if (v.benchmark_markup === "") e.benchmark_markup = "Required";
    if (!v.interest_type) e.interest_type = "Required";
    if (!v.accrual_stage) e.accrual_stage = "Required";
    if (!v.accrual_method) e.accrual_method = "Required";
    if (v.interest_rate === "") e.interest_rate = "Required";
    return e;
  };

  const hasErrors = useMemo(
    () => Object.keys(validate(form)).length > 0,
    [form]
  );

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (name) => (e) => {
    setForm((p) => ({ ...p, [name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eMap = validate(form);
    setErrors(eMap);
    if (Object.keys(eMap).length) return;

    setSubmitting(true);
    try {
      /*
      await interestService.addInterest({...});
      */
      navigate("/interest");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <SubPageHeader
        title="Add Interest Configuration"
        subtitle="Define benchmark and interest calculation rules"
        onBack={() => navigate(-1)}
      />

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* BENCHMARK */}
          <div className="md:col-span-2 text-sm font-semibold text-gray-600">
            Benchmark Configuration
          </div>

          <SelectField
            label="Benchmark Type"
            value={form.benchmark_type}
            onChange={handleChange("benchmark_type")}
            options={BENCHMARK_TYPE_OPTIONS}
          />

          <SelectField
            label="Benchmark Frequency"
            value={form.benchmark_frequency}
            onChange={handleChange("benchmark_frequency")}
            options={BENCHMARK_FREQUENCY_OPTIONS}
          />

          <InputField
            label="Benchmark Rate (%)"
            type="number"
            value={form.benchmark_rate}
            onChange={handleChange("benchmark_rate")}
          />

          <InputField
            label="Mark Up (%)"
            type="number"
            value={form.benchmark_markup}
            onChange={handleChange("benchmark_markup")}
          />

          {/* INTEREST */}
          <div className="md:col-span-2 text-sm font-semibold text-gray-600 mt-4">
            Interest Configuration
          </div>

          <SelectField
            label="Interest Type"
            value={form.interest_type}
            onChange={handleChange("interest_type")}
            options={INTEREST_TYPE_OPTIONS}
          />

          <SelectField
            label="Accrual Stage"
            value={form.accrual_stage}
            onChange={handleChange("accrual_stage")}
            options={ACCRUAL_STAGE_OPTIONS}
          />

          <SelectField
            label="Accrual Method"
            value={form.accrual_method}
            onChange={handleChange("accrual_method")}
            options={ACCRUAL_METHOD_OPTIONS}
          />

          <InputField
            label="Interest Rate (% p.a.)"
            type="number"
            value={form.interest_rate}
            onChange={handleChange("interest_rate")}
          />

          {/* SUBMIT */}
          <div className="md:col-span-2">
            <Button
              type="submit"
              fullWidth
              icon={<FiSave />}
              label={submitting ? "Saving..." : "Add Interest"}
              disabled={hasErrors || submitting}
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddInterest;
