import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiPlus, FiEdit3, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ApprovalList = () => {
  const navigate = useNavigate();

  const [approvals, setApprovals] = useState([
    {
      id: 1,
      product_name: "Home Loan",
      product_type: "Loan",
      level: "1",
      type: "Individual",
      approval_name: { sanction: "Branch Sanction", range: "0 – 25L" },
      status: "Active",
    },
    {
      id: 2,
      product_name: "Vehicle Loan",
      product_type: "Loan",
      level: "Final",
      type: "Team",
      approval_name: { sanction: "Risk Committee", range: "25L – 1Cr" },
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredApprovals = approvals.filter(
    (a) =>
      a.product_name.toLowerCase().includes(search.toLowerCase()) ||
      a.approval_name.sanction.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!window.confirm("Delete this approval configuration?")) return;
    setApprovals(approvals.filter((a) => a.id !== id));
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Approval Master</h1>
          <p className="text-sm text-gray-500">Manage approval rules and sanction levels</p>
        </div>

        <button
          onClick={() => navigate("/approvals/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Approval
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product or sanction name..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {/* TABLE HEADER */}
        <div className="hidden md:grid grid-cols-6 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Product</div>
          <div>Level</div>
          <div>Type</div>
          <div>Sanction</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {/* ROWS */}
        {/* TABLE ROWS */}
        {filteredApprovals.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-6 gap-y-2 items-center text-sm"
          >
            {/* Product */}
            <div className="font-medium text-gray-900">{a.product_name}</div>

            {/* Level */}
            <div className="text-gray-600">{a.level}</div>

            {/* Type */}
            <div className="text-gray-600">{a.type}</div>

            {/* Sanction */}
            <div className="text-gray-600">{a.approval_name.sanction}</div>

            {/* Status */}
            {/* Status */}
<span
  className={`px-3 py-1 text-xs rounded-full justify-self-start ${
    a.status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-600"
  }`}
>
  {a.status}
</span>


            {/* Actions */}
            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <IconButton color="gray" onClick={() => navigate(`/approvals/view/${a.id}`)}>
                <FiEye />
              </IconButton>
              <IconButton color="blue" onClick={() => navigate(`/approvals/edit/${a.id}`)}>
                <FiEdit3 />
              </IconButton>
              <IconButton color="red" onClick={() => handleDelete(a.id)}>
                <FiTrash2 />
              </IconButton>
            </div>
          </div>
        ))}

      </div>
    </MainLayout>
  );
};

export default ApprovalList;

/* ---------------- HELPERS ---------------- */
const StatusBadge = ({ status }) => (
  <div className="flex justify-start md:justify-center">
    <span
      className={`px-3 py-1 text-xs rounded-full ${status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-600"
        }`}
    >
      {status}
    </span>
  </div>
);

const IconButton = ({ children, onClick, color }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200`}
  >
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
