import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../../layout/MainLayout";

export default function LegalAgentForm() {
  const { id } = useParams(); // Get ID from route
  const [agentData, setAgentData] = useState({
    name: "",
    contactInfo: "",
    legalExpertise: "",
    jurisdiction: "",
    feeAgreement: "",
    assignedCollections: "",
  });

  // Fetch agent data if ID exists (Edit mode)
  useEffect(() => {
    if (id) {
      // Replace this with actual API call
      const fetchData = async () => {
        const data = {
          name: "Legal Shield LLP",
          contactInfo: "9876543210 / legal@example.com",
          legalExpertise: "Corporate Law",
          jurisdiction: "West Zone",
          feeAgreement: "10% per case",
          assignedCollections: "Collection A, Collection B",
        };
        setAgentData(data);
      };
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    setAgentData({ ...agentData, [e.target.name]: e.target.value });
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          {id ? "Edit Legal Agent" : "Add Legal Agent"}
        </h2>
        <p className="text-sm text-gray-500">
          Configure legal agent details, jurisdiction, and assigned collections
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
              name="name"
              value={agentData.name}
              onChange={handleChange}
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
              name="contactInfo"
              value={agentData.contactInfo}
              onChange={handleChange}
              placeholder="Enter phone or email"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Legal Expertise */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Legal Expertise
            </label>
            <input
              name="legalExpertise"
              value={agentData.legalExpertise}
              onChange={handleChange}
              placeholder="Enter area of expertise"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Jurisdiction */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Jurisdiction
            </label>
            <input
              name="jurisdiction"
              value={agentData.jurisdiction}
              onChange={handleChange}
              placeholder="Enter jurisdiction"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Fee Agreement */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Fee Agreement
            </label>
            <input
              name="feeAgreement"
              value={agentData.feeAgreement}
              onChange={handleChange}
              placeholder="Enter fee agreement"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Assigned Collections */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Assigned Collections
            </label>
            <input
              name="assignedCollections"
              value={agentData.assignedCollections}
              onChange={handleChange}
              placeholder="Enter assigned collections"
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
            {id ? "Update Agent" : "Save Agent"}
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
