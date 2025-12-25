import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiEdit3 } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewImpactValue() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [impact, setImpact] = useState(null);

  /* MOCK LOAD */
  useEffect(() => {
    const mockData = {
      rule_name: "Credit Score Rule",
      impact_type: "Negative",
      impact_value: -30,
      risk_impact: "High",
      status: "Active",
      created_at: "12 Dec 2025",
    };
    setImpact(mockData);
  }, [id]);

  if (!impact) return null;

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gray-50"
          >
            <FiArrowLeft />
          </button>
          <h1 className="text-2xl font-bold">View Impact Value</h1>
        </div>

        <button
          onClick={() =>
            navigate(`/rule-management/impact-values/edit/${id}`)
          }
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl flex items-center gap-2"
        >
          <FiEdit3 /> Edit
        </button>
      </div>

      {/* DETAILS */}
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl space-y-6">
        <Info label="Rule Name" value={impact.rule_name} />
        <Info label="Impact Type" value={impact.impact_type} />
        <Info label="Impact Value" value={impact.impact_value} />
        <Info label="Risk Impact" value={impact.risk_impact} />
        <Info label="Created On" value={impact.created_at} />

        <div>
          <label className="text-sm font-medium">Status</label>
          <div className="mt-2">
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                impact.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {impact.status}
            </span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

const Info = ({ label, value }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">
      {label}
    </label>
    <p className="mt-1 text-sm text-gray-900">{value}</p>
  </div>
);
