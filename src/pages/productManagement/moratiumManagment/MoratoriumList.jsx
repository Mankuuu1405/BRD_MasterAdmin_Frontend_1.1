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

import { productManagementService } from "../../../services/productManagementService";

export default function MoratoriumList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await productManagementService.getAll("moratorium");
        setData(res || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = data.filter((d) =>
    d.moratorium_type.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "moratorium_type", label: "Type", format: (v) => (v === "FULL" ? "Full" : "Interest-only") },
    { key: "period_value", label: "Period", format: (v, row) => `${v} ${row.period_unit === "DAY" ? "Days" : "Months"}` },
    { key: "amount", label: "Amount", format: (v) => `₹${v.toLocaleString()}` },
    { key: "effect_of_moratorium", label: "Effect", format: (v) => (v === "DEFERRED" ? "Deferred" : "Interest-only") },
    { key: "interest_rationalisation", label: "Interest Waived", type: "status" },
    { key: "is_active", label: "Status", type: "status" },
  ];

  const actions = [
    { icon: <FiEye />, color: "gray", onClick: (row) => navigate(`/moratorium/${row.id}`) },
    { icon: <FiEdit />, color: "blue", onClick: (row) => navigate(`/moratorium/${row.id}/edit`) },
    { icon: <FiTrash2 />, color: "red", onClick: async (row) => {
        if (window.confirm("Delete this moratorium?")) {
          await productManagementService.delete("moratorium", row.id);
          setData((prev) => prev.filter((d) => d.id !== row.id));
        }
      }
    },
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Moratorium Management"
        subtitle="Manage payment deferral rules and impacts"
        actionLabel="Add Moratorium"
        actionIcon={<FiPlus />}
        onAction={() => navigate("/moratorium/add")}
      />

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search by moratorium type..."
      />

      {loading ? (
        <p className="text-gray-500">Loading moratoriums...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">No moratorium rules found.</p>
      ) : (
        <ListView data={filtered} columns={columns} actions={actions} rowKey="id" />
      )}
    </MainLayout>
  );
}
