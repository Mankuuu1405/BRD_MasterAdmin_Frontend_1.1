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

// import { chargeService } from "../../../services/chargeService";

/* ---------------- OPTIONS (DOC BASED) ---------------- */
const FREQUENCY_OPTIONS = [
  { label: "One-time", value: "One-time" },
  { label: "Recurring", value: "Recurring" },
];

const BASIS_OPTIONS = [
  { label: "Fixed", value: "Fixed" },
  { label: "Slab", value: "Slab" },
  { label: "Variable", value: "Variable" },
];

const RECOVERY_STAGE_OPTIONS = [
  { label: "Onboarding", value: "Onboarding" },
  { label: "Post-disbursement", value: "Post-disbursement" },
];

const RECOVERY_MODE_OPTIONS = [
  { label: "Auto", value: "Auto" },
  { label: "Manual", value: "Manual" },
];

const AddCharge = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    frequency: "",
    basis_of_recovery: "",
    recovery_stage: "",
    recovery_mode: "",
    rate: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const validate = (v) => {
    const e = {};
    if (!v.name.trim()) e.name = "Charge name is required";
    if (!v.frequency) e.frequency = "Frequency is required";
    if (!v.basis_of_recovery) e.basis_of_recovery = "Basis is required";
    if (!v.recovery_stage) e.recovery_stage = "Recovery stage is required";
    if (!v.recovery_mode) e.recovery_mode = "Recovery mode is required";
    if (v.rate === "") e.rate = "Rate is required";
    else if (+v.rate < 0) e.rate = "Rate cannot be negative";
    return e;
  };

  const errors = useMemo(() => validate(form), [form]);
  const hasErrors = Object.keys(errors).length > 0;

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((p) => ({ ...p, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      frequency: true,
      basis_of_recovery: true,
      recovery_stage: true,
      recovery_mode: true,
      rate: true,
    });

    if (hasErrors) return;

    setSubmitting(true);
    try {
      /*
      const payload = {
        name: form.name,
        frequency: form.frequency,
        basis_of_recovery: form.basis_of_recovery,
        recovery_stage: form.recovery_stage,
        recovery_mode: form.recovery_mode,
        rate: Number(form.rate),
      };

      await chargeService.addCharge(payload);
      */

      navigate("/charges");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <SubPageHeader
        title="Add Charge"
        subtitle="Define charges beyond interest and fees"
        onBack={() => navigate(-1)}
      />

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <InputField
            label="Charge Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.name && errors.name ? "border-red-400" : ""}
          />

          <SelectField
            label="Frequency"
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            options={FREQUENCY_OPTIONS}
          />

          <SelectField
            label="Basis of Recovery"
            name="basis_of_recovery"
            value={form.basis_of_recovery}
            onChange={handleChange}
            options={BASIS_OPTIONS}
          />

          <SelectField
            label="Recovery Stage"
            name="recovery_stage"
            value={form.recovery_stage}
            onChange={handleChange}
            options={RECOVERY_STAGE_OPTIONS}
          />

          <SelectField
            label="Recovery Mode"
            name="recovery_mode"
            value={form.recovery_mode}
            onChange={handleChange}
            options={RECOVERY_MODE_OPTIONS}
          />

          <InputField
            label="Rate of Charges"
            type="number"
            name="rate"
            value={form.rate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.rate && errors.rate ? "border-red-400" : ""}
          />

          {/* SUBMIT */}
          <div className="md:col-span-2">
            <Button
              type="submit"
              fullWidth
              icon={<FiSave />}
              label={submitting ? "Saving..." : "Add Charge"}
              disabled={hasErrors || submitting}
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddCharge;
