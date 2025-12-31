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
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">

        {/* -------- DESKTOP HEADER -------- */}
        <div className="hidden md:grid grid-cols-5 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600 sticky top-0 z-10">
          <div>Code</div>
          <div>Symbol</div>
          <div>Conversion (INR)</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filtered.map((c) => (
          <React.Fragment key={c.uuid}>
            {/* -------- DESKTOP ROW -------- */}
            <div className="hidden md:grid bg-white rounded-2xl px-5 py-4 shadow-sm grid-cols-5 items-center text-sm">
              <div className="font-medium">{c.currency_code}</div>
              <div>{c.currency_symbol}</div>
              <div>{c.conversion_value_to_inr}</div>

              <StatusBadge status={c.status} />

              <div className="flex justify-end gap-2">
                <IconButton
                  color="gray"
                  onClick={() =>
                    navigate(`/currency-management/view/${c.uuid}`)
                  }
                >
                  <FiEye />
                </IconButton>
                <IconButton
                  color="blue"
                  onClick={() =>
                    navigate(`/currency-management/edit/${c.uuid}`)
                  }
                >
                  <FiEdit3 />
                </IconButton>
                <IconButton
                  color="red"
                  onClick={() => setDeleteId(c.uuid)}
                >
                  <FiTrash2 />
                </IconButton>
              </div>
            </div>

            {/* -------- MOBILE CARD -------- */}
            <div className="md:hidden bg-white rounded-2xl shadow-sm divide-y">
              {/* TOP */}
              <div className="flex items-center justify-between px-4 py-3">
                <span className="font-semibold text-sm">
                  {c.currency_code} ({c.currency_symbol})
                </span>

                <div className="flex items-center gap-3 text-gray-600">
                  <FiEye
                    onClick={() =>
                      navigate(`/currency-management/view/${c.uuid}`)
                    }
                  />
                  <FiEdit3
                    onClick={() =>
                      navigate(`/currency-management/edit/${c.uuid}`)
                    }
                  />
                  <FiTrash2 onClick={() => setDeleteId(c.uuid)} />
                </div>
              </div>

              {/* BODY */}
              <div className="px-4 py-3 space-y-3 text-sm">
                <Row
                  label="Conversion (INR)"
                  value={c.conversion_value_to_inr}
                />

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Status</span>
                  <StatusBadge status={c.status} />
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* DELETE CONFIRM */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm space-y-4">
            <h3 className="font-semibold text-lg">Delete Currency</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this currency?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm rounded-lg bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

/* ================= HELPERS ================= */

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <span className="text-gray-400 text-xs">{label}</span>
    <span className="font-medium text-gray-800 text-right">
      {value || "-"}
    </span>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center justify-center
      px-3 py-1 text-xs font-medium
      rounded-full w-fit whitespace-nowrap leading-none
      ${
        status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-600"
      }`}
  >
    {status}
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
