import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { productManagementService } from "../../../services/productManagementService";
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function LoanProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ---------------- LOAD PRODUCTS ---------------- */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productManagementService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch loan products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ---------------- DELETE PRODUCT ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await productManagementService.deleteProduct(id);
      fetchProducts(); // refresh list
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* ---------------- SEARCH FILTER ---------------- */
  const filteredProducts = products.filter((p) =>
    p.product_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout title="Loan Products">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Loan Product Management</h1>
          <p className="text-sm text-gray-500">
            View and manage all loan products
          </p>
        </div>

        <button
          onClick={() => navigate("/product-management/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add New Product
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search product..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {/* COLUMN HEADER */}
        <div className="hidden md:grid grid-cols-7 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Product Name</div>
          <div>Category</div>
          <div>Type</div>
          <div>Amount</div>
          <div>Period</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {/* ROWS */}
        {loading ? (
          <p className="text-center py-6 text-gray-500">Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center py-6 text-gray-500">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-7 gap-y-2 items-center text-sm"
            >
              {/* Product Name */}
              <div className="font-medium text-gray-900">
                {product.product_name}
                <div className="text-xs text-gray-400 md:hidden">
                  {product.product_category} • {product.product_type}
                </div>
              </div>

              {/* Category */}
              <div className="text-gray-600 hidden md:block">
                {product.product_category}
              </div>

              {/* Type */}
              <div className="text-gray-600 hidden md:block">
                {product.product_type}
              </div>

              {/* Amount */}
              <div className="font-medium text-gray-700">
                ₹{product.product_amount?.toLocaleString()}
              </div>

              {/* Period */}
              <div className="text-gray-600">{product.product_period_value} {product.product_period_unit}</div>

              {/* Status */}
              <div>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    product.is_active === true || product.is_active === "true"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.is_active === true || product.is_active === "true"
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 col-span-2 md:col-span-1">

                <button
                  onClick={() =>
                    navigate(`/product-management/${product.id}/edit`)
                  }
                  className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                >
                  <FiEdit />
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}
