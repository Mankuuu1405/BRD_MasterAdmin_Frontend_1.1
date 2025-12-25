import React from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function CurrencyView() {
  const navigate = useNavigate();

  const data = {
    currency_code: "USD",
    currency_symbol: "$",
    conversion_value_to_inr: 83.25,
    status: "Active",
  };

  return (
    <MainLayout>
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">Currency Details</h1>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl space-y-4">
        <Detail label="Currency Code" value={data.currency_code} />
        <Detail label="Symbol" value={data.currency_symbol} />
        <Detail label="Conversion to INR" value={data.conversion_value_to_inr} />
        <Detail label="Status" value={data.status} />
      </div>
    </MainLayout>
  );
}

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium">{value}</p>
  </div>
);
