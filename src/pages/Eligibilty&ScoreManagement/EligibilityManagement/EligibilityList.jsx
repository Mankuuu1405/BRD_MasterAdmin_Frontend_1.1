import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEye, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function EligibilityList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [list, setList] = useState([
    { uuid: "1", type: "Loan", category: "Home Loan", income_type: "Salaried", margin: 20, status: "Active" },
    { uuid: "2", type: "Credit Card", category: "Personal", income_type: "Self Employed", margin: 30, status: "Inactive" },
  ]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this eligibility?")) return;
    setList(prev => prev.filter(i => i.uuid !== id));
  };

  const filteredList = list.filter(i =>
    i.type.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold">Eligibility Management</h1>
          <p className="text-sm text-gray-500">Configure eligibility rules and margins</p>
        </div>
        <button onClick={() => navigate("/eligibility/add")}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-xl flex items-center justify-center gap-2 text-sm">
          <FiPlus /> Add Eligibility
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by type or category..."
          className="w-full outline-none text-sm bg-transparent"
        />
      </div>

      {/* LIST */}
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">

        {/* DESKTOP HEADER */}
        <div className="hidden md:grid grid-cols-7 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600 sticky top-0 z-10">
          <div>Type</div><div>Category</div><div>Income Type</div><div>Margin</div><div>Status</div><div className="col-span-2 text-right">Actions</div>
        </div>

        {filteredList.map(row => (
          <React.Fragment key={row.uuid}>

            {/* DESKTOP ROW */}
            <div className="hidden md:grid bg-white rounded-2xl px-5 py-4 shadow-sm grid-cols-7 items-center text-sm">
              <div className="font-medium truncate">{row.type}</div>
              <div>{row.category}</div>
              <div>{row.income_type}</div>
              <div>{row.margin}%</div>
              <StatusBadge status={row.status} />
              <ActionButtons
                onView={() => navigate(`/eligibility/view/${row.uuid}`)}
                onEdit={() => navigate(`/eligibility/edit/${row.uuid}`)}
                onDelete={() => handleDelete(row.uuid)}
              />
            </div>

            {/* MOBILE CARD */}
            <div className="md:hidden bg-white rounded-2xl shadow-sm divide-y">

              {/* TOP */}
              <div className="flex justify-between items-center px-4 py-3">
                <span className="font-semibold text-sm">{row.type}</span>
                <div className="flex gap-3 text-gray-600">
                  <FiEye onClick={() => navigate(`/eligibility/view/${row.uuid}`)} />
                  <FiEdit onClick={() => navigate(`/eligibility/edit/${row.uuid}`)} />
                  <FiTrash2 onClick={() => handleDelete(row.uuid)} />
                </div>
              </div>

              {/* BODY */}
              <div className="px-4 py-3 space-y-3 text-sm">
                <Row label="Category" value={row.category} />
                <Row label="Income Type" value={row.income_type} />
                <Row label="Margin" value={`${row.margin}%`} />
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Status</span>
                  <StatusBadge status={row.status} />
                </div>
              </div>

            </div>
          </React.Fragment>
        ))}

        {filteredList.length === 0 && (
          <p className="text-center text-gray-500 py-6">No eligibility rules found</p>
        )}
      </div>
    </MainLayout>
  );
}

/* HELPERS */

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <span className="text-gray-400 text-xs">{label}</span>
    <span className="font-medium text-right">{value || "-"}</span>
  </div>
);

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center justify-center w-fit whitespace-nowrap px-3 py-1 text-xs rounded-full ${
    status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
  }`}>
    {status}
  </span>
);

const ActionButtons = ({ onView, onEdit, onDelete }) => (
  <div className="flex justify-end gap-2 col-span-2">
    <IconBtn variant="view" onClick={onView}><FiEye /></IconBtn>
    <IconBtn variant="edit" onClick={onEdit}><FiEdit /></IconBtn>
    <IconBtn variant="delete" onClick={onDelete}><FiTrash2 /></IconBtn>
  </div>
);

const IconBtn = ({ variant, children, ...props }) => {
  const map = {
    view: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    edit: "bg-blue-100 hover:bg-blue-200 text-blue-600",
    delete: "bg-red-100 hover:bg-red-200 text-red-600",
  };
  return <button {...props} className={`p-2 rounded-full ${map[variant]}`}>{children}</button>;
};
