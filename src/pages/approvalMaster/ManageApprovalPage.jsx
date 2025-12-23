import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function ManageApprovalPage() {
  const navigate = useNavigate();

  /* MOCK DATA (API LATER) */
  const tenants = ["TENANT_001", "TENANT_002"];

  const tenantUsers = {
    TENANT_001: [
      { id: "u1", name: "John Doe" },
      { id: "u2", name: "Risk Manager" },
    ],
    TENANT_002: [
      { id: "u3", name: "Admin User" },
      { id: "u4", name: "Finance Head" },
    ],
  };

  const [form, setForm] = useState({
    tenant_id: "",
    approver_type: "",
    user_id: "",
    group_users: [],
    status: "Active",
  });

  const users = form.tenant_id ? tenantUsers[form.tenant_id] : [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset dependent fields if tenant changes
    if (name === "tenant_id") {
      setForm({
        tenant_id: value,
        approver_type: "",
        user_id: "",
        group_users: [],
        status: "Active",
      });
      return;
    }

    // Reset user selections if approver type changes
    if (name === "approver_type") {
      setForm({
        ...form,
        approver_type: value,
        user_id: "",
        group_users: [],
      });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const toggleGroupUser = (userId) => {
    setForm((prev) => ({
      ...prev,
      group_users: prev.group_users.includes(userId)
        ? prev.group_users.filter((id) => id !== userId)
        : [...prev.group_users, userId],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      tenant_id: form.tenant_id,
      approver_type: form.approver_type,
      assigned_to:
        form.approver_type === "Individual"
          ? form.user_id
          : form.group_users,
      status: form.status,
    };

    console.log("Manage Approval Payload:", payload);
    navigate(-1);
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-xl bg-gray-100 border"
        >
          <FiArrowLeft />
        </button>

        <div>
          <h1 className="text-[22px] font-semibold">Manage Approval</h1>
          <p className="text-sm text-gray-500">
            Tenant → Approver Type → User/Group
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white border rounded-2xl p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-10">
          <Section title="Assignment Details">
            {/* TENANT */}
            <SelectField
              label="Tenant *"
              name="tenant_id"
              value={form.tenant_id}
              onChange={handleChange}
              options={tenants}
            />

            {/* APPROVER TYPE */}
            <SelectField
              label="Approver Type *"
              name="approver_type"
              value={form.approver_type}
              onChange={handleChange}
              options={["Individual", "Group"]}
              disabled={!form.tenant_id}
              hint={!form.tenant_id && "Select tenant first"}
            />

            {/* INDIVIDUAL USER */}
            {form.approver_type === "Individual" && (
              <SelectField
                label="Select User *"
                name="user_id"
                value={form.user_id}
                onChange={handleChange}
                options={users.map((u) => u.name)}
                disabled={!form.tenant_id}
              />
            )}

            {/* GROUP USERS */}
            {form.approver_type === "Group" && (
              <GroupChecklist
                label="Select Group Members *"
                users={users}
                selected={form.group_users}
                onToggle={toggleGroupUser}
                disabled={!form.tenant_id}
              />
            )}

            {/* STATUS */}
            <SelectField
              label="Status *"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={["Active", "Inactive"]}
            />
          </Section>

          <button
            type="submit"
            disabled={!form.tenant_id || !form.approver_type}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FiSave />
            Save Assignment
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

/* ================= UI HELPERS ================= */

const Section = ({ title, children }) => (
  <div>
    <h3 className="font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {children}
    </div>
  </div>
);

function SelectField({ label, options, hint, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        {...props}
        className="w-full mt-2 p-3 rounded-xl bg-gray-50 border text-sm disabled:opacity-50"
      >
        <option value="">Select</option>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
      {hint && (
        <p className="text-xs text-gray-400 mt-1">{hint}</p>
      )}
    </div>
  );
}

function GroupChecklist({ label, users, selected, onToggle, disabled }) {
  return (
    <div className="md:col-span-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-3 space-y-2 border rounded-xl p-4 bg-gray-50">
        {users.map((user) => (
          <label
            key={user.id}
            className={`flex items-center gap-3 text-sm ${
              disabled ? "opacity-50" : ""
            }`}
          >
            <input
              type="checkbox"
              disabled={disabled}
              checked={selected.includes(user.id)}
              onChange={() => onToggle(user.id)}
            />
            {user.name}
          </label>
        ))}
      </div>
    </div>
  );
}
