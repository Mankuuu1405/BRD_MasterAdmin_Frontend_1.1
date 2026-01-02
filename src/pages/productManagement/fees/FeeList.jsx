import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

import {
  PageHeader,
  SearchFilterBar,
  ListView,
  DeleteConfirmButton,
} from "../../../components/Controls/SharedUIHelpers";

// import { feesService } from "../../../services/feesService";

const FeeList = () => {
  const navigate = useNavigate();

  const [fees, setFees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  /* ================= LOAD FEES ================= */
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
            status: true,
          },
          {
            id: 2,
            name: "Late Payment Fee",
            frequency: "Monthly",
            basis: "Fixed",
            recovery_stage: "Ongoing",
            recovery_mode: "Cash",
            rate: "₹500",
            status: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ================= FILTER ================= */
  const filteredFees = fees.filter((fee) =>
    fee.name?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= LIST CONFIG ================= */
  const columns = [
    { key: "name", label: "Fee Name" },
    { key: "frequency", label: "Frequency" },
    { key: "basis", label: "Basis" },
    { key: "recovery_stage", label: "Recovery Stage" },
    { key: "rate", label: "Rate" },
    { key: "status", label: "Status", type: "status" },
  ];

  const actions = [
    {
      icon: <FiEdit />,
      color: "blue",
      onClick: (row) => navigate(`/fees/${row.id}/edit`),
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
        title="Fees Management"
        subtitle="Manage fee definitions and recovery rules"
        actionLabel="Add Fee"
        actionIcon={<FiPlus />}
        onAction={() => navigate("/fees/add")}
      />

      {/* ================= SEARCH ================= */}
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search fee name..."
      />

      {/* ================= LIST ================= */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading fees...</p>
      ) : filteredFees.length === 0 ? (
        <p className="text-gray-500 text-sm">No fees found.</p>
      ) : (
        <ListView
          data={filteredFees}
          columns={columns}
          actions={actions}
          rowKey="id"
        />
      )}

      {/* ================= DELETE CONFIRM ================= */}
      {deleteId && (
        <DeleteConfirmButton
          title="Delete Fee"
          message="Are you sure you want to delete this fee?"
          onCancel={() => setDeleteId(null)}
          onConfirm={() => setDeleteId(null)}
        />
      )}
    </MainLayout>
  );
};

export default FeeList;
