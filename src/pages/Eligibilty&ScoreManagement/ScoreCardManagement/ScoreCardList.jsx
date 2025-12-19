import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import {
  FiPlus,
  FiEye,
  FiEdit,
  FiTrash2,
  FiSearch,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ScoreCardList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  /* MOCK DATA */
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

  /* DELETE */
  const handleDelete = (id) => {
    if (!window.confirm("Delete this score card?")) return;
    setList(list.filter((i) => i.uuid !== id));
  };

  /* SEARCH */
  const filteredList = list.filter((i) =>
    i.impact_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Score Card Management</h1>
          <p className="text-sm text-gray-500">
            Configure score cards and risk impact templates
          </p>
        </div>

        <button
          onClick={() => navigate("/score-card/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Score Card
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by impact type..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {/* COLUMN HEADER */}
        <div className="hidden md:grid grid-cols-10 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Impact Type</div>
          <div>Risk Impact</div>
          <div>Template</div>
          <div>Professionals</div>
          <div>Employees</div>
          <div>Groups</div>
          <div>Corporates</div>
          <div>Others</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {/* ROWS */}
        {filteredList.map((row) => (
          <div
            key={row.uuid}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-10 gap-y-2 items-center text-sm"
          >
            {/* Impact Type */}
            <div className="font-medium text-gray-900">
              {row.impact_type}
            </div>

            {/* Risk Impact */}
            <div className="text-gray-600">{row.risk_impact}</div>

            {/* Template */}
            <div className="text-gray-600">{row.template}</div>

            {/* Scores */}
            <div className="text-gray-600">{row.professionals}</div>
            <div className="text-gray-600">{row.employees}</div>
            <div className="text-gray-600">{row.groups}</div>
            <div className="text-gray-600">{row.corporates}</div>
            <div className="text-gray-600">{row.others}</div>

            {/* Status */}
            <div>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  row.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {row.status}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <button
                onClick={() => navigate(`/score-card/view/${row.uuid}`)}
                className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                title="View"
              >
                <FiEye />
              </button>

              <button
                onClick={() => navigate(`/score-card/edit/${row.uuid}`)}
                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                title="Edit"
              >
                <FiEdit />
              </button>

              <button
                onClick={() => handleDelete(row.uuid)}
                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}

        {filteredList.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-6">
            No score cards found.
          </p>
        )}
      </div>
    </MainLayout>
  );
}
