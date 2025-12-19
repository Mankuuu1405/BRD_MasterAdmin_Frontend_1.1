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

export default function EligibilityList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  /* MOCK DATA */
  const [list, setList] = useState([
    {
      uuid: "1",
      type: "Loan",
      category: "Home Loan",
      income_type: "Salaried",
      margin: 20,
      status: "Active",
    },
    {
      uuid: "2",
      type: "Credit Card",
      category: "Personal",
      income_type: "Self Employed",
      margin: 30,
      status: "Inactive",
    },
  ]);

  /* DELETE */
  const handleDelete = (id) => {
    if (!window.confirm("Delete this eligibility?")) return;
    setList((prev) => prev.filter((i) => i.uuid !== id));
  };

  /* SEARCH */
  const filteredList = list.filter(
    (i) =>
      i.type.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Eligibility Management</h1>
          <p className="text-sm text-gray-500">
            Configure eligibility rules and margins
          </p>
        </div>

        <button
          onClick={() => navigate("/eligibility/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Eligibility
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by type or category..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {/* COLUMN HEADER */}
        <div className="hidden md:grid grid-cols-7 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Type</div>
          <div>Category</div>
          <div>Income Type</div>
          <div>Margin (%)</div>
          <div>Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* ROWS */}
        {filteredList.map((row) => (
          <div
            key={row.uuid}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-7 gap-y-2 items-center text-sm"
          >
            <div className="font-medium text-gray-900">
              {row.type}
            </div>

            <div className="text-gray-600">
              {row.category}
            </div>

            <div className="text-gray-600">
              {row.income_type}
            </div>

            <div className="font-medium text-gray-700">
              {row.margin}%
            </div>

            {/* STATUS — FIXED */}
            <div className="flex items-start">
              <StatusBadge status={row.status} />
            </div>

            {/* ACTIONS */}
            <ActionButtons
              onView={() => navigate(`/eligibility/view/${row.uuid}`)}
              onEdit={() => navigate(`/eligibility/edit/${row.uuid}`)}
              onDelete={() => handleDelete(row.uuid)}
            />
          </div>

        ))}

        {filteredList.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-6">
            No eligibility rules found.
          </p>
        )}
      </div>
    </MainLayout>
  );
}

/* ---------- REUSABLE HELPERS ---------- */

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center px-3 py-1 text-xs rounded-full whitespace-nowrap ${status === "Active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-600"
      }`}
  >
    {status}
  </span>
);


const ActionButtons = ({ onView, onEdit, onDelete }) => (
  <div className="flex justify-end gap-2 col-span-2 md:col-span-2">
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
