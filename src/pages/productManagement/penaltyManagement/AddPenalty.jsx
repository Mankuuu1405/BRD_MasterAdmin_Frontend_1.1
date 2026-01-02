import React, { useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  PageHeader,
  FormCard,
  FormGrid,
  Input,
  Select,
  Button,
} from "../../../components/Controls/SharedUIHelpers";

// import { penaltyService } from "../../../services/penaltyService";

/* ---------------- OPTIONS ---------------- */
const FREQUENCY_OPTIONS = ["Recurring", "One-time"];
const BASIS_OPTIONS = ["Fixed", "Percentage", "Slab"];
const RECOVERY_STAGE_OPTIONS = ["Missed EMI", "Post Default"];
const RECOVERY_MODE_OPTIONS = ["Auto", "Manual"];

export default function AddPenalty() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    frequency: "",
    basis: "",
    recovery_stage: "",
    recovery_mode: "",
    rate: "",
  });

  const [submitting, setSubmitting] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const errors = useMemo(() => {
    const e = {};

    if (!form.name.trim()) e.name = "Penalty name is required";
    if (!form.frequency) e.frequency = "Frequency is required";
    if (!form.basis) e.basis = "Basis of recovery is required";
    if (!form.recovery_stage) e.recovery_stage = "Recovery stage is required";
    if (!form.recovery_mode) e.recovery_mode = "Recovery mode is required";

    if (form.rate === "") e.rate = "Penalty rate is required";
    else if (+form.rate <= 0) e.rate = "Rate must be greater than 0";

    return e;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasErrors) return;

    setSubmitting(true);
    try {
      /*
      await penaltyService.addPenalty({
        ...form,
        rate: Number(form.rate),
      });
      */
      navigate("/penalties");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <PageHeader
        title="Add Penalty"
        subtitle="Configure penalty rules for non-compliance"
        onBack={() => navigate(-1)}
      />

      {/* FORM */}
      <FormCard>
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Input
              label="Penalty Name"
              value={form.name}
              onChange={(v) => handleChange("name", v)}
              error={errors.name}
              required
            />

            <Select
              label="Frequency"
              value={form.frequency}
              options={FREQUENCY_OPTIONS}
              onChange={(v) => handleChange("frequency", v)}
              error={errors.frequency}
              required
            />

            <Select
              label="Basis of Recovery"
              value={form.basis}
              options={BASIS_OPTIONS}
              onChange={(v) => handleChange("basis", v)}
              error={errors.basis}
              required
            />

            <Select
              label="Recovery Stage"
              value={form.recovery_stage}
              options={RECOVERY_STAGE_OPTIONS}
              onChange={(v) => handleChange("recovery_stage", v)}
              error={errors.recovery_stage}
              required
            />

            <Select
              label="Mode of Recovery"
              value={form.recovery_mode}
              options={RECOVERY_MODE_OPTIONS}
              onChange={(v) => handleChange("recovery_mode", v)}
              error={errors.recovery_mode}
              required
            />

            <Input
              label="Rate of Penalties"
              type="number"
              value={form.rate}
              onChange={(v) => handleChange("rate", v)}
              error={errors.rate}
              required
            />
          </FormGrid>

          {/* ACTION */}
          <div className="mt-6">
            <Button
              type="submit"
              icon={<FiSave />}
              disabled={hasErrors || submitting}
              loading={submitting}
              fullWidth
            >
              Add Penalty
            </Button>
          </div>
        </form>
      </FormCard>
    </MainLayout>
  );
}
