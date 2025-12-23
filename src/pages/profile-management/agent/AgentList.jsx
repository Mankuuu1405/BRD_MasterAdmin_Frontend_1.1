import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiEye, FiPlus, FiEdit3, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AgentList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const agents = [
    {
      id: 1,
      type: "DSA",
      category: "Freelance",
      level: "Tier 1",
      service: "Lead Generation",
    },
    {
      id: 2,
      type: "Collection",
      category: "Company",
      level: "Tier 2",
      service: "Collection",
    },
  ];

  const filteredAgents = agents.filter(
    (a) =>
      a.type.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Agent Profile Management</h1>
          <p className="text-sm text-gray-500">
            Manage agent types, levels and responsibilities
          </p>
        </div>

        <button
          onClick={() => navigate("/profile-management/agent/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm hover:bg-blue-700"
        >
          <FiPlus /> Add Agent
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-3 mb-4 flex items-center gap-2 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by type or service..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Table */}
      <div className="space-y-2">
        <div className="hidden md:grid grid-cols-5 px-4 py-2 text-xs font-semibold text-gray-500">
          <div>Agent Type</div>
          <div>Category</div>
          <div>Level</div>
          <div>Service</div>
          <div className="text-right">Action</div>
        </div>

        {filteredAgents.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-xl px-4 py-3 shadow-sm grid grid-cols-1 md:grid-cols-5 items-center gap-2 text-sm"
          >
            <div className="font-medium">{a.type}</div>
            <div className="text-gray-600">{a.category}</div>
            <div className="text-gray-600">{a.level}</div>
            <div className="text-gray-600">{a.service}</div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  navigate(`/profile-management/agent/view/${a.id}`)
                }
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <FiEye />
              </button>

              <button
                onClick={() =>
                  navigate(`/profile-management/agent/edit/${a.id}`)
                }
                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
              >
                <FiEdit3 />
              </button>
            </div>
          </div>
        ))}

        {filteredAgents.length === 0 && (
          <div className="text-center text-sm text-gray-500 py-6">
            No agents found
          </div>
        )}
      </div>
    </MainLayout>
  );
}
