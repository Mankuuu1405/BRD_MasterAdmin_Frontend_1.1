import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiSearch,
  FiEye,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import currencyManagementService from "../../services/currencyManagementService";
import {ListView, DeleteConfirmButton} from "../../components/Controls/SharedUIHelpers"

export default function CurrencyList() {
  const navigate = useNavigate();
  const [currencies, setCurrencies] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const res = await currencyManagementService.getAll();
      setCurrencies(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error("Failed to fetch currencies", error);
    }
  };

const columns = [
  { key: "currency_code", label: "Code" },
  { key: "currency_symbol", label: "Symbol" },
  { key: "conversion_value_to_inr", label: "Conversion (INR)" },
  { key: "status", label: "Status", type: "status" },
];

const actions = [
  {
    icon: <FiEye />,
    onClick: (row) => navigate(`/currency-management/view/${row.uuid}`),
  },
  {
    icon: <FiEdit3 />,
    color: "blue",
    onClick: (row) => navigate(`/currency-management/edit/${row.uuid}`),
  },
  {
    icon: <FiTrash2 />,
    color: "red",
    onClick: (row) => setDeleteId(row.uuid),
  },
];

  const filtered = currencies.filter(
    (c) =>
      c.currency_code?.toLowerCase().includes(search.toLowerCase()) ||
      c.currency_symbol?.includes(search)
  );

  const handleDelete = async () => {
    if (!deleteId) return;
    await currencyManagementService.delete(deleteId);
    setDeleteId(null);
    fetchCurrencies();
  };

  return (
    <MainLayout>
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold">Currency Management</h1>
          <p className="text-sm text-gray-500">
            Manage supported currencies and conversion values
          </p>
        </div>

        <button
          onClick={() => navigate("/currency-management/add")}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 text-sm"
        >
          <FiPlus /> Add Currency
        </button>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by currency code or symbol..."
          className="w-full outline-none text-sm bg-transparent"
        />
      </div>

      {/* ================= LIST ================= */}


      <ListView
        data={filtered}
        columns={columns}
        actions={actions}
        rowKey="uuid"
      />


      {deleteId && (
        <DeleteConfirmButton onConfirm={handleDelete} onCancel={()=>{setDeleteId(false)}}/>
      )}
    </MainLayout>
  );
}
