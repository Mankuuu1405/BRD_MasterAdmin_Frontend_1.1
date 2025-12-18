import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const EditApproval = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    level: "",
    type: "",
    product_type: "",
    product_name: "",
    approver_name: "",
    rate: "",
    tenure: "",
    status: "Active",
  });

  /* MOCK FETCH – replace with API */
  useEffect(() => {
    const mockData = {
      level: "1",
      type: "Individual",
      product_type: "Loan",
      product_name: "Home Loan",
      approver_name: "John Doe",
      rate: "12",
      tenure: "24",
      status: "Active",
    };
    setForm(mockData);
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Edit Approval:", id, form);
    navigate("/approvals");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-sm transition"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Approval
          </h1>
          <p className="text-gray-500 text-sm">
            Update approval configuration.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SelectField
              label="Approval Level *"
              name="level"
              value={form.level}
              onChange={handleChange}
              options={["1", "2", "3", "Final"]}
            />

            <SelectField
              label="Approval Type *"
              name="type"
              value={form.type}
              onChange={handleChange}
              options={["Individual", "Team"]}
            />

            <InputField
              label="Product Type *"
              name="product_type"
              value={form.product_type}
              onChange={handleChange}
            />

            <InputField
              label="Product Name *"
              name="product_name"
              value={form.product_name}
              onChange={handleChange}
            />

            <InputField
              label="Approver Name *"
              name="approver_name"
              value={form.approver_name}
              onChange={handleChange}
            />

            <InputField
              label="Rate (%)"
              name="rate"
              type="number"
              value={form.rate}
              onChange={handleChange}
            />

            <InputField
              label="Tenure (Months)"
              name="tenure"
              type="number"
              value={form.tenure}
              onChange={handleChange}
            />

            <SelectField
              label="Status *"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={["Active", "Inactive"]}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition text-sm"
          >
            <FiSave />
            Update Approval
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditApproval;

/* ---------- INPUT FIELD ---------- */
function InputField({ label, ...props }) {
  return (
    <div>
      <label className="text-gray-700 text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full mt-2 p-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white outline-none text-sm"
      />
    </div>
  );
}

/* ---------- SELECT FIELD ---------- */
function SelectField({ label, options, ...props }) {
  return (
    <div>
      <label className="text-gray-700 text-sm font-medium">{label}</label>
      <select
        {...props}
        className="w-full mt-2 p-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white outline-none text-sm"
      >
        <option value="">Select</option>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
