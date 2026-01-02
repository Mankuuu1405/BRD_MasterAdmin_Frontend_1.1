import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEye, FiEdit3, FiTrash2 } from "react-icons/fi";

import { approvalMasterService } from "../../services/approvalMasterService";
import {
  PageHeader,
  SearchFilterBar,
  ListView,
  DeleteConfirmButton,
} from "../../components/Controls/SharedUIHelpers";

export default function ApprovalList() {
  const navigate = useNavigate();

  const [approvals, setApprovals] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  useEffect(() => {
    loadApprovals();
  }, []);

  const loadApprovals = async () => {
    try {
      setLoading(true);
      const data = await approvalMasterService.getApprovalList();
      setApprovals(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const confirmDelete = async () => {
    await approvalMasterService.deleteApproval(deleteId);
    setDeleteId(null);
    loadApprovals();
  };

  /* ================= FILTER ================= */
  const filtered = approvals.filter(
    (a) =>
      a.product_name?.toLowerCase().includes(search.toLowerCase()) ||
      a.sanction_name?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= LIST CONFIG ================= */
  const columns = [
    { key: "product_name", label: "Product" },
    { key: "level", label: "Level" },
    { key: "type", label: "Type" },
    {
      key: "sanction_name",
      label: "Sanction",
      render: (_, row) =>
        `${row.sanction_name} (${row.approval_range})`,
    },
    { key: "status", label: "Status", type: "status" },
  ];

  const actions = [
    {
      icon: <FiEye />,
      color: "gray",
      onClick: (row) => navigate(`/approvals/view/${row.id}`),
    },
    {
      icon: <FiEdit3 />,
      color: "blue",
      onClick: (row) => navigate(`/approvals/edit/${row.id}`),
    },
    {
      icon: <FiTrash2 />,
      color: "red",
      onClick: (row) => setDeleteId(row.id),
    },
  ];

  return (
    <MainLayout>
      {/* ================= HEADER ================= */}
      <PageHeader
        title="Approval Master"
        subtitle="Manage approval rules and sanction levels"
        actionLabel="Add Approval"
        actionIcon={<FiPlus />}
        onAction={() => navigate("/approvals/add")}
      />

      {/* ================= SEARCH ================= */}
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search product or sanction..."
      />

      {/* ================= LIST ================= */}
      {loading ? (
        <p className="text-center py-6 text-gray-500">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center py-6 text-gray-500">
          No approvals found
        </p>
      ) : (
        <ListView
          data={filtered}
          columns={columns}
          actions={actions}
          rowKey="id"
        />
      )}

      {/* ================= DELETE CONFIRM ================= */}
      {deleteId && (
        <DeleteConfirmButton
          title="Delete Approval"
          message="Are you sure you want to delete this approval rule?"
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </MainLayout>
  );
}
