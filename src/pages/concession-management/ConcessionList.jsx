import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiSearch,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import concessionManagementService from "../../services/concessionManagementService";

export default function ConcessionList() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("TYPE");
  const [search, setSearch] = useState("");

  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  /* =======================
     FETCH ON TAB CHANGE
     ======================= */
  useEffect(() => {
    if (activeTab === "TYPE") {
      fetchTypes();
    } else {
      fetchCategories();
    }
  }, [activeTab]);

  const fetchTypes = async () => {
    try {
      const res = await concessionManagementService.getAllTypes();
      setTypes(res);
    } catch (error) {
      console.error("Failed to load concession types", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await concessionManagementService.getAllCategories();
      setCategories(res);
    } catch (error) {
      console.error("Failed to load concession categories", error);
    }
  };

  /* =======================
     FILTERING
     ======================= */
  const filteredTypes = types.filter((t) =>
    t.concession_type_name?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCategories = categories.filter((c) =>
    c.category_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (uuid) => {
  if (!window.confirm("Deactivate this record?")) return;

  try {
    if (activeTab === "TYPE") {
      // Call API to delete type
      await concessionManagementService.deleteType(uuid);
      setTypes((prev) => prev.filter((t) => t.uuid !== uuid));
    } else {
      // Call API to delete category
      await concessionManagementService.deleteCategory(uuid);
      setCategories((prev) => prev.filter((c) => c.uuid !== uuid));
    }
  } catch (err) {
    console.error("Failed to delete:", err.response?.data || err);
    alert("Failed to delete. Please try again.");
  }
};


  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Concession Management</h1>
          <p className="text-sm text-gray-500">
            Manage concession types and categories
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/concession-management/type/add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2"
          >
            <FiPlus /> Concession Type
          </button>
          <button
            onClick={() => navigate("/concession-management/category/add")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl flex items-center gap-2"
          >
            <FiPlus /> Concession Category
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-4 mb-4">
        <TabButton
          active={activeTab === "TYPE"}
          onClick={() => setActiveTab("TYPE")}
        >
          Concession Types
        </TabButton>
        <TabButton
          active={activeTab === "CATEGORY"}
          onClick={() => setActiveTab("CATEGORY")}
        >
          Concession Categories
        </TabButton>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            activeTab === "TYPE"
              ? "Search by concession type..."
              : "Search by category..."
          }
          className="w-full outline-none text-sm"
        />
      </div>

      {/* =======================
          TABLE : TYPES
         ======================= */}
      {activeTab === "TYPE" && (
        <div className="space-y-3">
          <TableHeader headers={["Type Name", "Applicable On", "Status", "Actions"]} />

          {filteredTypes.map((t) => (
            <TableRow key={t.uuid}>
              <div className="font-medium">{t.concession_type_name}</div>
              <div>{t.applicable_on}</div>
              <StatusBadge status={t.status} />
              <ActionButtons
                onView={() =>
                  navigate(`/concession-management/type/view/${t.uuid}`)
                }
                onEdit={() =>
                  navigate(`/concession-management/type/edit/${t.uuid}`)
                }
                onDelete={() => handleDelete(t.uuid)}
              />
            </TableRow>
          ))}
        </div>
      )}

      {/* =======================
          TABLE : CATEGORIES
         ======================= */}
      {activeTab === "CATEGORY" && (
        <div className="space-y-3">
          <TableHeader
            headers={[
              "Category Name",
              "Concession Type",
              "Product",
              "Validity",
              "Status",
              "Actions",
            ]}
          />

          {filteredCategories.map((c) => (
            <TableRow key={c.uuid} cols={6}>
              <div className="font-medium">{c.category_name}</div>
              <div>{c.concession_type_name}</div>
              <div>{c.product_type}</div>
              <div className="text-xs">
                {c.valid_from} → {c.valid_to}
              </div>
              <StatusBadge status={c.status} />
              <ActionButtons
                onView={() =>
                  navigate(`/concession-management/category/view/${c.uuid}`)
                }
                onEdit={() =>
                  navigate(`/concession-management/category/edit/${c.uuid}`)
                }
                onDelete={() => handleDelete(c.uuid)}
              />
            </TableRow>
          ))}
        </div>
      )}
    </MainLayout>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm font-medium ${
      active
        ? "bg-blue-600 text-white"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`}
  >
    {children}
  </button>
);

const TableHeader = ({ headers }) => (
  <div
    className="hidden md:grid bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600"
    style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0,1fr))` }}
  >
    {headers.map((h) => (
      <div key={h}>{h}</div>
    ))}
  </div>
);

const TableRow = ({ children, cols = 4 }) => (
  <div
    className="bg-white rounded-2xl px-5 py-4 shadow-sm grid gap-y-2 items-center text-sm"
    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
  >
    {children}
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 text-xs rounded-full ${
      status === "Active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-600"
    }`}
  >
    {status}
  </span>
);

const ActionButtons = ({ onView, onEdit, onDelete }) => (
  <div className="flex justify-end gap-2">
    <IconButton color="gray" onClick={onView}>
      <FiEye />
    </IconButton>
    <IconButton color="blue" onClick={onEdit}>
      <FiEdit3 />
    </IconButton>
    <IconButton color="red" onClick={onDelete}>
      <FiTrash2 />
    </IconButton>
  </div>
);

const IconButton = ({ children, onClick, color }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200`}
  >
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
