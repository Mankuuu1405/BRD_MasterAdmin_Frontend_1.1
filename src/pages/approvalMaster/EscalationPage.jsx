import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  SubPageHeader,
  InputField,
  SelectField,
  Button,
} from "../../components/Controls/SharedUIHelpers";

export function EscalationPage() {
  const navigate = useNavigate();

  /* MOCK USERS – replace with API */
  const users = [
    { label: "John Doe", value: "john.doe" },
    { label: "Risk Manager", value: "risk.manager" },
    { label: "Admin User", value: "admin.user" },
  ];

  const [form, setForm] = useState({
    escalation_level: "",
    escalation_time: "",
    escalation_manage: "",
    escalation_to: "",
    status: "Active",
  });

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Escalation Payload:", form);
    navigate(-1);
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <SubPageHeader
        title="Escalation Master"
        subtitle="Manage delayed approval escalation rules"
        onBack={() => navigate(-1)}
      />

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 max-w-4xl space-y-8"
      >
        {/* SECTION TITLE */}
        <h3 className="text-gray-900 font-semibold">
          Escalation Details
        </h3>

        {/* FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="Escalation Level *"
            value={form.escalation_level}
            onChange={handleChange("escalation_level")}
            placeholder="Select level"
            options={[
              { label: "Level 1", value: "1" },
              { label: "Level 2", value: "2" },
              { label: "Level 3", value: "3" },
              { label: "Level 4", value: "4" },
            ]}
          />

          <InputField
            label="Escalation Time *"
            type="datetime-local"
            value={form.escalation_time}
            onChange={handleChange("escalation_time")}
          />

          <SelectField
            label="Escalation Manager *"
            value={form.escalation_manage}
            onChange={handleChange("escalation_manage")}
            placeholder="Select manager"
            options={users}
          />

          <SelectField
            label="Escalation To *"
            value={form.escalation_to}
            onChange={handleChange("escalation_to")}
            placeholder="Select user"
            options={users}
          />

          <SelectField
            label="Status *"
            value={form.status}
            onChange={handleChange("status")}
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
          />
        </div>

        {/* ACTION */}
        <div className="pt-6 flex justify-end">
          <Button
            type="submit"
            label="Save Escalation Rule"
            icon={<FiSave />}
            variant="primary"
            size="md"
          />
        </div>
      </form>
    </MainLayout>
  );
}
