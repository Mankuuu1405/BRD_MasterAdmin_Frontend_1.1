import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit } from "react-icons/fi";
import RiskFormModal from "./RiskFormModal";

const RiskList = () => {
  const [risks, setRisks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRisk, setEditingRisk] = useState(null);

  useEffect(() => {
    // MOCK DATA
    setRisks([
      {
        id: 1,
        category: "Credit Risk",
        parameter: "Unstable income source",
        severity: "High",
        trigger: "Income mismatch",
        is_active: true,
      },
      {
        id: 2,
        category: "Operational Risk",
        parameter: "Document mismatch",
        severity: "Medium",
        trigger: "KYC inconsistency",
        is_active: false,
      },
    ]);
  }, []);

  const openAdd = () => {
    setEditingRisk(null);
    setShowModal(true);
  };

  const openEdit = (risk) => {
    setEditingRisk(risk);
    setShowModal(true);
  };

  const toggleStatus = (id) => {
    setRisks((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, is_active: !r.is_active } : r
      )
    );
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Risk Master</h1>
          <p className="text-sm text-gray-500">
            Define and manage lending risks
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          <FiPlus /> Add Risk
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Risk Parameter</th>
              <th className="text-left px-4 py-3">Severity</th>
              <th className="text-left px-4 py-3">Trigger Event</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {risks.map((risk) => (
              <tr key={risk.id} className="border-t">
                <td className="px-4 py-3">{risk.category}</td>
                <td className="px-4 py-3">{risk.parameter}</td>
                <td className="px-4 py-3">
                  <SeverityBadge value={risk.severity} />
                </td>
                <td className="px-4 py-3">{risk.trigger}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleStatus(risk.id)}
                    className={`px-3 py-1 rounded-full text-xs ${
                      risk.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {risk.is_active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => openEdit(risk)}
                    className="text-blue-600"
                  >
                    <FiEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <RiskFormModal
          risk={editingRisk}
          onClose={() => setShowModal(false)}
        />
      )}
    </MainLayout>
  );
};

export default RiskList;

/* ---------------- HELPERS ---------------- */

const SeverityBadge = ({ value }) => {
  const colors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        colors[value]
      }`}
    >
      {value}
    </span>
  );
};
