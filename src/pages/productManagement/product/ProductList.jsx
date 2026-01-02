import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { productManagementService } from "../../../services/productManagementService";
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Button, PageHeader } from "../../../components/Controls/SharedUIHelpers";

export default function LoanProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productManagementService.getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await productManagementService.deleteProduct(id);
    fetchProducts();
  };

  const filtered = products.filter((p) =>
    p.product_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold">Loan Products</h1>
          <p className="text-sm text-gray-500">
            View and manage loan products
          </p>
        </div>

        

        <Button label={"Add Product"} onClick={() => navigate("/product-management/add")} icon={<FiPlus/>} />
      </div> */}
      <PageHeader title={"Loan Products"} subtitle={"View and manage loan products"} actionIcon={<FiPlus/>}  actionLabel={"Add Product"} onAction={() => navigate("/product-management/add")}/>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search product..."
          className="w-full outline-none text-sm bg-transparent"
        />
      </div>

      {/* LIST */}
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {/* DESKTOP HEADER */}
        <div className="hidden md:grid grid-cols-7 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600 sticky top-0 z-10">
          <div>Product</div>
          <div>Category</div>
          <div>Type</div>
          <div>Amount</div>
          <div>Period</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {loading ? (
          <p className="text-center py-6 text-gray-500">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center py-6 text-gray-500">No products found</p>
        ) : (
          filtered.map((p) => (
            <React.Fragment key={p.id}>
              {/* DESKTOP ROW */}
              <div className="hidden md:grid bg-white rounded-2xl px-5 py-4 shadow-sm grid-cols-7 items-center text-sm">
                <div className="font-medium truncate">{p.product_name}</div>
                <div className="truncate">{p.product_category}</div>
                <div className="truncate">{p.product_type}</div>
                <div className="font-medium">
                  ₹{p.product_amount?.toLocaleString()}
                </div>
                <div>
                  {p.product_period_value} {p.product_period_unit}
                </div>

                <StatusBadge active={p.is_active} />

                <div className="flex justify-end gap-2">
                  <IconButton
                    color="gray"
                    onClick={() =>
                      navigate(`/product-management/${p.id}/view`)
                    }
                  >
                    <FiEye />
                  </IconButton>
                  <IconButton
                    color="blue"
                    onClick={() =>
                      navigate(`/product-management/${p.id}/edit`)
                    }
                  >
                    <FiEdit />
                  </IconButton>
                  <IconButton
                    color="red"
                    onClick={() => handleDelete(p.id)}
                  >
                    <FiTrash2 />
                  </IconButton>
                </div>
              </div>

              {/* MOBILE CARD */}
              <div className="md:hidden bg-white rounded-2xl shadow-sm divide-y">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="font-semibold text-sm">
                    {p.product_name}
                  </span>

                  <div className="flex items-center gap-3 text-gray-600">
                    <FiEye onClick={() => navigate(`/product-management/${p.id}/view`)} />
                    <FiEdit onClick={() => navigate(`/product-management/${p.id}/edit`)} />
                    <FiTrash2 onClick={() => handleDelete(p.id)} />
                  </div>
                </div>

                <div className="px-4 py-3 space-y-3 text-sm">
                  <Row label="Category" value={p.product_category} />
                  <Row label="Type" value={p.product_type} />
                  <Row
                    label="Amount"
                    value={`₹${p.product_amount?.toLocaleString()}`}
                  />
                  <Row
                    label="Period"
                    value={`${p.product_period_value} ${p.product_period_unit}`}
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">Status</span>
                    <StatusBadge active={p.is_active} />
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </MainLayout>
  );
}

/* ---------------- HELPERS ---------------- */

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <span className="text-gray-400 text-xs">{label}</span>
    <span className="font-medium text-gray-800 text-right">
      {value || "-"}
    </span>
  </div>
);

const StatusBadge = ({ active }) => (
  <span
    className={`inline-flex items-center justify-center
      w-fit whitespace-nowrap
      px-3 py-1 text-xs rounded-full
      ${active === true || active === "true"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-600"
      }`}
  >
    {active === true || active === "true" ? "Active" : "Inactive"}
  </span>
);


const IconButton = ({ children, color, onClick }) => {
  const map = {
    gray: "bg-gray-100 hover:bg-gray-200 text-gray-600",
    blue: "bg-blue-100 hover:bg-blue-200 text-blue-600",
    red: "bg-red-100 hover:bg-red-200 text-red-600",
  };

  return (
    <button onClick={onClick} className={`p-2 rounded-full ${map[color]}`}>
      {children}
    </button>
  );
};
