import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiSearch,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ConcessionList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [concessions, setConcessions] = useState([
    {
      id: 1,
      type_name: "Interest Rate",
      category_name: "Senior Citizen",
      applicable_on: "Sanction",
      status: "Active",
    },
    {
      id: 2,
      type_name: "Processing Fee",
      category_name: "Startup Offer",
      applicable_on: "Disbursement",
      status: "Inactive",
    },
  ]);

  const filtered = concessions.filter(
    (c) =>
      c.type_name.toLowerCase().includes(search.toLowerCase()) ||
      c.category_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!window.confirm("Delete this concession?")) return;
    setConcessions((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Concession Management</h1>
          <p className="text-sm text-gray-500">
            Manage concession types and categories
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/concession-management/type/add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2"
          >
            <FiPlus /> Concession Type
          </button>
          <button
            onClick={() => navigate("/concession-management/category/add")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl flex items-center gap-2"
          >
            <FiPlus /> Concession Category
          </button>
        </div>
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

      {/* TABLE */}
      <div className="space-y-3">
        <div className="hidden md:grid grid-cols-5 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Concession Type</div>
          <div>Category</div>
          <div>Applicable On</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-5 gap-y-2 items-center text-sm"
          >
            <div className="font-medium">{c.type_name}</div>
            <div>{c.category_name}</div>
            <div>{c.applicable_on}</div>

            <span
              className={`px-3 py-1 text-xs rounded-full justify-self-start ${
                c.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {c.status}
            </span>

            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <IconButton
                color="gray"
                onClick={() =>
                  navigate(`/concession-management/view/${c.id}`)
                }
              >
                <FiEye />
              </IconButton>
              <IconButton
                color="blue"
                onClick={() =>
                  navigate(`/concession-management/category/edit/${c.id}`)
                }
              >
                <FiEdit3 />
              </IconButton>
              <IconButton
                color="red"
                onClick={() => handleDelete(c.id)}
              >
                <FiTrash2 />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

const IconButton = ({ children, onClick, color }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200`}
  >
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
