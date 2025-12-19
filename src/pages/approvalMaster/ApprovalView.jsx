import React from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const ApprovalView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  /* MOCK DATA – replace with API */
  const approval = {
    product_name: "Home Loan",
    product_type: "Loan",
    level: "1",
    type: "Individual",
    approval_name: {
      sanction: "Branch Sanction",
      rate_inc: 2,
      rate_dec: 1,
      fees_inc: 5000,
      fees_dec: 2000,
      tenure_inc: 12,
      tenure_dec: 6,
      range: "0 – 25L",
      moratorium: {
        interest: 1.5,
        period: 6,
      },
    },
    status: "Active",
    created_user: "Admin",
    modified_user: "Admin",
    created_at: "2024-10-01",
    modified_at: "2024-10-10",
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
        >
          <FiArrowLeft />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            View Approval
          </h1>
          <p className="text-sm text-gray-500">
            Approval ID: {id}
          </p>
        </div>
      </div>

      <div className="space-y-6 max-w-5xl">
        {/* BASIC DETAILS */}
        <Card title="Basic Details">
          <Row label="Product Type" value={approval.product_type} />
          <Row label="Product Name" value={approval.product_name} />
          <Row label="Approval Level" value={approval.level} />
          <Row label="Approval Type" value={approval.type} />
          <Row label="Sanction Name" value={approval.approval_name.sanction} />
          <Row label="Range" value={approval.approval_name.range} />
          <Row label="Status">
            <StatusBadge status={approval.status} />
          </Row>
        </Card>

        {/* RATE & FEES */}
        <Card title="Rate & Fees">
          <Row label="Rate Increase (%)" value={approval.approval_name.rate_inc} />
          <Row label="Rate Decrease (%)" value={approval.approval_name.rate_dec} />
          <Row label="Fees Increase" value={approval.approval_name.fees_inc} />
          <Row label="Fees Decrease" value={approval.approval_name.fees_dec} />
        </Card>

        {/* TENURE & MORATORIUM */}
        <Card title="Tenure & Moratorium">
          <Row label="Tenure Increase (Months)" value={approval.approval_name.tenure_inc} />
          <Row label="Tenure Decrease (Months)" value={approval.approval_name.tenure_dec} />
          <Row label="Moratorium Interest (%)" value={approval.approval_name.moratorium.interest} />
          <Row label="Moratorium Period (Months)" value={approval.approval_name.moratorium.period} />
        </Card>

        {/* METADATA */}
        <Card title="Audit Information">
          <Row label="Created By" value={approval.created_user} />
          <Row label="Created At" value={approval.created_at} />
          <Row label="Modified By" value={approval.modified_user} />
          <Row label="Modified At" value={approval.modified_at} />
        </Card>
      </div>
    </MainLayout>
  );
};

export default ApprovalView;

/* ---------- UI HELPERS ---------- */

const Card = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6">
    <h3 className="font-semibold text-gray-700 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Row = ({ label, value, children }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-800 mt-1">
      {children || value || "-"}
    </p>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 text-xs rounded-full font-medium ${
      status === "Active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-600"
    }`}
  >
    {status}
  </span>
);
