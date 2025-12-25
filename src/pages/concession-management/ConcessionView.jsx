import React from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ConcessionView() {
  const navigate = useNavigate();

  const data = {
    type: "Interest Rate",
    category: "Senior Citizen",
    applicable_on: "Sanction",
    product: "Home Loan",
    status: "Active",
  };

  return (
    <MainLayout>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">Concession Details</h1>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl space-y-4">
        <Detail label="Concession Type" value={data.type} />
        <Detail label="Category" value={data.category} />
        <Detail label="Applicable On" value={data.applicable_on} />
        <Detail label="Product" value={data.product} />
        <Detail label="Status" value={data.status} />
      </div>
    </MainLayout>
  );
}

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);
