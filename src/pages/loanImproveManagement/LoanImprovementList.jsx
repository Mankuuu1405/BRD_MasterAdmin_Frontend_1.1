import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function LoanImprovementList() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const filtered = loans.filter((l) =>
    l.loan_no.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Loan Improvement Management</h1>
        <p className="text-sm text-gray-500">
          Select an active loan to apply improvements
        </p>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Loan Number"
          className="w-full outline-none text-sm bg-transparent"
        />
      </div>

      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {/* DESKTOP HEADER */}
        <div className="hidden md:grid grid-cols-8 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600 sticky top-0 z-10">
          <div>Loan No</div>
          <div>Product</div>
          <div>Interest</div>
          <div>EMI</div>
          <div>Tenure</div>
          <div>Outstanding</div>
          <div>Status</div>
          <div className="text-right">Action</div>
        </div>

        {loading ? (
          <p className="text-center py-6 text-gray-500">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center py-6 text-gray-500">No loans found</p>
        ) : (
          filtered.map((l) => (
            <React.Fragment key={l.id}>
              {/* DESKTOP ROW */}
              <div className="hidden md:grid bg-white rounded-2xl px-5 py-4 shadow-sm grid-cols-8 items-center text-sm">
                <div className="font-medium">{l.loan_no}</div>
                <div>{l.product}</div>
                <div>{l.interest}%</div>
                <div>₹{l.emi.toLocaleString()}</div>
                <div>{l.tenure}</div>
                <div>₹{l.outstanding.toLocaleString()}</div>
                <StatusBadge status={l.status} />
                <div className="flex justify-end">
                  <button
                    onClick={() => navigate(`/loan-improvement/${l.id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs hover:bg-blue-700"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* MOBILE CARD */}
              <div className="md:hidden bg-white rounded-2xl shadow-sm divide-y">
                <div className="flex justify-between items-center px-4 py-3">
                  <span className="font-semibold text-sm">{l.loan_no}</span>
                  <button
                    onClick={() => navigate(`/loan-improvement/${l.id}`)}
                    className="text-blue-600 text-sm font-medium flex items-center gap-1"
                  >
                    View <FiArrowRight />
                  </button>
                </div>

                <div className="px-4 py-3 space-y-3 text-sm">
                  <Row label="Product" value={l.product} />
                  <Row label="Interest" value={`${l.interest}%`} />
                  <Row label="EMI" value={`₹${l.emi.toLocaleString()}`} />
                  <Row label="Tenure" value={l.tenure} />
                  <Row label="Outstanding" value={`₹${l.outstanding.toLocaleString()}`} />

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Status</span>
                    <StatusBadge status={l.status} />
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </MainLayout>
  );
}

/* HELPERS */
const Row = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-400 text-xs">{label}</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex px-3 py-1 text-xs rounded-full whitespace-nowrap ${
      status === "Active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-600"
    }`}
  >
    {status}
  </span>
);
