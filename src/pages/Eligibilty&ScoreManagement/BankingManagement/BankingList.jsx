import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEye, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function BankingList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [list, setList] = useState([
    { uuid: "1", bank_account_type: "Savings", average_banking_dates: 6, average_banking_criteria: "Last 6 Months", status: "Active" },
    { uuid: "2", bank_account_type: "Current", average_banking_dates: 12, average_banking_criteria: "Last 12 Months", status: "Inactive" },
  ]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this banking rule?")) return;
    setList((prev) => prev.filter((i) => i.uuid !== id));
  };

  const filteredList = list.filter((i) =>
    i.bank_account_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold">Banking Management</h1>
          <p className="text-sm text-gray-500">Manage banking eligibility rules</p>
        </div>

        <button onClick={() => navigate("/banking/add")}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-xl flex justify-center gap-2 text-sm">
          <FiPlus /> Add Banking Rule
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search account type..."
          className="w-full outline-none text-sm bg-transparent"
        />
      </div>

      {/* LIST */}
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">

        {/* DESKTOP HEADER */}
        <div className="hidden md:grid grid-cols-5 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600 sticky top-0 z-10">
          <div>Account Type</div>
          <div>Avg Dates</div>
          <div>Criteria</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filteredList.map((row) => (
          <React.Fragment key={row.uuid}>

            {/* DESKTOP ROW */}
            <div className="hidden md:grid bg-white rounded-2xl px-5 py-4 shadow-sm grid-cols-5 items-center text-sm">
              <div className="font-medium">{row.bank_account_type}</div>
              <div>{row.average_banking_dates} Months</div>
              <div>{row.average_banking_criteria}</div>
              <StatusBadge status={row.status} />
              <div className="flex justify-end gap-2">
                <IconBtn variant="view" onClick={() => navigate(`/banking/view/${row.uuid}`)}><FiEye /></IconBtn>
                <IconBtn variant="edit" onClick={() => navigate(`/banking/edit/${row.uuid}`)}><FiEdit /></IconBtn>
                <IconBtn variant="delete" onClick={() => handleDelete(row.uuid)}><FiTrash2 /></IconBtn>
              </div>
            </div>

            {/* MOBILE CARD */}
            <div className="md:hidden bg-white rounded-2xl shadow-sm divide-y">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="font-semibold text-sm">{row.bank_account_type}</span>
                <div className="flex gap-3 text-gray-600">
                  <FiEye onClick={() => navigate(`/banking/view/${row.uuid}`)} />
                  <FiEdit onClick={() => navigate(`/banking/edit/${row.uuid}`)} />
                  <FiTrash2 onClick={() => handleDelete(row.uuid)} />
                </div>
              </div>

              <div className="px-4 py-3 space-y-3 text-sm">
                <Row label="Avg Dates" value={`${row.average_banking_dates} Months`} />
                <Row label="Criteria" value={row.average_banking_criteria} />
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Status</span>
                  <StatusBadge status={row.status} />
                </div>
              </div>
            </div>

          </React.Fragment>
        ))}

        {filteredList.length === 0 && (
          <p className="text-gray-500 text-center py-6">No banking rules found</p>
        )}
      </div>
    </MainLayout>
  );
}

/* ---------- HELPERS ---------- */

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <span className="text-gray-400 text-xs">{label}</span>
    <span className="font-medium text-right">{value || "-"}</span>
  </div>
);

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center justify-center w-fit px-3 py-1 text-xs rounded-full whitespace-nowrap
    ${status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
    {status}
  </span>
);

const IconBtn = ({ variant, children, ...props }) => {
  const map = {
    view: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    edit: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    delete: "bg-red-100 text-red-600 hover:bg-red-200",
  };
  return (
    <button {...props} className={`p-2 rounded-full ${map[variant]}`}>
      {children}
    </button>
  );
};
