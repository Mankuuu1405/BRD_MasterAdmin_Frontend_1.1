import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiEdit3, FiEye, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AgencyVerificationRule() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const rules = [
    {
      id: 1,
      agency_type: "Field Verification Agency",
      verification_stage: "Pre Sanction",
      report_type: "Residence & Office",
      status: "Active",
    },
    {
      id: 2,
      agency_type: "Legal Agency",
      verification_stage: "Post Sanction",
      report_type: "Legal Opinion",
      status: "Inactive",
    },
  ];

  const filteredRules = rules.filter(
    (r) =>
      r.agency_type.toLowerCase().includes(search.toLowerCase()) ||
      r.report_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Agency Verification Rules</h1>
        <p className="text-sm text-gray-500">
          Configure third-party / agency based verification rules
        </p>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search agency or report type..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        <div className="hidden md:grid grid-cols-5 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Agency Type</div>
          <div>Verification Stage</div>
          <div>Report Type</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filteredRules.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-5 gap-y-2 items-center text-sm"
          >
            <div className="font-medium">{r.agency_type}</div>
            <div className="text-gray-600">{r.verification_stage}</div>
            <div className="text-gray-600">{r.report_type}</div>

            <span
              className={`px-3 py-1 text-xs rounded-full w-fit ${
                r.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {r.status}
            </span>

            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <IconButton
                color="gray"
                onClick={() =>
                  navigate(
                    `/rule-management/verification/agency/view/${r.id}`
                  )
                }
              >
                <FiEye />
              </IconButton>
              <IconButton
                color="blue"
                onClick={() =>
                  navigate(
                    `/rule-management/verification/agency/edit/${r.id}`
                  )
                }
              >
                <FiEdit3 />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

/* ---------- HELPER ---------- */

const IconButton = ({ children, onClick, color }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200`}
  >
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
