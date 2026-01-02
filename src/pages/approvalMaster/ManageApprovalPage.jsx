import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { FiSave } from "react-icons/fi";

import {
  SubPageHeader,
  SelectField,
  MultiSelectField,
  Button,
} from "../../components/Controls/SharedUIHelpers";

export function ManageApprovalPage() {
  const navigate = useNavigate();

  /* MOCK DATA (API LATER) */
  const tenants = [
    { label: "TENANT_001", value: "TENANT_001" },
    { label: "TENANT_002", value: "TENANT_002" },
  ];

  const tenantUsers = {
    TENANT_001: [
      { value: "u1", label: "John Doe" },
      { value: "u2", label: "Risk Manager" },
    ],
    TENANT_002: [
      { value: "u3", label: "Admin User" },
      { value: "u4", label: "Finance Head" },
    ],
  };

  const [form, setForm] = useState({
    tenant_id: "",
    approver_type: "",
    user_id: "",
    group_users: [],
    status: "Active",
  });

  const users = form.tenant_id ? tenantUsers[form.tenant_id] || [] : [];

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

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

    if (name === "approver_type") {
      setForm((prev) => ({
        ...prev,
        approver_type: value,
        user_id: "",
        group_users: [],
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
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

  /* ---------------- UI ---------------- */

  return (
    <MainLayout>
      <SubPageHeader
        title="Manage Approval"
        subtitle="Tenant → Approver Type → User / Group"
        onBack={() => navigate(-1)}
      />

      <div className="max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ================= ASSIGNMENT DETAILS ================= */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-700">
              Assignment Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* TENANT */}
              <SelectField
                label="Tenant *"
                value={form.tenant_id}
                onChange={(e) =>
                  handleChange({
                    target: { name: "tenant_id", value: e.target.value },
                  })
                }
                options={tenants}
                placeholder="Select tenant"
              />

              {/* APPROVER TYPE */}
              <SelectField
                label="Approver Type *"
                value={form.approver_type}
                onChange={(e) =>
                  handleChange({
                    target: { name: "approver_type", value: e.target.value },
                  })
                }
                options={[
                  { label: "Individual", value: "Individual" },
                  { label: "Group", value: "Group" },
                ]}
                placeholder="Select type"
              />

              {/* INDIVIDUAL USER */}
              {form.approver_type === "Individual" && (
                <SelectField
                  label="Select User *"
                  value={form.user_id}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "user_id", value: e.target.value },
                    })
                  }
                  options={users}
                  placeholder="Select user"
                />
              )}

              {/* GROUP USERS */}
              {form.approver_type === "Group" && (
                <div className="md:col-span-2">
                  <MultiSelectField
                    label="Select Group Members *"
                    values={form.group_users}
                    options={users}
                    onChange={(vals) =>
                      setForm((prev) => ({
                        ...prev,
                        group_users: vals,
                      }))
                    }
                  />
                </div>
              )}

              {/* STATUS */}
              <SelectField
                label="Status *"
                value={form.status}
                onChange={(e) =>
                  handleChange({
                    target: { name: "status", value: e.target.value },
                  })
                }
                options={[
                  { label: "Active", value: "Active" },
                  { label: "Inactive", value: "Inactive" },
                ]}
              />
            </div>
          </div>

          {/* ================= ACTION ================= */}
          <Button
            type="submit"
            fullWidth
            icon={<FiSave />}
            label="Save Assignment"
            disabled={!form.tenant_id || !form.approver_type}
          />
        </form>
      </div>
    </MainLayout>
  );
}

export default ManageApprovalPage;
