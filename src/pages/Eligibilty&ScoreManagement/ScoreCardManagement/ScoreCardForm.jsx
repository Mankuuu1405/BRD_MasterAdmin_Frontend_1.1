import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

/* OPTIONS */
const RISK_IMPACT_OPTIONS = ["Low", "Medium", "High"];
const STATUS_OPTIONS = ["Active", "Inactive"];

const ScoreCardForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    impact_type: "",
    risk_impact: "",
    template: "",
    professionals: "",
    employees: "",
    groups: "",
    corporates: "",
    others: "",
    status: "Active",
  });

  useEffect(() => {
    if (isEdit) {
      /* MOCK FETCH */
      setForm({
        impact_type: "Credit Risk",
        risk_impact: "High",
        template: "Retail Loan",
        professionals: 720,
        employees: 650,
        groups: 540,
        corporates: 810,
        others: 300,
        status: "Active",
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isEdit ? "Update" : "Create", form);
    navigate("/score-cards");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Edit" : "Add"} Score Card
          </h1>
          <p className="text-gray-500 text-sm">Configure score card rules</p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <InputField
            label="Impact Type *"
            name="impact_type"
            value={form.impact_type}
            onChange={handleChange}
          />

          <SelectField
            label="Risk Impact *"
            name="risk_impact"
            value={form.risk_impact}
            onChange={handleChange}
            options={RISK_IMPACT_OPTIONS}
          />

          <InputField
            label="Score Template *"
            name="template"
            value={form.template}
            onChange={handleChange}
          />

          <InputField
            label="Professionals Score"
            name="professionals"
            type="number"
            value={form.professionals}
            onChange={handleChange}
          />

          <InputField
            label="Employees Score"
            name="employees"
            type="number"
            value={form.employees}
            onChange={handleChange}
          />

          <InputField
            label="Groups Score"
            name="groups"
            type="number"
            value={form.groups}
            onChange={handleChange}
          />

          <InputField
            label="Corporates Score"
            name="corporates"
            type="number"
            value={form.corporates}
            onChange={handleChange}
          />

          <InputField
            label="Others Score"
            name="others"
            type="number"
            value={form.others}
            onChange={handleChange}
          />

          <SelectField
            label="Status *"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={STATUS_OPTIONS}
          />

          {/* SUBMIT BUTTON */}
          <div className="md:col-span-2">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md">
              <FiSave />
              {isEdit ? "Update" : "Save"} Score Card
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

/* -------------------- REUSABLE UI FIELDS -------------------- */
const InputField = ({ label, type = "text", name, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 p-3 rounded-xl bg-gray-50 shadow-sm focus:bg-white outline-none"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 p-3 rounded-xl bg-gray-50 shadow-sm outline-none focus:bg-white"
    >
      <option value="">Select {label}</option>
      {options.map((op) => (
        <option key={op} value={op}>
          {op}
        </option>
      ))}
    </select>
  </div>
);

export default ScoreCardForm;
