import React from "react";
import MainLayout from "../../../layout/MainLayout";

export default function CollectionAgentForm() {
  return (
    <MainLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add / Edit Collection Agent</h2>
        <p className="text-sm text-gray-500">
          Configure collection agent details, assigned tenants, and recovery model
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Agent Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Agent Name
            </label>
            <input
              placeholder="Enter agent full name"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Contact Info
            </label>
            <input
              placeholder="Enter phone or email"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Zone / Region */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Zone / Region
            </label>
            <select className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Select Zone</option>
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
            </select>
          </div>

          {/* Collection Type */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Collection Type
            </label>
            <select className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Select Type</option>
              <option>Soft</option>
              <option>Hard</option>
            </select>
          </div>

          {/* Assigned Tenants */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Assigned Tenants
            </label>
            <input
              placeholder="Enter tenants"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Recovery Model */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Recovery Model
            </label>
            <input
              placeholder="Enter recovery model"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Bank Details */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Bank Details
            </label>
            <input
              placeholder="Enter bank account details"
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
            Save Agent
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
