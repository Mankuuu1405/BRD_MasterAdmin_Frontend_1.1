import React from "react";
import MainLayout from "../../../layout/MainLayout";

export default function UpdateAgent() {
  return (
    <MainLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Update Agent</h2>
        <p className="text-sm text-gray-500">
          Update agent details, status, roles, and performance rating
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Agent Type */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Agent Type
            </label>
            <select className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Select Type</option>
              <option>Collection</option>
              <option>Legal</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Status
            </label>
            <select className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Select Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Contact Info
            </label>
            <input
              placeholder="Enter contact info"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Associated Roles */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Associated Roles
            </label>
            <input
              placeholder="Enter associated roles"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Performance Rating */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Performance Rating
            </label>
            <input
              placeholder="Enter performance rating"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-5 py-2 rounded-xl text-sm border border-gray-300 hover:bg-gray-100 transition">
            Cancel
          </button>
          <button className="px-6 py-2 rounded-xl text-sm bg-blue-600 text-white hover:bg-blue-700 transition">
            Update Agent
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
