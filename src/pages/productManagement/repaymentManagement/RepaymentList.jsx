import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// import { repaymentService } from "../../../services/repaymentService";

const RepaymentList = () => {
  const navigate = useNavigate();

  const [repayments, setRepayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD LIST ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await repaymentService.getRepayments();
        setRepayments(data || []);
        */

        // TEMP MOCK DATA
        setRepayments([
          {
            id: 1,
            type: "EMI",
            frequency: "Monthly",
            tenure: 24,
            no_of_repayments: 24,
            collection_mode: "NACH",
            status: "Active",
          },
          {
            id: 2,
            type: "Bullet",
            frequency: "Bi-weekly",
            tenure: 12,
            no_of_repayments: 6,
            collection_mode: "Online",
            status: "Active",
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const filteredRepayments = repayments.filter((r) =>
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Repayment Management</h1>
          <p className="text-sm text-gray-500">
            Manage loan repayment rules and schedules
          </p>
        </div>

        <button
          onClick={() => navigate("/repayment/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Repayment Rule
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by repayment type..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading repayment rules...</p>
      ) : (
        <div className="space-y-3">
          {/* COLUMN HEADER */}
          <div className="hidden md:grid grid-cols-7 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
            <div>Type</div>
            <div>Frequency</div>
            <div>Tenure (Months)</div>
            <div>No. of Repayments</div>
            <div>Collection Mode</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>

          {/* ROWS */}
          {filteredRepayments.map((repay) => (
            <div
              key={repay.id}
              className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-7 gap-y-2 items-center text-sm"
            >
              <div className="font-medium text-gray-900">
                {repay.type}
              </div>

              <div className="text-gray-600">
                {repay.frequency}
              </div>

              <div className="text-gray-600">
                {repay.tenure}
              </div>

              <div className="text-gray-600">
                {repay.no_of_repayments}
              </div>

              <div className="text-gray-600">
                {repay.collection_mode}
              </div>

              <div>
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  {repay.status}
                </span>
              </div>

              <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
                <button
                  onClick={() => navigate(`/repayment/${repay.id}`)}
                  className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                  title="View"
                >
                  <FiEye />
                </button>

                <button
                  onClick={() =>
                    navigate(`/repayment/${repay.id}/edit`)
                  }
                  className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                  title="Edit"
                >
                  <FiEdit />
                </button>

                <button
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}

          {filteredRepayments.length === 0 && (
            <p className="text-gray-500 text-sm">
              No repayment rules found.
            </p>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default RepaymentList;
