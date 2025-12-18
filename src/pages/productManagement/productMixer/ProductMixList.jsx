import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// import { productMixService } from "../../../services/productMixService";

const ProductMixList = () => {
  const navigate = useNavigate();

  const [mixes, setMixes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD LIST ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await productMixService.getProductMixes();
        setMixes(data || []);
        */

        // TEMP MOCK DATA
        setMixes([
          {
            id: 1,
            name: "Personal Loan Combo",
            category: "Loan",
            type: "Personal Loan",
            amount: 550000,
            period: "24 Months",
            facilities: ["Top-up", "Insurance"],
            status: "Active",
          },
          {
            id: 2,
            name: "Home Loan Premium Pack",
            category: "Loan",
            type: "Home Loan",
            amount: 5200000,
            period: "20 Years",
            facilities: ["Insurance"],
            status: "Active",
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------- SEARCH ---------------- */
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
                  {mix.category} • {mix.type}
                </div>
              </div>

              {/* Category */}
              <div className="text-gray-600 hidden md:block">
                {mix.category}
              </div>

              {/* Type */}
              <div className="text-gray-600 hidden md:block">
                {mix.type}
              </div>

              {/* Amount */}
              <div className="font-medium text-gray-700">
                ₹{mix.amount.toLocaleString()}
              </div>

              {/* Period */}
              <div className="text-gray-600">
                {mix.period}
              </div>

              {/* Facilities */}
              <div className="text-gray-600 text-xs hidden md:block">
                {mix.facilities.join(", ")}
              </div>

              {/* Status */}
              <div>
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  {mix.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
                <button
                  onClick={() =>
                    navigate(`/product-mix/${mix.id}/edit`)
                  }
                  className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <FiEdit />
                </button>

                <button
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}

          {filteredMixes.length === 0 && (
            <p className="text-gray-500 text-sm">
              No product mixes found.
            </p>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default ProductMixList;
