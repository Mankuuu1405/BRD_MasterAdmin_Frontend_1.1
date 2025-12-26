// src/pages/roles/AddPermission.jsx

import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { roleService } from "../../services/roleService";

const AddPermission = () => {
  const navigate = useNavigate();

  const [permissionName, setPermissionName] = useState("");
  const [permissionCode, setPermissionCode] = useState("");
  const [existingPermissions, setExistingPermissions] = useState([]);

  /* ---------------- LOAD EXISTING PERMISSIONS ---------------- */
  useEffect(() => {
    (async () => {
      try {
        const list = await roleService.getPermissions();
        setExistingPermissions(Array.isArray(list) ? list : []);
      } catch (error) {
        console.error("Failed to load permissions:", error);
      }
    })();
  }, []);

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = permissionName.trim();
    const code = permissionCode.trim();

    if (!name || !code) {
      alert("Please fill all required fields.");
      return;
    }

    // Duplicate check
    if (
      existingPermissions.some(
        (p) => p.permission_code.toLowerCase() === code.toLowerCase()
      )
    ) {
      alert("Permission code already exists!");
      return;
    }

    try {
      await permissionService.createPermission({
        permission_name: name,
        permission_code: code,
      });

      alert("Permission created successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Create permission failed:", error);
      alert("Failed to create permission.");
    }
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Add New Permission
          </h1>
          <p className="text-gray-500 text-sm">
            Define permissions to control system access.
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-xl border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Permission Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Permission Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={permissionName}
              onChange={(e) => setPermissionName(e.target.value)}
              placeholder="e.g. View Loan Products"
              className="mt-2 p-3 rounded-xl bg-gray-50 focus:bg-white shadow-sm outline-none border border-gray-200"
            />
          </div>

          {/* Permission Code */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Permission Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={permissionCode}
              onChange={(e) => setPermissionCode(e.target.value)}
              placeholder="e.g. LOAN_PRODUCT_VIEW"
              className="mt-2 p-3 rounded-xl bg-gray-50 focus:bg-white shadow-sm outline-none border border-gray-200"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md"
          >
            <FiSave className="text-lg" /> Save Permission
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddPermission;
