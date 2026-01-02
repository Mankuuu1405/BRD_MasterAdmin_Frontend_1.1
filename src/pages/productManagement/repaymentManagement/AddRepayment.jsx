import React, { useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { useNavigate } from "react-router-dom";

import {
  PageHeader,
  FormCard,
  FormGrid,
  InputField,
  SelectField,
  MultiSelectField,
  PrimaryButton,
} from "../../../components/Controls/SharedUIHelpers";

// import { repaymentService } from "../../../services/repaymentService";

/* ---------------- OPTIONS ---------------- */
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

export default function AddRepayment() {
  const navigate = useNavigate();

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
  const [submitting, setSubmitting] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const validate = (v) => {
    const e = {};
    if (!v.type) e.type = "Required";
    if (!v.frequency) e.frequency = "Required";
    if (!v.limit_in_month || v.limit_in_month <= 0)
      e.limit_in_month = "Invalid";
    if (v.gap_first_repayment < 0)
      e.gap_first_repayment = "Invalid";
    if (!v.no_of_repayments || v.no_of_repayments <= 0)
      e.no_of_repayments = "Invalid";
    if (!v.sequence) e.sequence = "Required";
    if (!v.collection_mode) e.collection_mode = "Required";
    return e;
  };

  const hasErrors = useMemo(
    () => Object.keys(validate(form)).length > 0,
    [form]
  );

  /* ---------------- HANDLERS ---------------- */
  const update = (key, value) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    setErrors(validate(updated));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    try {
      /*
      await repaymentService.addRepayment({
        ...form,
        limit_in_month: Number(form.limit_in_month),
        gap_first_repayment: Number(form.gap_first_repayment),
        no_of_repayments: Number(form.no_of_repayments),
      });
      */
      navigate("/repayment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Add Repayment Rule"
        subtitle="Define loan repayment structure and schedule"
        onBack={() => navigate(-1)}
      />

      <FormCard>
        <form onSubmit={handleSubmit}>
          <FormGrid columns={2}>
            <SelectField
              label="Repayment Type"
              value={form.type}
              options={TYPE_OPTIONS}
              error={errors.type}
              onChange={(v) => update("type", v)}
            />

            <SelectField
              label="Frequency"
              value={form.frequency}
              options={FREQUENCY_OPTIONS}
              error={errors.frequency}
              onChange={(v) => update("frequency", v)}
            />

            <InputField
              label="Limit in Months"
              type="number"
              value={form.limit_in_month}
              error={errors.limit_in_month}
              onChange={(v) => update("limit_in_month", Number(v))}
            />

            <InputField
              label="Gap before First Repayment (Months)"
              type="number"
              value={form.gap_first_repayment}
              error={errors.gap_first_repayment}
              onChange={(v) =>
                update("gap_first_repayment", Number(v))
              }
            />

            <InputField
              label="No. of Repayments"
              type="number"
              value={form.no_of_repayments}
              error={errors.no_of_repayments}
              onChange={(v) =>
                update("no_of_repayments", Number(v))
              }
            />

            <SelectField
              label="Repayment Sequence"
              value={form.sequence}
              options={SEQUENCE_OPTIONS}
              error={errors.sequence}
              onChange={(v) => update("sequence", v)}
            />

            <MultiSelectField
              label="Repayment Months"
              options={MONTH_OPTIONS}
              values={form.repayment_months}
              onChange={(v) =>
                update("repayment_months", v)
              }
            />

            <MultiSelectField
              label="Repayment Days"
              options={DAY_OPTIONS}
              values={form.repayment_days}
              onChange={(v) =>
                update("repayment_days", v)
              }
            />

            <MultiSelectField
              label="Repayment Dates"
              options={DATE_OPTIONS}
              values={form.repayment_dates}
              onChange={(v) =>
                update("repayment_dates", v)
              }
            />

            <SelectField
              label="Collection Mode"
              value={form.collection_mode}
              options={COLLECTION_MODE_OPTIONS}
              error={errors.collection_mode}
              onChange={(v) =>
                update("collection_mode", v)
              }
            />
          </FormGrid>

          <PrimaryButton
            loading={submitting}
            disabled={hasErrors}
            className="mt-6"
          >
            Add Repayment Rule
          </PrimaryButton>
        </form>
      </FormCard>
    </MainLayout>
  );
}
