import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEye, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ScoreCardList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [list, setList] = useState([
    {
      uuid: "1",
      impact_type: "Credit Risk",
      risk_impact: "High",
      template: "Retail Loan",
      professionals: 720,
      employees: 650,
      groups: 540,
      corporates: 810,
      others: 300,
      status: "Active",
    },
    {
      uuid: "2",
      impact_type: "Operational Risk",
      risk_impact: "Medium",
      template: "Corporate Loan",
      professionals: 680,
      employees: 610,
      groups: 520,
      corporates: 770,
      others: 290,
      status: "Inactive",
    },
  ]);

  const filteredList = list.filter((i) =>
    i.impact_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold">Score Card Management</h1>
          <p className="text-sm text-gray-500">Configure score card templates</p>
        </div>
        <button
          onClick={() => navigate("/score-card/add")}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2 text-sm"
        >
          <FiPlus /> Add Score Card
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search impact type..."
          className="w-full outline-none text-sm bg-transparent"
        />
      </div>

      {/* LIST */}
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">

        {/* DESKTOP HEADER */}
        <div className="hidden md:grid grid-cols-10 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600 sticky top-0 z-10">
          <div>Impact</div><div>Risk</div><div>Template</div>
          <div>Prof.</div><div>Emp.</div><div>Grp</div><div>Corp</div><div>Oth</div>
          <div>Status</div><div className="text-right">Actions</div>
        </div>

        {filteredList.map((row) => (
          <React.Fragment key={row.uuid}>

            {/* DESKTOP ROW */}
            <div className="hidden md:grid grid-cols-10 bg-white rounded-2xl px-5 py-4 shadow-sm items-center text-sm">
              <div className="font-medium truncate">{row.impact_type}</div>
              <div>{row.risk_impact}</div>
              <div>{row.template}</div>
              <div>{row.professionals}</div>
              <div>{row.employees}</div>
              <div>{row.groups}</div>
              <div>{row.corporates}</div>
              <div>{row.others}</div>
              <StatusBadge status={row.status} />
              <ActionButtons uuid={row.uuid} navigate={navigate} />
            </div>

            {/* MOBILE CARD */}
            <div className="md:hidden bg-white rounded-2xl shadow-sm divide-y">
              <div className="flex justify-between px-4 py-3">
                <span className="font-semibold text-sm">{row.impact_type}</span>
                <ActionButtons uuid={row.uuid} navigate={navigate} />
              </div>

              <div className="px-4 py-3 space-y-2 text-sm">
                <Row label="Risk Impact" value={row.risk_impact} />
                <Row label="Template" value={row.template} />
                <Row label="Professionals" value={row.professionals} />
                <Row label="Employees" value={row.employees} />
                <Row label="Groups" value={row.groups} />
                <Row label="Corporates" value={row.corporates} />
                <Row label="Others" value={row.others} />

                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Status</span>
                  <StatusBadge status={row.status} />
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </MainLayout>
  );
}

/* ================= HELPERS ================= */

const Row = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center justify-center w-fit px-3 py-1 text-xs rounded-full whitespace-nowrap
      ${status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
  >
    {status}
  </span>
);

const ActionButtons = ({ uuid, navigate }) => (
  <div className="flex justify-end gap-2">
    <IconBtn variant="view" onClick={() => navigate(`/score-card/view/${uuid}`)}><FiEye /></IconBtn>
    <IconBtn variant="edit" onClick={() => navigate(`/score-card/edit/${uuid}`)}><FiEdit /></IconBtn>
    <IconBtn variant="delete"><FiTrash2 /></IconBtn>
  </div>
);

const IconBtn = ({ variant, children, ...props }) => {
  const map = {
    view: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    edit: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    delete: "bg-red-100 text-red-600 hover:bg-red-200",
  };
  return (
    <button {...props} className={`p-2 rounded-full transition ${map[variant]}`}>
      {children}
    </button>
  );
};
