import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  PageHeader,
  Button,
  SearchFilterBar,
  ListView,
} from "../../../components/Controls/SharedUIHelpers";

// import { moratoriumService } from "../../../services/moratoriumService";

export default function MoratoriumList() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const res = await moratoriumService.getMoratoriums();
        setData(res || []);
        */

        // TEMP MOCK
        setData([
          {
            uuid: 1,
            type: "Full",
            period: "3 Months",
            amount: "₹50,000",
            effect: "Deferred",
            interest_waived: true,
            status: true,
          },
          {
            uuid: 2,
            type: "Interest-only",
            period: "60 Days",
            amount: "₹20,000",
            effect: "Interest-only",
            interest_waived: false,
            status: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------- FILTER ---------------- */
  const filtered = data.filter((d) =>
    d.type.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- TABLE CONFIG ---------------- */
  const columns = [
    { key: "type", label: "Type" },
    { key: "period", label: "Period" },
    { key: "amount", label: "Amount" },
    { key: "effect", label: "Effect" },
    {
      key: "interest_waived",
      label: "Interest Waived",
      type: "status",
    },
    {
      key: "status",
      label: "Status",
      type: "status",
    },
  ];

  const actions = [
    {
      icon: <FiEye />,
      color: "gray",
      onClick: (row) => navigate(`/moratorium/${row.uuid}`),
    },
    {
      icon: <FiEdit />,
      color: "blue",
      onClick: (row) => navigate(`/moratorium/${row.uuid}/edit`),
    },
    {
      icon: <FiTrash2 />,
      color: "red",
      onClick: (row) => console.log("Delete", row.uuid),
    },
  ];

  return (
    <MainLayout>
      {/* HEADER */}
      <PageHeader
        title="Moratorium Management"
        subtitle="Manage payment deferral rules and impacts"
        actionLabel="Add Moratorium"
        actionIcon={<FiPlus />}
        onAction={() => navigate("/moratorium/add")}
      />

      {/* SEARCH */}
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search by moratorium type..."
      />

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading moratoriums...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">No moratorium rules found.</p>
      ) : (
        <ListView
          data={filtered}
          columns={columns}
          actions={actions}
          rowKey="uuid"
        />
      )}
    </MainLayout>
  );
}
