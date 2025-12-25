import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const VERIFICATION_TYPES = ["Tele Verification", "CPV", "Document Check"];
const STATUS = ["Active", "Inactive"];

export default function EditInternalVerificationRule() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    verification_type: "",
    criteria: "",
    remarks: "",
    status: "Active",
  });

  useEffect(() => {
    setForm({
      verification_type: "Tele Verification",
      criteria: "Applicant Contact Check",
      remarks: "Mandatory before approval",
      status: "Active",
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Internal Verification Rule:", form);
    navigate("/rule-management/verification/internal");
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
          Edit Internal Verification Rule
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Select
          label="Verification Type"
          name="verification_type"
          value={form.verification_type}
          onChange={handleChange}
          options={VERIFICATION_TYPES}
          required
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={STATUS}
        />

        <Input
          label="Criteria"
          name="criteria"
          value={form.criteria}
          onChange={handleChange}
          required
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
