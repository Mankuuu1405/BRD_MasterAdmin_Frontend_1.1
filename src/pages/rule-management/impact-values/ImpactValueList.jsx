import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiSearch,
  FiEye,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ImpactValueList() {
  const navigate = useNavigate();

  const [impacts, setImpacts] = useState([
    {
      id: 1,
      rule_name: "Age Eligibility Rule",
      impact_type: "Positive",
      impact_value: 10,
      risk_impact: "Low",
      status: "Active",
    },
    {
      id: 2,
      rule_name: "Low Credit Score",
      impact_type: "Negative",
      impact_value: -30,
      risk_impact: "High",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");

  const filtered = impacts.filter((i) =>
    i.rule_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!window.confirm("Delete this impact value?")) return;
    setImpacts(impacts.filter((i) => i.id !== id));
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Impact Values</h1>
          <p className="text-sm text-gray-500">
            Define numeric impact of rules
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/rule-management/impact-values/add")
          }
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl flex items-center gap-2"
        >
          <FiPlus /> Add Impact
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by rule name..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* TABLE */}
      <div className="space-y-3">
        <div className="hidden md:grid grid-cols-6 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Rule</div>
          <div>Impact Type</div>
          <div>Value</div>
          <div>Risk</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-6 gap-y-2 items-center text-sm"
          >
            <div className="font-medium">{item.rule_name}</div>

            <div
              className={`font-medium ${
                item.impact_type === "Positive"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {item.impact_type}
            </div>

            <div className="text-gray-700">
              {item.impact_value}
            </div>

            <div className="text-gray-600">
              {item.risk_impact}
            </div>

            <span
              className={`px-3 py-1 text-xs rounded-full ${
                item.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {item.status}
            </span>

            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <IconButton
                color="gray"
                onClick={() =>
                  navigate(
                    `/rule-management/impact-values/view/${item.id}`
                  )
                }
              >
                <FiEye />
              </IconButton>
              <IconButton
                color="blue"
                onClick={() =>
                  navigate(
                    `/rule-management/impact-values/edit/${item.id}`
                  )
                }
              >
                <FiEdit3 />
              </IconButton>
              <IconButton
                color="red"
                onClick={() => handleDelete(item.id)}
              >
                <FiTrash2 />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

const IconButton = ({ children, onClick, color }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200`}
  >
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
