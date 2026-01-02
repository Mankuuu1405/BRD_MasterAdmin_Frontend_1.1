import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  PageHeader,
  SearchFilterBar,
  ListView,
} from "../../../components/Controls/SharedUIHelpers";

// import { interestService } from "../../../services/interestService";

const InterestList = () => {
  const navigate = useNavigate();

  const [interests, setInterests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD LIST ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await interestService.getInterests();
        setInterests(data || []);
        */

        // TEMP MOCK DATA
        setInterests([
          {
            id: 1,
            benchmark_type: "MCLR",
            interest_type: "Floating",
            accrual_method: "Compound",
            benchmark_rate: 8.5,
            benchmark_markup: 1.5,
            apr: 10.0,
            status: true,
          },
          {
            id: 2,
            benchmark_type: "RBI Rate",
            interest_type: "Fixed",
            accrual_method: "Simple",
            benchmark_rate: 6.5,
            benchmark_markup: 2.0,
            apr: 8.5,
            status: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const filtered = interests.filter(
    (i) =>
      i.benchmark_type.toLowerCase().includes(search.toLowerCase()) ||
      i.interest_type.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- TABLE CONFIG ---------------- */
  const columns = [
    { key: "benchmark_type", label: "Benchmark" },
    { key: "interest_type", label: "Interest Type" },
    { key: "accrual_method", label: "Accrual Method" },
    {
      key: "benchmark_rate",
      label: "Benchmark Rate",
    },
    {
      key: "benchmark_markup",
      label: "Mark Up",
    },
    {
      key: "apr",
      label: "APR",
    },
    { key: "status", label: "Status", type: "status" },
  ];

  const actions = [
    {
      icon: <FiEye />,
      onClick: (row) => navigate(`/interest/${row.id}`),
    },
    {
      icon: <FiEdit />,
      color: "blue",
      onClick: (row) => navigate(`/interest/${row.id}/edit`),
    },
    {
      icon: <FiTrash2 />,
      color: "red",
      onClick: () => {},
    },
  ];

  return (
    <MainLayout>
      {/* ================= HEADER ================= */}
      <PageHeader
        title="Interest Management"
        subtitle="Manage interest, benchmark and APR configurations"
        actionLabel="Add Interest"
        actionIcon={<FiPlus />}
        onAction={() => navigate("/interest/add")}
      />

      {/* ================= SEARCH ================= */}
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search benchmark or interest type..."
      />

      {/* ================= LIST ================= */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading interest configurations...</p>
      ) : (
        <ListView
          data={filtered}
          columns={columns}
          actions={actions}
          rowKey="id"
        />
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-gray-500 text-sm mt-4">
          No interest configurations found.
        </p>
      )}
    </MainLayout>
  );
};

export default InterestList;
