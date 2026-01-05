import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import {
  PageHeader,
  ListView,
  SearchFilterBar
} from "../../components/Controls/SharedUIHelpers";

export default function LoanImprovementList() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sample data
    setLoans([
      {
        id: 101,
        loan_no: "LN-0001",
        product: "Personal Loan",
        interest: 12.5,
        emi: 8500,
        tenure: "36 Months",
        outstanding: 285000,
        status: "Active",
      },
      {
        id: 102,
        loan_no: "LN-0002",
        product: "Home Loan",
        interest: 8.75,
        emi: 32000,
        tenure: "240 Months",
        outstanding: 4200000,
        status: "Active",
      },
    ]);
    setLoading(false);
  }, []);

  // Filtered based on search
  const filtered = loans.filter((l) =>
    l.loan_no.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= LIST COLUMNS ================= */
  const columns = [
    { key: "loan_no", label: "Loan No" },
    { key: "product", label: "Product" },
    { key: "interest", label: "Interest", type: "text" },
    { key: "emi", label: "EMI", type: "text" },
    { key: "tenure", label: "Tenure" },
    { key: "outstanding", label: "Outstanding", type: "text" },
    { key: "status", label: "Status", type: "status" },
  ];

  /* ================= ROW ACTIONS ================= */
  const actions = [
    {
      icon: <FiArrowRight />,
      color: "blue",
      onClick: (row) => navigate(`/loan-improvement/${row.id}`),
    },
  ];

  return (
    <MainLayout>
      {/* HEADER */}
      <PageHeader
        title="Loan Improvement Management"
        subtitle="Select an active loan to apply improvements"
      />

      {/* SEARCH */}
      <SearchFilterBar search={search} onSearchChange={setSearch} placeholder="Search by Loan Number"/>

      {/* LOAN LIST */}
      {loading ? (
        <p className="text-center py-6 text-gray-500">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center py-6 text-gray-500">No loans found</p>
      ) : (
        <ListView data={filtered} columns={columns} actions={actions} rowKey="id" />
      )}
    </MainLayout>
  );
}
