import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const ACCOUNT_TYPES = ["Savings", "Current", "NODAL", "Escrow"];
const STATUS = ["Active", "Inactive"];

export default function EditBank() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    bank_name: "",
    ifsc: "",
    branch: "",
    account_type: "",
    status: "Active",
  });

  /* 🔹 MOCK FETCH (replace with API later) */
  useEffect(() => {
    const mockBank = {
      bank_name: "HDFC Bank",
      ifsc: "HDFC0001234",
      branch: "Mumbai Main",
      account_type: "Savings",
      status: "Active",
    };
    setForm(mockBank);
  }, [id]);

  /* ---------- SAFE STATE UPDATE ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Bank:", form);
    alert("Bank details updated successfully");
    navigate("/bank-management");
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
          <h1 className="text-2xl font-bold">Update Bank</h1>
          <p className="text-gray-500 text-sm">Edit bank details and account type</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bank Name */}
          <Input
            label="Bank Name"
            name="bank_name"
            value={form.bank_name}
            onChange={handleChange}
            required
          />

          {/* IFSC */}
          <Input
            label="IFSC Code"
            name="ifsc"
            value={form.ifsc}
            onChange={handleChange}
            required
          />

          {/* Branch */}
          <Input
            label="Branch"
            name="branch"
            value={form.branch}
            onChange={handleChange}
            required
          />

          {/* Account Type */}
          <Select
            label="Bank Account Type"
            name="account_type"
            value={form.account_type}
            onChange={handleChange}
            options={ACCOUNT_TYPES}
            required
          />

          {/* Status */}
          <Select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={STATUS}
          />

          {/* ACTIONS */}
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate("/bank-management")}
              className="px-5 py-3 rounded-xl text-sm bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl text-sm bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700"
            >
              <FiSave /> Update Bank
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

/* ---------------- REUSABLE INPUTS ---------------- */
const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
