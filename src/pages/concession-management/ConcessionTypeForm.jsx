import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import concessionManagementService from "../../services/concessionManagementService";

const APPLICABLE_ON = ["Sanction", "Disbursement", "Repayment"];
const STATUS = ["Active", "Inactive"];

export default function ConcessionTypeForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // UUID for edit mode

  const [form, setForm] = useState({
    concession_type_name: "",
    applicable_on: "",
    description: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);

  // Load existing data if editing
  useEffect(() => {
    if (!id) return;

    const fetchConcessionType = async () => {
      setFetching(true);
      try {
        const res = await concessionManagementService.getType(id);
        setForm({
          concession_type_name: res.concession_type_name || "",
          applicable_on: res.applicable_on || "",
          description: res.description || "",
          status: res.status || "Active",
        });
      } catch (err) {
        setError("Failed to load concession type.");
      } finally {
        setFetching(false);
      }
    };

    fetchConcessionType();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (id) {
        await concessionManagementService.updateType(id, form);
      } else {
        await concessionManagementService.createType(form);
      }
      navigate("/concession-management");
    } catch (err) {
      setError("Failed to save concession type. Please try again.");
    } finally {
      setLoading(false);
    }
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
        <div>
          <h1 className="text-2xl font-bold">
            {id ? "Edit Concession Type" : "Add Concession Type"}
          </h1>
          <p className="text-sm text-gray-500">
            Define where and how concessions apply
          </p>
        </div>
      </div>

      {fetching ? (
        <p>Loading data...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Input
            label="Concession Type Name"
            name="concession_type_name"
            value={form.concession_type_name}
            onChange={handleChange}
            placeholder="e.g. Interest Rate"
            required
          />

          <Select
            label="Applicable On"
            name="applicable_on"
            value={form.applicable_on}
            onChange={handleChange}
            options={APPLICABLE_ON}
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="md:col-span-2"
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

          <div className="md:col-span-2 flex justify-end">
            <button
              disabled={loading}
              className={`px-5 py-3 rounded-xl flex items-center gap-2 text-white ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <FiSave /> {loading ? "Saving..." : "Save Type"}
            </button>
          </div>
        </form>
      )}
    </MainLayout>
  );
}

/* ---------- INPUT COMPONENTS ---------- */

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
