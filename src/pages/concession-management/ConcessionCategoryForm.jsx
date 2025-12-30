import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import concessionManagementService from "../../services/concessionManagementService";

const PRODUCTS = ["Loan"];
const STATUS = ["Active", "Inactive"];

export default function ConcessionCategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // UUID for edit mode

  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    category_name: "",
    linked_concession_type: "",
    eligibility_criteria: "",
    product_type: "",
    valid_from: "",
    valid_to: "",
    status: "Active",
  });

  /* ---------- LOAD CONCESSION TYPES ---------- */
  useEffect(() => {
    const loadTypes = async () => {
      try {
        const res = await concessionManagementService.getAllTypes();
        setTypes(res);
      } catch {
        setError("Failed to load concession types");
      }
    };
    loadTypes();
  }, []);

  /* ---------- LOAD EXISTING CATEGORY IF EDIT ---------- */
  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      setFetching(true);
      try {
        const res = await concessionManagementService.getCategory(id);
        setForm({
          category_name: res.category_name || "",
          linked_concession_type: res.linked_concession_type || "",
          eligibility_criteria: res.eligibility_criteria || "",
          product_type: res.product_type || "",
          valid_from: res.valid_from || "",
          valid_to: res.valid_to || "",
          status: res.status || "Active",
        });
      } catch (err) {
        setError("Failed to load category details");
      } finally {
        setFetching(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (id) {
        await concessionManagementService.updateCategory(id, form);
      } else {
        await concessionManagementService.createCategory(form);
      }
      navigate("/concession-management");
    } catch (err) {
      console.error("API error:", err.response?.data);
      setError("Failed to save concession category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-gray-50">
          <FiArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">
          {id ? "Edit Concession Category" : "Add Concession Category"}
        </h1>
      </div>

      {fetching ? (
        <p>Loading category details...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Input
            label="Category Name"
            name="category_name"
            value={form.category_name}
            onChange={handleChange}
            required
          />

          <Select
            label="Linked Concession Type"
            name="linked_concession_type"
            value={form.linked_concession_type}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {types.map((t) => (
              <option key={t.uuid} value={t.uuid}>
                {t.concession_type_name}
              </option>
            ))}
          </Select>

          <Select
            label="Product Type"
            name="product_type"
            value={form.product_type}
            onChange={handleChange}
            options={PRODUCTS}
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
            type="date"
            label="Valid From"
            name="valid_from"
            value={form.valid_from}
            onChange={handleChange}
          />

          <Input
            type="date"
            label="Valid To"
            name="valid_to"
            value={form.valid_to}
            onChange={handleChange}
          />

          <Textarea
            label="Eligibility Criteria"
            name="eligibility_criteria"
            value={form.eligibility_criteria}
            onChange={handleChange}
            className="md:col-span-2"
          />

          {error && (
            <div className="md:col-span-2 text-sm text-red-600">{error}</div>
          )}

          <div className="md:col-span-2 flex justify-end">
            <button
              disabled={loading}
              className={`px-5 py-3 rounded-xl flex items-center gap-2 text-white ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              <FiSave /> {loading ? "Saving..." : "Save Category"}
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

const Select = ({ label, options, children, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border text-sm"
    >
      <option value="">Select</option>
      {children ??
        options.map((o) => (
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
