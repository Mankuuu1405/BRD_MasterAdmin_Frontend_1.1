import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

import {
  SubPageHeader,
  InputField,
  SelectField,
  CheckboxGroup,
  Button,
} from "../../../components/Controls/SharedUIHelpers";

// import { moratoriumService } from "../../../services/moratoriumService";

/* ---------------- OPTIONS ---------------- */
const TYPE_OPTIONS = [
  { label: "Full", value: "Full" },
  { label: "Interest-only", value: "Interest-only" },
];

const PERIOD_UNIT_OPTIONS = [
  { label: "Months", value: "Months" },
  { label: "Days", value: "Days" },
];

const EFFECT_OPTIONS = [
  { label: "Interest-only", value: "Interest-only" },
  { label: "Deferred", value: "Deferred" },
];

export default function EditMoratorium() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    type: "",
    period_value: "",
    period_unit: "Months",
    amount: "",
    effect: "",
    interest_rationalisation: false,
  });

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await moratoriumService.getMoratoriumById(id);
        setForm({
          type: data.type,
          period_value: data.period_value,
          period_unit: data.period_unit,
          amount: data.amount,
          effect: data.effect,
          interest_rationalisation: data.interest_rationalisation,
        });
        */

        // TEMP MOCK
        setForm({
          type: "Full",
          period_value: 3,
          period_unit: "Months",
          amount: 50000,
          effect: "Deferred",
          interest_rationalisation: true,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* ---------------- VALIDATION ---------------- */
  const hasErrors = useMemo(() => {
    if (!form.type) return true;
    if (!form.period_value || form.period_value <= 0) return true;
    if (!form.amount || form.amount <= 0) return true;
    if (!form.effect) return true;
    return false;
  }, [form]);

  /* ---------------- HANDLERS ---------------- */
  const update = (key, value) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasErrors) return;

    setSubmitting(true);
    try {
      /*
      const payload = {
        type: form.type,
        period_value: Number(form.period_value),
        period_unit: form.period_unit,
        amount: Number(form.amount),
        effect: form.effect,
        interest_rationalisation: form.interest_rationalisation,
      };

      await moratoriumService.updateMoratorium(id, payload);
      */
      navigate(-1);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <p className="text-gray-500">Loading moratorium details...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* HEADER */}
      <SubPageHeader
        title="Edit Moratorium"
        subtitle="Update moratorium configuration and interest impact"
        onBack={() => navigate(-1)}
      />

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <SelectField
          label="Moratorium Type"
          value={form.type}
          onChange={(e) => update("type", e.target.value)}
          options={TYPE_OPTIONS}
          placeholder="Select type"
        />

        <div className="flex gap-4">
          <InputField
            label="Period"
            type="number"
            value={form.period_value}
            onChange={(e) => update("period_value", e.target.value)}
          />

          <SelectField
            label="Unit"
            value={form.period_unit}
            onChange={(e) => update("period_unit", e.target.value)}
            options={PERIOD_UNIT_OPTIONS}
          />
        </div>

        <InputField
          label="Amount Under Moratorium"
          type="number"
          value={form.amount}
          onChange={(e) => update("amount", e.target.value)}
        />

        <SelectField
          label="Effect of Moratorium"
          value={form.effect}
          onChange={(e) => update("effect", e.target.value)}
          options={EFFECT_OPTIONS}
          placeholder="Select effect"
        />

        <div className="md:col-span-2">
          <CheckboxGroup
            label="Interest Treatment"
            values={form.interest_rationalisation ? ["YES"] : []}
            options={[
              {
                label: "Waive / Rationalise Interest during Moratorium",
                value: "YES",
              },
            ]}
            onChange={() =>
              update(
                "interest_rationalisation",
                !form.interest_rationalisation
              )
            }
          />
        </div>

        <div className="md:col-span-2">
          <Button
            type="submit"
            label={submitting ? "Updating..." : "Update Moratorium"}
            icon={<FiSave />}
            fullWidth
            disabled={hasErrors || submitting}
          />
        </div>
      </form>
    </MainLayout>
  );
}
