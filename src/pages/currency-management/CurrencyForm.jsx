import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave } from "react-icons/fi";

import currencyManagementService from "../../services/currencyManagementService";
import {
  SubPageHeader,
  InputField,
  SelectField,
  Button,
} from "../../components/Controls/SharedUIHelpers";

/* ================= OPTIONS ================= */
const STATUS_OPTIONS = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const CURRENCY_OPTIONS = [
  { label: "INR", value: "INR" },
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
];

export default function CurrencyForm({ isEdit = false }) {
  const navigate = useNavigate();
  const { uuid } = useParams();

  const [form, setForm] = useState({
    currency_code: "",
    currency_symbol: "",
    conversion_value_to_inr: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH ================= */
  useEffect(() => {
    if (isEdit && uuid) {
      setLoading(true);
      currencyManagementService
        .getOne(uuid)
        .then((res) => setForm(res))
        .catch(() => setError("Failed to load currency details"))
        .finally(() => setLoading(false));
    }
  }, [isEdit, uuid]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEdit && uuid) {
        await currencyManagementService.update(uuid, form);
      } else {
        await currencyManagementService.create(form);
      }
      navigate("/currency-management");
    } catch {
      setError("Failed to save currency. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* ================= HEADER ================= */}
      <SubPageHeader
        title={isEdit ? "Edit Currency" : "Add Currency"}
        subtitle="Configure currency conversion values"
        onBack={() => navigate(-1)}
      />

      {/* ================= FORM ================= */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <SelectField
            label="Currency Code"
            name="currency_code"
            value={form.currency_code}
            onChange={handleChange}
            options={CURRENCY_OPTIONS}
            placeholder="Select Currency"
          />

          <InputField
            label="Currency Symbol"
            name="currency_symbol"
            value={form.currency_symbol}
            onChange={handleChange}
            placeholder="₹, $, €"
          />

          <InputField
            label="Conversion Value to INR"
            name="conversion_value_to_inr"
            type="number"
            value={form.conversion_value_to_inr}
            onChange={handleChange}
          />

          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={STATUS_OPTIONS}
          />

          {error && (
            <div className="md:col-span-2 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="md:col-span-2 pt-4">
            <Button
              type="submit"
              fullWidth
              icon={<FiSave />}
              label={loading ? "Saving..." : "Save Currency"}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
