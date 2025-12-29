import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { productMixService } from "../../../services/productManagementService";

const ProductMixList = () => {
  const navigate = useNavigate();

  const [mixes, setMixes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load product mixes
  const loadMixes = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await productMixService.getProductMixes();
      setMixes(data || []);
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

  // Delete product mix
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product mix?")) return;

    try {
      await productMixService.deleteProductMix(id);
      setMixes((prev) => prev.filter((mix) => mix.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete the product mix.");
    }
  };

  // Filtered list
  const filteredMixes = mixes.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Product Mix Management</h1>
          <p className="text-sm text-gray-500">
            Manage bundled product offerings
          </p>
        </div>

        <button
          onClick={() => navigate("/product-mix/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Product Mix
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search product mix..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading product mixes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredMixes.length === 0 ? (
        <p className="text-gray-500 text-sm">No product mixes found.</p>
      ) : (
        <div className="space-y-3">
          {/* COLUMN HEADER */}
          <div className="hidden md:grid grid-cols-8 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
            <div>Mix Name</div>
            <div>Category</div>
            <div>Type</div>
            <div>Amount</div>
            <div>Period</div>
            <div>Facilities</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>

          {/* ROWS */}
          {filteredMixes.map((mix) => (
            <div
              key={mix.id}
              className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-8 gap-y-2 items-center text-sm"
            >
              {/* Mix Name */}
              <div className="font-medium text-gray-900">
                {mix.name}
                <div className="text-xs text-gray-400 md:hidden">
                  {mix.product_category} • {mix.product_type}
                </div>
              </div>

              {/* Category */}
              <div className="text-gray-600 hidden md:block">{mix.product_category}</div>

              {/* Type */}
              <div className="text-gray-600 hidden md:block">{mix.product_type}</div>

              {/* Amount */}
              <div className="font-medium text-gray-700">-</div>

              {/* Period */}
              <div className="text-gray-600">-</div>

              {/* Facilities */}
              <div className="text-gray-600 text-xs hidden md:block">-</div>

              {/* Status */}
              <div>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    mix.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {mix.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
                <button
                  onClick={() => navigate(`/product-mix/${mix.id}/edit`)}
                  className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <FiEdit />
                </button>

                <button
                  onClick={() => handleDelete(mix.id)}
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default ProductMixList;
