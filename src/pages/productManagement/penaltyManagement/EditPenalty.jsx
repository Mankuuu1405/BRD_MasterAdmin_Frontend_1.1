import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

import {
  PageHeader,
  FormCard,
  InputField as Input,
  SelectField as Select,
  Button,
} from "../../../components/Controls/SharedUIHelpers";

import { penaltiesService } from "../../../services/productManagementService";

const FREQUENCY_OPTIONS = ["Recurring", "One-time"];
const BASIS_OPTIONS = ["Fixed", "Percentage", "Slab"];
const RECOVERY_STAGE_OPTIONS = ["Missed EMI", "Post Default"];
const RECOVERY_MODE_OPTIONS = ["Auto", "Manual"];

export default function EditPenalty() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    penalty_name: "",
    frequency: "",
    basis_of_recovery: "",
    recovery_stage: "",
    recovery_mode: "",
    rate_of_penalty: "",
  });

  // Load penalty data
  useEffect(() => {
    (async () => {
      try {
        const data = await penaltiesService.getPenalty(id);
        setForm({
          penalty_name: data.penalty_name,
          frequency: data.frequency,
          basis_of_recovery: data.basis_of_recovery,
          recovery_stage: data.recovery_stage,
          recovery_mode: data.recovery_mode,
          rate_of_penalty: data.rate_of_penalty,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const errors = useMemo(() => {
    const e = {};
    if (!form.penalty_name) e.penalty_name = "Penalty name is required";
    if (!form.frequency) e.frequency = "Frequency is required";
    if (!form.basis_of_recovery) e.basis_of_recovery = "Basis is required";
    if (!form.recovery_stage) e.recovery_stage = "Recovery stage is required";
    if (!form.recovery_mode) e.recovery_mode = "Recovery mode is required";
    if (!form.rate_of_penalty) e.rate_of_penalty = "Penalty rate is required";
    return e;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;
  const handleChange = (name, value) => setForm((p) => ({ ...p, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasErrors) return;
    setSubmitting(true);
    try {
      await penaltiesService.updatePenalty(id, { ...form, rate_of_penalty: Number(form.rate_of_penalty) });
      navigate(-1);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <MainLayout><p className="text-gray-500">Loading penalty details...</p></MainLayout>;

  return (
    <MainLayout>
      <PageHeader title="Edit Penalty" subtitle="Update penalty rules and recovery logic" onBack={() => navigate(-1)} />
      <FormCard>
        <form onSubmit={handleSubmit}>
          <Input label="Penalty Name" value={form.penalty_name} onChange={(v) => handleChange("penalty_name", v)} error={errors.penalty_name} required />
          <Select label="Frequency" value={form.frequency} options={FREQUENCY_OPTIONS} onChange={(v) => handleChange("frequency", v)} error={errors.frequency} required />
          <Select label="Basis of Recovery" value={form.basis_of_recovery} options={BASIS_OPTIONS} onChange={(v) => handleChange("basis_of_recovery", v)} error={errors.basis_of_recovery} required />
          <Select label="Recovery Stage" value={form.recovery_stage} options={RECOVERY_STAGE_OPTIONS} onChange={(v) => handleChange("recovery_stage", v)} error={errors.recovery_stage} required />
          <Select label="Mode of Recovery" value={form.recovery_mode} options={RECOVERY_MODE_OPTIONS} onChange={(v) => handleChange("recovery_mode", v)} error={errors.recovery_mode} required />
          <Input label="Rate of Penalties" type="number" value={form.rate_of_penalty} onChange={(v) => handleChange("rate_of_penalty", v)} error={errors.rate_of_penalty} required />

          <div className="mt-6">
            <Button type="submit" icon={<FiSave />} disabled={hasErrors || submitting} fullWidth>
              Update Penalty
            </Button>
          </div>
        </form>
      </FormCard>
    </MainLayout>
  );
}
