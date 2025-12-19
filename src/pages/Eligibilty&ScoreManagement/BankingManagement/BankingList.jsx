import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import {
  FiPlus,
  FiEye,
  FiEdit,
  FiTrash2,
  FiSearch,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function BankingList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [list, setList] = useState([
    {
      uuid: "1",
      bank_account_type: "Savings",
      average_banking_dates: 6,
      average_banking_criteria: "Last 6 Months",
      status: "Active",
    },
    {
      uuid: "2",
      bank_account_type: "Current",
      average_banking_dates: 12,
      average_banking_criteria: "Last 12 Months",
      status: "Inactive",
    },
  ]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this banking rule?")) return;
    setList(list.filter((i) => i.uuid !== id));
  };

  /* ---------------- SEARCH ---------------- */
  const filteredList = list.filter((i) =>
    i.bank_account_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Banking Management</h1>
          <p className="text-sm text-gray-500">
            Manage banking eligibility rules
          </p>
        </div>

        <button
          onClick={() => navigate("/banking/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Banking Rule
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search account type..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {/* COLUMN HEADER */}
        <div className="hidden md:grid grid-cols-5 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Account Type</div>
          <div>Avg Banking Dates</div>
          <div>Criteria</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {/* ROWS */}
        {filteredList.map((row) => (
          <div
            key={row.uuid}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-5 gap-y-2 items-center text-sm"
          >
            {/* Account Type */}
            <div className="font-medium text-gray-900">
              {row.bank_account_type}
            </div>

            {/* Avg Banking Dates */}
            <div className="text-gray-600">
              {row.average_banking_dates} Months
            </div>

            {/* Criteria */}
            <div className="text-gray-600">
              {row.average_banking_criteria}
            </div>

            {/* Status */}
            <div>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  row.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {row.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <button
                onClick={() => navigate(`/banking/view/${row.uuid}`)}
                className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                title="View"
              >
                <FiEye />
              </button>

              <button
                onClick={() => navigate(`/banking/edit/${row.uuid}`)}
                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                title="Edit"
              >
                <FiEdit />
              </button>

              <button
                onClick={() => handleDelete(row.uuid)}
                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}

        {filteredList.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-6">
            No banking rules found.
          </p>
        )}
      </div>
    </MainLayout>
  );
}
