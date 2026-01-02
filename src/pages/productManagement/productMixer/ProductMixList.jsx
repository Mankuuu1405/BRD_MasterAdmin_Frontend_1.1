import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

import { productMixService } from "../../../services/productManagementService";
import {
  PageHeader,
  SearchFilterBar,
  ListView,
  DeleteConfirmButton,
} from "../../../components/Controls/SharedUIHelpers";

const ProductMixList = () => {
  const navigate = useNavigate();

  const [mixes, setMixes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  /* ================= FETCH ================= */
  const loadMixes = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await productMixService.getProductMixes();
      setMixes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load product mixes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMixes();
  }, []);

  /* ================= DELETE ================= */
  const confirmDelete = async () => {
    try {
      await productMixService.deleteProductMix(deleteId);
      setDeleteId(null);
      loadMixes();
    } catch (err) {
      console.error(err);
      alert("Failed to delete the product mix.");
    }
  };

  /* ================= FILTER ================= */
  const filteredMixes = mixes.filter((m) =>
    m.name?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= LIST CONFIG ================= */
  const columns = [
    { key: "name", label: "Mix Name" },
    { key: "product_category", label: "Category" },
    { key: "product_type", label: "Type" },
    { key: "amount", label: "Amount" },
    { key: "period", label: "Period" },
    { key: "facilities", label: "Facilities" },
    { key: "is_active", label: "Status", type: "status" },
  ];

  const actions = [
    {
      icon: <FiEdit />,
      color: "blue",
      onClick: (row) => navigate(`/product-mix/${row.id}/edit`),
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
        title="Product Mix Management"
        subtitle="Manage bundled product offerings"
        actionLabel="Add Product Mix"
        actionIcon={<FiPlus />}
        onAction={() => navigate("/product-mix/add")}
      />

      {/* ================= SEARCH ================= */}
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search product mix..."
      />

      {/* ================= LIST ================= */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading product mixes...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : filteredMixes.length === 0 ? (
        <p className="text-gray-500 text-sm">No product mixes found.</p>
      ) : (
        <ListView
          data={filteredMixes}
          columns={columns}
          actions={actions}
          rowKey="id"
        />
      )}

      {/* ================= DELETE CONFIRM ================= */}
      {deleteId && (
        <DeleteConfirmButton
          title="Delete Product Mix"
          message="Are you sure you want to delete this product mix?"
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </MainLayout>
  );
};

export default ProductMixList;
