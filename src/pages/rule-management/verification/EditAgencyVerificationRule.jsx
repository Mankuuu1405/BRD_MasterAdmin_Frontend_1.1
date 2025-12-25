import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const AGENCY_TYPES = [
  "Field Verification Agency",
  "Legal Agency",
  "Technical Agency",
];
const VERIFICATION_STAGES = ["Pre Sanction", "Post Sanction", "Disbursement"];
const STATUS = ["Active", "Inactive"];

export default function EditAgencyVerificationRule() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    agency_type: "",
    verification_stage: "",
    report_type: "",
    turnaround_time: "",
    remarks: "",
    status: "Active",
  });

  useEffect(() => {
    // mock load
    setForm({
      agency_type: "Field Verification Agency",
      verification_stage: "Pre Sanction",
      report_type: "Residence & Office",
      turnaround_time: "48 Hours",
      remarks: "Mandatory for salaried customers",
      status: "Active",
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Agency Verification Rule:", form);
    navigate("/rule-management/verification/agency");
  };

  return (
    <MainLayout>
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">
          Edit Agency Verification Rule
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Select
          label="Agency Type"
          name="agency_type"
          value={form.agency_type}
          onChange={handleChange}
          options={AGENCY_TYPES}
          required
        />

        <Select
          label="Verification Stage"
          name="verification_stage"
          value={form.verification_stage}
          onChange={handleChange}
          options={VERIFICATION_STAGES}
          required
        />

        <Input
          label="Report Type"
          name="report_type"
          value={form.report_type}
          onChange={handleChange}
          required
        />

        <Input
          label="Turnaround Time"
          name="turnaround_time"
          value={form.turnaround_time}
          onChange={handleChange}
          placeholder="e.g. 24 / 48 Hours"
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={STATUS}
        />

        <Textarea
          label="Remarks"
          name="remarks"
          value={form.remarks}
          onChange={handleChange}
          className="md:col-span-2"
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

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <textarea
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border text-sm"
    />
  </div>
);
