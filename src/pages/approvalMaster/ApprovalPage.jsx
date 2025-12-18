import React, { useMemo, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiSearch,
  FiTrash2,
  FiEdit3,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ApprovalList = () => {
  const navigate = useNavigate();

  /* MOCK DATA – replace with hook/service later */
  const [approvals, setApprovals] = useState([
    {
      id: 1,
      product_name: "Home Loan",
      product_type: "Loan",
      level: "1",
      type: "Individual",
      approver_name: "John Doe",
      status: "Active",
    },
    {
      id: 2,
      product_name: "Vehicle Loan",
      product_type: "Loan",
      level: "Final",
      type: "Team",
      approver_name: "Risk Team",
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  /* FILTER LOGIC */
  const filteredApprovals = useMemo(() => {
    return approvals.filter((a) => {
      const q = search.toLowerCase();

      const matchesSearch =
        !q ||
        a.product_name.toLowerCase().includes(q) ||
        a.approver_name.toLowerCase().includes(q);

      const matchesLevel =
        levelFilter === "ALL" || a.level === levelFilter;

      const matchesStatus =
        statusFilter === "ALL" || a.status === statusFilter;

      return matchesSearch && matchesLevel && matchesStatus;
    });
  }, [approvals, search, levelFilter, statusFilter]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this approval?")) return;
    setApprovals(approvals.filter((a) => a.id !== id));
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-sm transition"
          >
            <FiArrowLeft className="text-gray-700 text-xl" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Approval List
            </h1>
            <p className="text-gray-500 text-sm">
              View and manage approval configurations.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/approvals/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 shadow-sm"
        >
          + Add Approval
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex items-center gap-2 w-full md:max-w-md">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by product or approver..."
            className="flex-1 bg-gray-50 rounded-xl px-3 py-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-gray-50 text-sm outline-none"
          >
            <option value="ALL">All Levels</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="Final">Final</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-gray-50 text-sm outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        {filteredApprovals.length === 0 ? (
          <p className="text-center py-8 text-gray-500">
            No approvals found.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredApprovals.map((a) => (
              <div
                key={a.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {a.product_name}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {a.product_type} · Level {a.level} · {a.type}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Approver: {a.approver_name}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      a.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {a.status}
                  </span>

                  <button
                    onClick={() => navigate(`/approvals/edit/${a.id}`)}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                  >
                    <FiEdit3 className="text-blue-600" />
                  </button>

                  <button
                    onClick={() => handleDelete(a.id)}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200"
                  >
                    <FiTrash2 className="text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ApprovalList;
