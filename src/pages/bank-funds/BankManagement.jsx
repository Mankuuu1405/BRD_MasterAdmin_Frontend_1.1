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

const BankManagement = () => {
  const navigate = useNavigate();

  const [banks, setBanks] = useState([
    {
      id: 1,
      bank_name: "HDFC Bank",
      ifsc: "HDFC0001234",
      branch: "Mumbai Main",
      account_type: "Savings",
      status: "Active",
    },
    {
      id: 2,
      bank_name: "ICICI Bank",
      ifsc: "ICIC0005678",
      branch: "Delhi",
      account_type: "Current",
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredBanks = banks.filter(
    (b) =>
      b.bank_name.toLowerCase().includes(search.toLowerCase()) ||
      b.ifsc.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!window.confirm("Delete this bank?")) return;
    setBanks(banks.filter((b) => b.id !== id));
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Bank Management</h1>
          <p className="text-sm text-gray-500">
            Manage operational banks and account types
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by bank name or IFSC..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {/* TABLE HEADER */}
        <div className="hidden md:grid grid-cols-6 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Bank Name</div>
          <div>IFSC</div>
          <div>Branch</div>
          <div>Account Type</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {/* TABLE ROWS */}
        {filteredBanks.map((bank) => (
          <div
            key={bank.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-6 gap-y-2 items-center text-sm"
          >
            {/* Bank Name */}
            <div className="font-medium text-gray-900">
              {bank.bank_name}
            </div>

            {/* IFSC */}
            <div className="text-gray-600">{bank.ifsc}</div>

            {/* Branch */}
            <div className="text-gray-600">{bank.branch}</div>

            {/* Account Type */}
            <div className="text-gray-600">{bank.account_type}</div>

            {/* Status */}
            <span
              className={`px-3 py-1 text-xs rounded-full justify-self-start ${
                bank.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {bank.status}
            </span>

            {/* Actions */}
            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              {/* <IconButton
                color="gray"
                onClick={() => navigate(`/bank-management/view/${bank.id}`)}
              >
                <FiEye />
              </IconButton> */}
              <IconButton
                color="blue"
                onClick={() => navigate(`/bank-management/edit/${bank.id}`)}
              >
                <FiEdit3 />
              </IconButton>
              <IconButton
                color="red"
                onClick={() => handleDelete(bank.id)}
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

export default BankManagement;

/* ---------------- HELPERS ---------------- */

const IconButton = ({ children, onClick, color }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200`}
  >
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
