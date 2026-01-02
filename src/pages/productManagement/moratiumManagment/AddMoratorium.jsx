import React, { useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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

export default function AddMoratorium() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "",
    period_value: "",
    period_unit: "Months",
    amount: "",
    effect: "",
    interest_rationalisation: false,
  });

  /* ---------------- VALIDATION ---------------- */
  const validate = (v) => {
    const e = {};
    if (!v.type) e.type = true;
    if (!v.period_value || v.period_value <= 0) e.period_value = true;
    if (!v.amount || v.amount <= 0) e.amount = true;
    if (!v.effect) e.effect = true;
    return e;
  };

  const hasErrors = useMemo(
    () => Object.keys(validate(form)).length > 0,
    [form]
  );

  /* ---------------- HANDLERS ---------------- */
  const update = (key, value) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasErrors) return;

    /*
    const payload = {
      type: form.type,
      period_value: Number(form.period_value),
      period_unit: form.period_unit,
      amount: Number(form.amount),
      effect: form.effect,
      interest_rationalisation: form.interest_rationalisation,
    };

    await moratoriumService.addMoratorium(payload);
    */

    navigate("/moratorium");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <SubPageHeader
        title="Add Moratorium"
        subtitle="Configure moratorium rules and interest impact"
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
            label="Add Moratorium"
            icon={<FiSave />}
            fullWidth
            disabled={hasErrors}
          />
        </div>
      </form>
    </MainLayout>
  );
}
