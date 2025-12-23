import React from "react";
import MainLayout from "../../../layout/MainLayout";

export default function ManageFees() {
  return (
    <MainLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Manage Agent Fees</h2>
        <p className="text-sm text-gray-500">
          Define commission or service fees for collection and legal agents
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Agent Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Agent Category
            </label>
            <select className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Select Category</option>
              <option>Collection</option>
              <option>Legal</option>
            </select>
          </div>

          {/* Fee Type */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Fee Type
            </label>
            <select className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Select Fee Type</option>
              <option>Fixed</option>
              <option>Percentage</option>
            </select>
          </div>

          {/* Fee Value */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Fee Value
            </label>
            <input
              placeholder="Enter fee value"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Linked Loan Product */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Linked Loan Product
            </label>
            <input
              placeholder="Enter linked loan product"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Frequency
            </label>
            <select className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Select Frequency</option>
              <option>Per Case</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-5 py-2 rounded-xl text-sm border border-gray-300 hover:bg-gray-100 transition">
            Cancel
          </button>
          <button className="px-6 py-2 rounded-xl text-sm bg-green-600 text-white hover:bg-green-700 transition">
            Save Fees
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
