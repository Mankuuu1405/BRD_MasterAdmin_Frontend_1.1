import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const MODEL_TYPES = ["Mark-up Model", "Payout Model", "Lease Model", "Co-Lending Model"];
const STATUS = ["Active", "Inactive"];

const BusinessModelFormPage = ({ modeType }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  useEffect(() => {
    if (modeType === "edit" && id) {
      const existingModel = {
        name: "Mark-up Model",
        description: "Margin is applied over the base rate or fund cost",
        status: "Active",
      };
      setForm(existingModel);
    }
  }, [id, modeType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
    navigate("/business-model");
  };

  return (
    <MainLayout>
      <div className="max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100"
          >
            <FiArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-bold">
              {modeType === "add" ? "Add Business Model" : "Edit Business Model"}
            </h1>
            <p className="text-gray-500 text-sm">Configure business model details</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 gap-4"
        >
          <Select
            label="Model Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            options={MODEL_TYPES}
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />

          <Select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={STATUS}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-700"
          >
            <FiSave /> Save
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default BusinessModelFormPage;

/* ---------------- REUSABLE ---------------- */
const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <textarea
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
