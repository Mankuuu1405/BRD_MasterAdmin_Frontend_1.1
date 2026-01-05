import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import subscriptionService from "../../services/subscriptionService";
import { FiPlus, FiEdit3, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  PageHeader,
  Button,
  SearchFilterBar,
  ListView,
} from "../../components/Controls/SharedUIHelpers";

export default function SubscriptionPage() {
  const navigate = useNavigate();

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filters = [
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
    { label: "One Time", value: "one_time" },
  ];

  /* ================= FETCH ================= */
  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await subscriptionService.getAll();
      const data = Array.isArray(res) ? res : res?.results || [];
      setSubscriptions(data);
    } catch (err) {
      console.error("Failed to load subscriptions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return subscriptions.filter((s) => {
      const matchesSearch =
        !search ||
        s.subscription_name?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        !filter || s.subscription_type?.toLowerCase() === filter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [subscriptions, search, filter]);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subscription?")) return;
    await subscriptionService.delete(id);
    fetchSubscriptions();
  };

  /* ================= LIST CONFIG ================= */
  const columns = [
    { key: "subscription_name", label: "Name" },
    {
      key: "subscription_amount",
      label: "Amount",
      render: (v) => `₹${v}`,
    },
    { key: "no_of_borrowers", label: "Borrowers" },
    { key: "subscription_type", label: "Type" },
  ];

  const actions = [
    {
      icon: <FiEdit3 />,
      color: "blue",
      onClick: (row) => navigate(`/subscriptions/edit/${row.id}`),
    },
    {
      icon: <FiTrash2 />,
      color: "red",
      onClick: (row) => handleDelete(row.id),
    },
  ];

  return (
    <MainLayout>
      {/* ================= HEADER ================= */}
      <PageHeader
        title="Subscriptions"
        subtitle="Manage subscription plans and pricing"
        actionLabel="Add Subscription"
        actionIcon={<FiPlus />}
        onAction={() => navigate("/subscriptions/add")}
      />

      {/* ================= SEARCH ================= */}
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
        filters={filters}
        placeholder="Search subscription..."
      />

      {/* ================= LIST ================= */}
      {loading ? (
        <p className="text-center py-10 text-gray-500">
          Loading subscriptions...
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-center py-10 text-gray-500">
          No subscriptions found
        </p>
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
}
