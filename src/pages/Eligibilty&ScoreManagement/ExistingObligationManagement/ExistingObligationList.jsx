import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEye, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ExistingObligationList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [list, setList] = useState([
    {
      uuid: "1",
      status_of_loan: "Active",
      loan_performance: "Good",
      card_type: "Credit",
      total_loans: 2,
      status: "Active",
    },
    {
      uuid: "2",
      status_of_loan: "Closed",
      loan_performance: "Average",
      card_type: "Debit",
      total_loans: 1,
      status: "Inactive",
    },
  ]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this obligation rule?")) return;
    setList(list.filter((i) => i.uuid !== id));
  };

  const filteredList = list.filter((i) =>
    i.status_of_loan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold">Existing Obligation Management</h1>
          <p className="text-sm text-gray-500">Manage existing loan obligations</p>
        </div>

        <button
          onClick={() => navigate("/score-card/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm hover:bg-blue-700"
        >
          <FiPlus /> Add Obligation Rule
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by loan status..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">

        {/* DESKTOP HEADER */}
        <div className="hidden md:grid grid-cols-6 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600 sticky top-0">
          <div>Loan Status</div>
          <div>Performance</div>
          <div>Card Type</div>
          <div>Total Loans</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filteredList.map((row) => (
          <React.Fragment key={row.uuid}>

            {/* DESKTOP ROW */}
            <div className="hidden md:grid bg-white rounded-2xl px-5 py-4 shadow-sm grid-cols-6 items-center text-sm">
              <div className="font-medium">{row.status_of_loan}</div>
              <div>{row.loan_performance}</div>
              <div>{row.card_type}</div>
              <div>{row.total_loans}</div>
              <StatusBadge status={row.status} />
              <ActionButtons
                onView={() => navigate(`/obligation/view/${row.uuid}`)}
                onEdit={() => navigate(`/obligation/edit/${row.uuid}`)}
                onDelete={() => handleDelete(row.uuid)}
              />
            </div>

            {/* MOBILE CARD */}
            <div className="md:hidden bg-white rounded-2xl shadow-sm divide-y">
              <div className="flex justify-between items-center px-4 py-3">
                <span className="font-semibold text-sm">{row.status_of_loan}</span>
                <div className="flex gap-3 text-gray-600">
                  <FiEye onClick={() => navigate(`/obligation/view/${row.uuid}`)} />
                  <FiEdit onClick={() => navigate(`/obligation/edit/${row.uuid}`)} />
                  <FiTrash2 onClick={() => handleDelete(row.uuid)} />
                </div>
              </div>

              <div className="px-4 py-3 space-y-3 text-sm">
                <Row label="Performance" value={row.loan_performance} />
                <Row label="Card Type" value={row.card_type} />
                <Row label="Total Loans" value={row.total_loans} />

                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Status</span>
                  <StatusBadge status={row.status} />
                </div>
              </div>
            </div>

          </React.Fragment>
        ))}

        {filteredList.length === 0 && (
          <p className="text-center py-6 text-gray-500">No rules found</p>
        )}
      </div>
    </MainLayout>
  );
}

/* ---------------- HELPERS ---------------- */

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <span className="text-gray-400 text-xs">{label}</span>
    <span className="font-medium">{value || "-"}</span>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center justify-center whitespace-nowrap w-fit px-3 py-1 text-xs rounded-full ${
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
    <IconBtn variant="view" onClick={onView}><FiEye /></IconBtn>
    <IconBtn variant="edit" onClick={onEdit}><FiEdit /></IconBtn>
    <IconBtn variant="delete" onClick={onDelete}><FiTrash2 /></IconBtn>
  </div>
);

const IconBtn = ({ variant, children, ...props }) => {
  const styles = {
    view: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    edit: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    delete: "bg-red-100 text-red-600 hover:bg-red-200",
  };

  return (
    <button {...props} className={`p-2 rounded-full transition ${styles[variant]}`}>
      {children}
    </button>
  );
};
