import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiSearch,
  FiEye,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PortfolioManagement = () => {
  const navigate = useNavigate();

  const [portfolios, setPortfolios] = useState([
    {
      id: 1,
      portfolio_name: "Retail Loan Portfolio",
      portfolio_type: "Retail",
      bank_mapping: ["HDFC Bank", "ICICI Bank"],
      is_active: true,
    },
    {
      id: 2,
      portfolio_name: "MSME Growth Portfolio",
      portfolio_type: "MSME",
      bank_mapping: ["SBI"],
      is_active: false,
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredPortfolios = portfolios.filter(
    (p) =>
      p.portfolio_name.toLowerCase().includes(search.toLowerCase()) ||
      p.portfolio_type.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!window.confirm("Delete this portfolio?")) return;
    setPortfolios(portfolios.filter((p) => p.id !== id));
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Portfolio Management</h1>
          <p className="text-sm text-gray-500">
            Group loans and map portfolios to bank accounts
          </p>
        </div>

        <button
          onClick={() => navigate("/portfolio-management/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Portfolio
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by portfolio name or type..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {/* TABLE HEADER */}
        <div className="hidden md:grid grid-cols-6 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Portfolio Name</div>
          <div>Type</div>
          <div>Banks Mapped</div>
          <div>Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* ROWS */}
        {filteredPortfolios.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-6 gap-y-2 items-center text-sm"
          >
            {/* Portfolio Name */}
            <div className="font-medium text-gray-900">
              {p.portfolio_name}
            </div>

            {/* Portfolio Type */}
            <div className="text-gray-600">{p.portfolio_type}</div>

            {/* Bank Mapping */}
            <div className="text-gray-600 truncate">
              {p.bank_mapping.join(", ")}
            </div>

            {/* Status */}
            <span
              className={`px-3 py-1 text-xs rounded-full justify-self-start ${
                p.is_active
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {p.is_active ? "Active" : "Inactive"}
            </span>

            {/* Actions */}
            <div className="flex justify-end gap-2 col-span-2 md:col-span-2">
              <IconButton
                color="gray"
                onClick={() =>
                  navigate(`/portfolio-management/view/${p.id}`)
                }
              >
                <FiEye />
              </IconButton>

              <IconButton
                color="blue"
                onClick={() =>
                  navigate(`/portfolio-management/edit/${p.id}`)
                }
              >
                <FiEdit3 />
              </IconButton>

              <IconButton
                color="red"
                onClick={() => handleDelete(p.id)}
              >
                <FiTrash2 />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default PortfolioManagement;

/* ------------ HELPERS ------------ */
const IconButton = ({ children, onClick, color }) => {
  const styles = {
    gray: "bg-gray-100 hover:bg-gray-200 text-gray-600",
    blue: "bg-blue-100 hover:bg-blue-200 text-blue-600",
    red: "bg-red-100 hover:bg-red-200 text-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full ${styles[color]}`}
    >
      {children}
    </button>
  );
};
