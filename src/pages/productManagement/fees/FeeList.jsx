import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// import { feesService } from "../../../services/feesService";

const FeeList = () => {
  const navigate = useNavigate();

  const [fees, setFees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD FEES ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await feesService.getFees();
        setFees(data || []);
        */

        // TEMP MOCK DATA
        setFees([
          {
            id: 1,
            name: "Processing Fee",
            frequency: "One-time",
            basis: "Percentage",
            recovery_stage: "Disbursement",
            recovery_mode: "Auto-debit",
            rate: "2%",
            status: "Active",
          },
          {
            id: 2,
            name: "Late Payment Fee",
            frequency: "Monthly",
            basis: "Fixed",
            recovery_stage: "Ongoing",
            recovery_mode: "Cash",
            rate: "₹500",
            status: "Active",
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const filteredFees = fees.filter((fee) =>
    fee.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Fees Management</h1>
          <p className="text-sm text-gray-500">
            Manage fee definitions and recovery rules
          </p>
        </div>

        <button
          onClick={() => navigate("/fees/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Fee
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search fee name..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading fees...</p>
      ) : (
        <div className="space-y-3">
          {/* COLUMN HEADER */}
          <div className="hidden md:grid grid-cols-7 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
            <div>Fee Name</div>
            <div>Frequency</div>
            <div>Basis</div>
            <div>Recovery</div>
            <div>Rate</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>

          {/* ROWS */}
          {filteredFees.map((fee) => (
            <div
              key={fee.id}
              className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-7 gap-y-2 items-center text-sm"
            >
              {/* Fee Name */}
              <div className="font-medium text-gray-900">
                {fee.name}
              </div>

              {/* Frequency */}
              <div className="text-gray-600">
                {fee.frequency}
              </div>

              {/* Basis */}
              <div className="text-gray-600">
                {fee.basis}
              </div>

              {/* Recovery */}
              <div className="text-gray-600">
                {fee.recovery_stage}
                <div className="text-xs text-gray-400">
                  {fee.recovery_mode}
                </div>
              </div>

              {/* Rate */}
              <div className="font-medium text-gray-700">
                {fee.rate}
              </div>

              {/* Status */}
              <div>
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  {fee.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
                <button
                  onClick={() => navigate(`/fees/${fee.id}/edit`)}
                  className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <FiEdit />
                </button>

                <button
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}

          {filteredFees.length === 0 && (
            <p className="text-gray-500 text-sm">
              No fees found.
            </p>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default FeeList;
