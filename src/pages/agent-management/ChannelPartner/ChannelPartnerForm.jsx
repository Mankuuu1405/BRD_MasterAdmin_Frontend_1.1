import React from "react";
import MainLayout from "../../layout/MainLayout";

export default function ChannelPartnerForm() {
  return (
    <MainLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add / Edit Channel Partner</h2>
        <p className="text-sm text-gray-500">
          Configure referral agent details and status
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

          {/* Agent Type */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Agent Type
            </label>
            <select className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Select type</option>
              <option>DSA</option>
              <option>Broker</option>
              <option>Lead Partner</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              placeholder="Enter mobile number"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Email Address
            </label>
            <input
              placeholder="Enter email address"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Status
            </label>
            <select className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Active</option>
              <option>Inactive</option>
            </select>
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
