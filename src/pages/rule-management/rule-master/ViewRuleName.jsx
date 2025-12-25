import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewRuleName() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [rule, setRule] = useState(null);

  // 🔹 Mock fetch
  useEffect(() => {
    const fetchedRule = {
      rule_name: "Age Eligibility Rule",
      rule_code: "AGE_ELIG_01",
      description: "Applicant age should be between 21 and 60",
      status: "Active",
    };
    setRule(fetchedRule);
  }, [id]);

  if (!rule) return null;

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">View Rule</h1>
      </div>

      {/* DETAILS */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <Detail label="Rule Name" value={rule.rule_name} />
        <Detail label="Rule Code" value={rule.rule_code} />
        <Detail label="Status" value={rule.status} />

        <div className="md:col-span-2">
          <label className="text-sm font-medium">Description</label>
          <p className="mt-2 p-4 bg-gray-50 rounded-xl">
            {rule.description || "-"}
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

/* -------- Helpers -------- */

const Detail = ({ label, value }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <div className="mt-2 p-3 bg-gray-50 rounded-xl">
      {value || "-"}
    </div>
  </div>
);
