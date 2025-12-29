import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiPlus, FiEdit3, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { approvalMasterService } from "../../services/approvalMasterService";

const ApprovalList = () => {
  const navigate = useNavigate();

  const [approvals, setApprovals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      const res = await approvalMasterService.getApprovalList();
      setApprovals(res);
    } catch (error) {
      console.error("Failed to fetch approvals", error);
    }
  };

  const filteredApprovals = approvals.filter(
    (a) =>
      a.product_name?.toLowerCase().includes(search.toLowerCase()) ||
      a.sanction_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this approval configuration?")) return;

    try {
      await approvalMasterService.deleteApproval(id);
      fetchApprovals();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Approval Master</h1>
          <p className="text-sm text-gray-500">
            Manage approval rules and sanction levels
          </p>
        </div>

        <button
          onClick={() => navigate("/approvals/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Approval
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product or sanction name..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* TABLE */}
      <div className="space-y-3">
        {/* HEADER */}
        <div className="hidden md:grid grid-cols-6 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Product</div>
          <div>Level</div>
          <div>Type</div>
          <div>Sanction</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {/* ROWS */}
        {filteredApprovals.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-6 gap-y-2 items-center text-sm"
          >
            <div className="font-medium text-gray-900">
              {a.product_name}
            </div>

            <div className="text-gray-600">{a.level}</div>

            <div className="text-gray-600">{a.type}</div>

            <div className="text-gray-600">
              {a.sanction_name} ({a.approval_range})
            </div>

            <StatusBadge status={a.status} />

            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <IconButton variant="gray" onClick={() => navigate(`/approvals/view/${a.id}`)}>
                <FiEye />
              </IconButton>
              <IconButton variant="blue" onClick={() => navigate(`/approvals/edit/${a.id}`)}>
                <FiEdit3 />
              </IconButton>
              <IconButton variant="red" onClick={() => handleDelete(a.id)}>
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
  <span
    className={`px-3 py-1 text-xs rounded-full ${
      status === "ACTIVE"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-600"
    }`}
  >
    {status}
  </span>
);

const IconButton = ({ children, onClick, variant }) => {
  const styles = {
    gray: "bg-gray-100 hover:bg-gray-200 text-gray-600",
    blue: "bg-blue-100 hover:bg-blue-200 text-blue-600",
    red: "bg-red-100 hover:bg-red-200 text-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full ${styles[variant]}`}
    >
      {children}
    </button>
  );
};
