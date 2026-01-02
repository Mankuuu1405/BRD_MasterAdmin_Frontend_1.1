import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  PageHeader,
  SearchFilterBar,
  ListView,
  Button,
  DeleteConfirmButton,
} from "../../../components/Controls/SharedUIHelpers";

// import { penaltyService } from "../../../services/penaltyService";

export default function PenaltyList() {
  const navigate = useNavigate();

  const [penalties, setPenalties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteRow, setDeleteRow] = useState(null);

  /* ---------------- LOAD LIST ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await penaltyService.getPenalties();
        setPenalties(data || []);
        */

        // TEMP MOCK DATA
        setPenalties([
          {
            id: 1,
            name: "Late EMI Penalty",
            frequency: "Recurring",
            basis: "Percentage",
            recovery_stage: "Missed EMI",
            recovery_mode: "Auto",
            rate: "2%",
            status: true,
          },
          {
            id: 2,
            name: "Default Penalty",
            frequency: "One-time",
            basis: "Fixed",
            recovery_stage: "Post Default",
            recovery_mode: "Manual",
            rate: "₹5000",
            status: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------- FILTER ---------------- */
  const filteredData = penalties.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- TABLE CONFIG ---------------- */
  const columns = [
    { key: "name", label: "Penalty Name" },
    { key: "frequency", label: "Frequency" },
    { key: "basis", label: "Basis" },
    { key: "recovery_stage", label: "Recovery Stage" },
    { key: "recovery_mode", label: "Mode" },
    { key: "rate", label: "Rate" },
    { key: "status", label: "Status", type: "status" },
  ];

  const actions = [
    {
      icon: <FiEye />,
      color: "gray",
      onClick: (row) => navigate(`/penalties/${row.id}`),
    },
    {
      icon: <FiEdit />,
      color: "blue",
      onClick: (row) => navigate(`/penalties/${row.id}/edit`),
    },
    {
      icon: <FiTrash2 />,
      color: "red",
      onClick: (row) => setDeleteRow(row),
    },
  ];

  return (
    <MainLayout>
      {/* PAGE HEADER */}
      <PageHeader
        title="Penalties Management"
        subtitle="Manage penalty rules for defaults and late payments"
        actionLabel="Add Penalty"
        actionIcon={<FiPlus />}
        onAction={() => navigate("/penalties/add")}
      />

      {/* SEARCH */}
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search penalty name..."
      />

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading penalties...</p>
      ) : filteredData.length === 0 ? (
        <p className="text-gray-500 text-sm">No penalties found.</p>
      ) : (
        <ListView
          data={filteredData}
          columns={columns}
          actions={actions}
          rowKey="id"
        />
      )}

      {/* DELETE CONFIRM */}
      {deleteRow && (
        <DeleteConfirmButton
          title="Delete Penalty"
          message={`Are you sure you want to delete "${deleteRow.name}"?`}
          onCancel={() => setDeleteRow(null)}
          onConfirm={() => {
            // await penaltyService.deletePenalty(deleteRow.id);
            setPenalties((prev) =>
              prev.filter((p) => p.id !== deleteRow.id)
            );
            setDeleteRow(null);
          }}
        />
      )}
    </MainLayout>
  );
}
