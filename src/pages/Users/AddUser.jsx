import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { organizationService } from "../../services/organizationService";
import { branchService } from "../../services/branchService";
import { userService } from "../../services/userService";

import { InputField, SelectField } from "../../components/Controls/SharedUIHelpers";

const AddUser = () => {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
  const [branches, setBranches] = useState([]);

  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
    role: "",
    organization: "", // UUID string
    branch: "",       // UUID string
    status: "Active",
    employee_id: "",
    approval_limit: "",
  });

  const ROLE_MAP = {
    Admin: "ADMIN",
    "Loan Officer": "LOAN_OFFICER",
    Underwriter: "UNDERWRITER",
    "Finance Staff": "FINANCE_STAFF",
    "Sales Executive": "SALES_EXECUTIVE",
    Borrower: "BORROWER",
  };

  // Load organizations once
  useEffect(() => {
    (async () => {
      try {
        const orgs = await organizationService.getOrganizations();
        console.log(orgs)
        setOrganizations(Array.isArray(orgs) ? orgs : []);
      } catch (e) {
        console.error("Failed to load organizations:", e);
      }
    })();
  }, []);

  // Load branches whenever organization changes
  useEffect(() => {
    if (!form.organization) {
      setBranches([]);
      setForm((prev) => ({ ...prev, branch: "" }));
      return;
    }

    (async () => {
      try {
        const br = await branchService.getBranchesByOrg(form.organization);
        setBranches(Array.isArray(br) ? br : []);
        setForm((prev) => ({ ...prev, branch: "" })); // reset branch
      } catch (e) {
        console.error("Failed to load branches:", e);
      }
    })();
  }, [form.organization]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.email?.trim()) return "Email is required.";
    if (!form.email.endsWith("@gmail.com")) return "Email must be a Gmail address.";

    if (!form.phone?.trim()) return "Phone number is required.";
    if (!/^\d{10}$/.test(form.phone)) return "Phone must be exactly 10 digits.";

    if (!form.password?.trim()) return "Password is required.";
    if (!form.role) return "Role is required.";

    if (!form.organization) return "Organization is required.";
    if (!form.branch) return "Branch is required.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) return alert(error);

    const payload = {
      email: form.email,
      phone: form.phone,
      password: form.password,
      role: ROLE_MAP[form.role] || null,
      organization: form.organization, // UUID string
      branch: form.branch,             // UUID string
      employee_id: form.employee_id || "",
      approval_limit: form.approval_limit ? Number(form.approval_limit) : null,
      is_active: form.status === "Active",
      is_staff: false,
      is_superuser: false,
    };

    try {
      await userService.addUser(payload);
      alert("User added successfully!");
      navigate("/users");
    } catch (err) {
      console.error("ADD USER ERROR:", err.response?.data || err);
      alert(
        "Failed to add user:\n" +
        JSON.stringify(err.response?.data || {}, null, 2)
      );
    }
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-sm"
        >
          <FiArrowLeft className="text-xl" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Add New User</h1>
          <p className="text-gray-500 text-sm">Enter user details and assign role</p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField name="email" label="Email" value={form.email} onChange={handleChange} />
          <InputField name="phone" label="Phone" value={form.phone} onChange={handleChange} />
          <InputField name="password" label="Password" type="password" value={form.password} onChange={handleChange} />

          <SelectField
            name="role"
            label="User Role"
            value={form.role}
            onChange={handleChange}
            options={Object.keys(ROLE_MAP).map((k) => ({ label: k, value: k }))}
          />

          <SelectField
            name="organization"
            label="Organization"
            value={form.organization || ""}
            onChange={handleChange}
            options={organizations.map((o) => ({
              label: o.business_name, // correct field
              value: o.tenant_id || o.id, // backend expects tenant_id
            }))}
          />

          <SelectField
            name="branch"
            label="Branch"
            value={form.branch}
            onChange={handleChange}
            options={branches.map((b) => ({
              label: b.branch_name, // correct field
              value: b.id,          // branch UUID
            }))}
          />


          <InputField name="employee_id" label="Employee ID" value={form.employee_id} onChange={handleChange} />
          <InputField name="approval_limit" label="Approval Limit" type="number" value={form.approval_limit} onChange={handleChange} />

          <SelectField
            name="status"
            label="Status"
            value={form.status}
            onChange={handleChange}
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
          />

          <div className="md:col-span-2">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700">
              <FiSave /> Add User
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddUser;
