import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiPlus, FiEdit3, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { approvalMasterService } from "../../services/approvalMasterService";

export default function ApprovalList() {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadApprovals();
  }, []);

  const loadApprovals = async () => {
    const data = await approvalMasterService.getApprovalList();
    setApprovals(Array.isArray(data) ? data : []);
  };

  const filtered = approvals.filter(
    (a) =>
      a.product_name?.toLowerCase().includes(search.toLowerCase()) ||
      a.sanction_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold">Approval Master</h1>
          <p className="text-sm text-gray-500">
            Manage approval rules and sanction levels
          </p>
        </div>

        <button
          onClick={() => navigate("/approvals/add")}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-xl flex items-center justify-center gap-2 text-sm"
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
          placeholder="Search product or sanction..."
          className="w-full outline-none text-sm bg-transparent"
        />
      </div>

      {/* LIST */}
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">

        {/* DESKTOP HEADER */}
        <div className="hidden md:grid grid-cols-6 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600 sticky top-0 z-10">
          <div>Product</div>
          <div>Level</div>
          <div>Type</div>
          <div>Sanction</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filtered.map((a) => (
          <React.Fragment key={a.id}>
            {/* DESKTOP ROW */}
            <div className="hidden md:grid bg-white rounded-2xl px-5 py-4 shadow-sm grid-cols-6 items-center text-sm">
              <div className="font-medium truncate">{a.product_name}</div>
              <div>{a.level}</div>
              <div>{a.type}</div>
              <div className="truncate">
                {a.sanction_name} ({a.approval_range})
              </div>
              <StatusBadge status={a.status} />

              <div className="flex justify-end gap-2">
                <IconButton
                  color="gray"
                  onClick={() => navigate(`/approvals/view/${a.id}`)}
                >
                  <FiEye />
                </IconButton>
                <IconButton
                  color="blue"
                  onClick={() => navigate(`/approvals/edit/${a.id}`)}
                >
                  <FiEdit3 />
                </IconButton>
                <IconButton
                  color="red"
                  onClick={() => approvalMasterService.deleteApproval(a.id)}
                >
                  <FiTrash2 />
                </IconButton>
              </div>
            </div>

            {/* MOBILE CARD */}
            <div className="md:hidden bg-white rounded-2xl shadow-sm divide-y">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="font-semibold text-sm">
                  {a.product_name}
                </span>

                <div className="flex items-center gap-3 text-gray-600">
                  <FiEye onClick={() => navigate(`/approvals/view/${a.id}`)} />
                  <FiEdit3 onClick={() => navigate(`/approvals/edit/${a.id}`)} />
                  <FiTrash2 onClick={() => approvalMasterService.deleteApproval(a.id)} />
                </div>
              </div>

              <div className="px-4 py-3 space-y-3 text-sm">
                <Row label="Level" value={a.level} />
                <Row label="Type" value={a.type} />
                <Row
                  label="Sanction"
                  value={`${a.sanction_name} (${a.approval_range})`}
                />

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Status</span>
                  <StatusBadge status={a.status} />
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </MainLayout>
  );
}

/* ---------------- HELPERS ---------------- */

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <span className="text-gray-400 text-xs">{label}</span>
    <span className="font-medium text-gray-800 text-right">
      {value || "-"}
    </span>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center justify-center w-fit whitespace-nowrap px-3 py-1 text-xs rounded-full ${
      status === "ACTIVE"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-600"
    }`}
  >
    {status}
  </span>
);


const IconButton = ({ children, color, onClick }) => {
  const map = {
    gray: "bg-gray-100 hover:bg-gray-200 text-gray-600",
    blue: "bg-blue-100 hover:bg-blue-200 text-blue-600",
    red: "bg-red-100 hover:bg-red-200 text-red-600",
  };

  return (
    <button onClick={onClick} className={`p-2 rounded-full ${map[color]}`}>
      {children}
    </button>
  );
};
