import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { productManagementService } from "../../../services/productManagementService";
import { FiPlus, FiEdit3, FiTrash2, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  PageHeader,
  SearchFilterBar,
  ListView,
  DeleteConfirmButton,
} from "../../../components/Controls/SharedUIHelpers";

export default function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  /* ---------------- COLUMNS ---------------- */
  const columns = [
    { key: "product_name", label: "Product" },
    { key: "product_category", label: "Category" },
    { key: "product_type", label: "Type" },
    {
      key: "product_amount",
      label: "Amount",
      render: (v) => `₹${v?.toLocaleString()}`,
    },
    {
      key: "product_period",
      label: "Period",
      render: (_, row) =>
        `${row.product_period_value} ${row.product_period_unit}`,
    },
    { key: "is_active", label: "Status", type: "status" },
  ];

  /* ---------------- ACTIONS ---------------- */
  const actions = [
    {
      icon: <FiEye />,
      onClick: (row) =>
        navigate(`/product-management/${row.id}/view`),
    },
    {
      icon: <FiEdit3 />,
      color: "blue",
      onClick: (row) =>
        navigate(`/product-management/${row.id}/edit`),
    },
    {
      icon: <FiTrash2 />,
      color: "red",
      onClick: (row) => setDeleteId(row.id),
    },
  ];

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productManagementService.getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async () => {
    await productManagementService.deleteProduct(deleteId);
    setDeleteId(null);
    loadProducts();
  };

  /* ---------------- FILTER ---------------- */
  const filteredData = products.filter((p) =>
    p.product_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <PageHeader
        title="Loan Products"
        subtitle="View and manage loan products"
        actionLabel="Add Product"
        actionIcon={<FiPlus />}
        onAction={() => navigate("/product-management/add")}
      />

      {/* SEARCH + FILTER */}
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
        placeholder="Search product..."
      />

      {/* LIST */}
      {loading ? (
        <p className="text-center py-6 text-gray-500">Loading...</p>
      ) : (
        <ListView
          data={filteredData}
          columns={columns}
          actions={actions}
          rowKey="id"
        />
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <DeleteConfirmButton
          title="Delete Product"
          message="Are you sure you want to delete this loan product?"
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </MainLayout>
  );
}
