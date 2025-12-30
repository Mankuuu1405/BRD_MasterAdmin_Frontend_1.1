import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import currencyManagementService from "../../services/currencyManagementService";

const STATUS = ["Active", "Inactive"];
const CURRENCIES = ["INR", "USD", "EUR", "GBP"];

export default function CurrencyForm({ isEdit = false }) {
  const navigate = useNavigate();
  const { uuid } = useParams(); // For edit mode

  const [form, setForm] = useState({
    currency_code: "",
    currency_symbol: "",
    conversion_value_to_inr: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load existing currency if editing
  useEffect(() => {
    if (isEdit && uuid) {
      setLoading(true);
      currencyManagementService
        .getOne(uuid)
        .then((res) => setForm(res))
        .catch((err) => {
          console.error("Failed to load currency:", err.response?.data || err);
          setError("Failed to load currency details");
        })
        .finally(() => setLoading(false));
    }
  }, [isEdit, uuid]);

  const handleChange = (e, isNumber = false) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: isNumber ? Number(value) : value,
    }));
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
    } catch (err) {
      console.error("API error:", err.response?.data || err);
      setError("Failed to save currency. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100"
        >
          <FiArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold">
            {isEdit ? "Edit Currency" : "Add Currency"}
          </h1>
          <p className="text-gray-500 text-sm">
            Configure currency conversion values
          </p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Select
          label="Currency Code"
          name="currency_code"
          value={form.currency_code}
          onChange={handleChange}
          options={CURRENCIES}
          required
        />

        <Input
          label="Currency Symbol"
          name="currency_symbol"
          value={form.currency_symbol}
          onChange={handleChange}
          placeholder="₹, $, €"
          required
        />

        <NumberInput
          label="Conversion Value to INR"
          name="conversion_value_to_inr"
          value={form.conversion_value_to_inr}
          onChange={(e) => handleChange(e, true)}
          required
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={STATUS}
          required
        />

        {error && (
          <div className="md:col-span-2 text-sm text-red-600">{error}</div>
        )}

        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-5 py-3 rounded-xl text-white flex items-center gap-2 ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <FiSave /> {loading ? "Saving..." : "Save Currency"}
          </button>
        </div>
      </form>
    </MainLayout>
  );
}

/* ---------- INPUTS ---------- */

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const NumberInput = (props) => <Input {...props} type="number" min="0" />;

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);
