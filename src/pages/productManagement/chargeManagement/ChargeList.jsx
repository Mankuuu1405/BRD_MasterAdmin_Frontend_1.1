import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  PageHeader,
  SearchFilterBar,
  ListView,
} from "../../../components/Controls/SharedUIHelpers";

// import { chargeService } from "../../../services/chargeService";

const ChargeList = () => {
  const navigate = useNavigate();

  const [charges, setCharges] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD LIST ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await chargeService.getCharges();
        setCharges(data || []);
        */

        // TEMP MOCK DATA
        setCharges([
          {
            id: 1,
            name: "Processing Charge",
            frequency: "One-time",
            basis_of_recovery: "Fixed",
            recovery_stage: "Onboarding",
            recovery_mode: "Auto",
            rate: "₹2,000",
            status: true,
          },
          {
            id: 2,
            name: "Inspection Charge",
            frequency: "Recurring",
            basis_of_recovery: "Variable",
            recovery_stage: "Post-disbursement",
            recovery_mode: "Manual",
            rate: "1%",
            status: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const filtered = charges.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- LIST CONFIG ---------------- */
  const columns = [
    { key: "name", label: "Charge Name" },
    { key: "frequency", label: "Frequency" },
    { key: "basis_of_recovery", label: "Basis" },
    { key: "recovery_stage", label: "Recovery Stage" },
    { key: "recovery_mode", label: "Mode" },
    { key: "rate", label: "Rate" },
    { key: "status", label: "Status", type: "status" },
  ];

  const actions = [
    {
      icon: <FiEye />,
      color: "gray",
      onClick: (row) => navigate(`/charges/${row.id}`),
    },
    {
      icon: <FiEdit />,
      color: "blue",
      onClick: (row) => navigate(`/charges/${row.id}/edit`),
    },
    {
      icon: <FiTrash2 />,
      color: "red",
      onClick: (row) => console.log("Delete", row.id),
    },
  ];

  return (
    <MainLayout>
      {/* HEADER */}
      <PageHeader
        title="Charges Management"
        subtitle="Manage additional charges beyond interest and fees"
        actionLabel="Add Charge"
        actionIcon={<FiPlus />}
        onAction={() => navigate("/charges/add")}
      />

      {/* SEARCH */}
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search charge name..."
      />

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading charges...</p>
      ) : (
        <ListView
          data={filtered}
          columns={columns}
          actions={actions}
          rowKey="id"
        />
      )}
    </MainLayout>
  );
};

export default ChargeList;
