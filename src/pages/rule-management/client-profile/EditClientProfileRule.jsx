import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

/* --- MOCK DROPDOWNS --- */
const EMPLOYER_TYPES = ["Government", "Private", "Self Employed"];
const QUALIFICATIONS = ["Graduate", "Post Graduate", "Professional"];
const STATUS = ["Active", "Inactive"];

export default function EditClientProfileRule() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    rule_name: "",
    applicant_age_min: "",
    applicant_age_max: "",
    employer_type: "",
    qualification: "",
    residence_location: "",
    business_location: "",
    status: "Active",
  });

  /* --- LOAD EXISTING RULE (MOCK) --- */
  useEffect(() => {
    // simulate API
    const existingRule = {
      rule_name: "Salaried Applicant Rule",
      applicant_age_min: 21,
      applicant_age_max: 60,
      employer_type: "Private",
      qualification: "Graduate",
      residence_location: "Urban",
      business_location: "N/A",
      status: "Active",
    };
    setForm(existingRule);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Client Profile Rule:", form);
    navigate("/rule-management/client-profile");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">Edit Client Profile Rule</h1>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Input
          label="Rule Name"
          name="rule_name"
          value={form.rule_name}
          onChange={handleChange}
          required
        />

        <Select
          label="Employer Type"
          name="employer_type"
          value={form.employer_type}
          onChange={handleChange}
          options={EMPLOYER_TYPES}
          required
        />

        <Input
          type="number"
          label="Applicant Age (Min)"
          name="applicant_age_min"
          value={form.applicant_age_min}
          onChange={handleChange}
        />

        <Input
          type="number"
          label="Applicant Age (Max)"
          name="applicant_age_max"
          value={form.applicant_age_max}
          onChange={handleChange}
        />

        <Select
          label="Qualification"
          name="qualification"
          value={form.qualification}
          onChange={handleChange}
          options={QUALIFICATIONS}
        />

        <Input
          label="Residence Location"
          name="residence_location"
          value={form.residence_location}
          onChange={handleChange}
        />

        <Input
          label="Business Location"
          name="business_location"
          value={form.business_location}
          onChange={handleChange}
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={STATUS}
        />

        <div className="md:col-span-2 flex justify-end">
          <button className="px-5 py-3 bg-indigo-600 text-white rounded-xl flex items-center gap-2">
            <FiSave /> Update Rule
          </button>
        </div>
      </form>
    </MainLayout>
  );
}

/* ---------- UI HELPERS ---------- */

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border text-sm"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border text-sm"
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
