import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEye, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ExistingObligationList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [list, setList] = useState([
    {
      uuid: "1",
      status_of_loan: "Active",
      loan_performance: "Good",
      card_type: "Credit",
      total_loans: 2,
      status: "Active",
    },
    {
      uuid: "2",
      status_of_loan: "Closed",
      loan_performance: "Average",
      card_type: "Debit",
      total_loans: 1,
      status: "Inactive",
    },
  ]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this obligation rule?")) return;
    setList(list.filter((i) => i.uuid !== id));
  };

  const filteredList = list.filter((item) =>
    item.status_of_loan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-xl font-semibold">Existing Obligation Management</h1>
                <p className="text-sm text-gray-500">
                  Manage existing loan and credit obligations
                </p>
              </div>
      
              <button
                onClick={() => navigate("/score-card/add")}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
              >
                <FiPlus /> Add Obligation Rule
              </button>
            </div>
      
            {/* SEARCH BAR */}
            <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
              <FiSearch className="text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by loan status..."
                className="w-full outline-none text-sm"
              />
            </div>

      {/* LIST */}
      <div className="space-y-3">
        {/* COLUMN HEADER */}
        <div className="hidden md:grid grid-cols-6 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Loan Status</div>
          <div>Loan Performance</div>
          <div>Card Type</div>
          <div>Total Loans</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {/* ROWS */}
        {filteredList.map((row) => (
          <div
            key={row.uuid}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-6 gap-y-2 items-center text-sm"
          >
            <div className="font-medium text-gray-900">{row.status_of_loan}</div>
            <div className="text-gray-600">{row.loan_performance}</div>
            <div className="text-gray-600">{row.card_type}</div>
            <div className="text-gray-600">{row.total_loans}</div>
            <StatusBadge status={row.status} />
            <ActionButtons
              onView={() => navigate(`/obligation/view/${row.uuid}`)}
              onEdit={() => navigate(`/obligation/edit/${row.uuid}`)}
              onDelete={() => handleDelete(row.uuid)}
            />
          </div>
        ))}

        {filteredList.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-6">
            No obligation rules found.
          </p>
        )}
      </div>
    </MainLayout>
  );
}

/* ---------- HELPERS ---------- */
const StatusBadge = ({ status }) => (
  <div className="flex justify-start md:justify-start">
    <span
      className={`px-3 py-1 text-xs rounded-full ${
        status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-600"
      }`}
    >
      {status}
    </span>
  </div>
);

const ActionButtons = ({ onView, onEdit, onDelete }) => (
  <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
    <IconBtn onClick={onView} variant="view" title="View">
      <FiEye />
    </IconBtn>
    <IconBtn onClick={onEdit} variant="edit" title="Edit">
      <FiEdit />
    </IconBtn>
    <IconBtn onClick={onDelete} variant="delete" title="Delete">
      <FiTrash2 />
    </IconBtn>
  </div>
);

const IconBtn = ({ variant = "view", children, ...props }) => {
  const styles = {
    view: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    edit: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    delete: "bg-red-100 text-red-600 hover:bg-red-200",
  };

  return (
    <button
      {...props}
      className={`p-2 rounded-full transition ${styles[variant]}`}
    >
      {children}
    </button>
  );
};
