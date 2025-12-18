import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// import { interestService } from "../../../services/interestService";

const InterestList = () => {
  const navigate = useNavigate();

  const [interests, setInterests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD LIST ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await interestService.getInterests();
        setInterests(data || []);
        */

        // TEMP MOCK DATA
        setInterests([
          {
            id: 1,
            benchmark_type: "MCLR",
            benchmark_rate: 8.5,
            benchmark_markup: 1.5,
            interest_type: "Floating",
            accrual_method: "Compound",
            interest_rate: 10.0,
            status: "Active",
          },
          {
            id: 2,
            benchmark_type: "RBI Rate",
            benchmark_rate: 6.5,
            benchmark_markup: 2.0,
            interest_type: "Fixed",
            accrual_method: "Simple",
            interest_rate: 8.5,
            status: "Active",
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const filteredInterests = interests.filter((i) =>
    i.benchmark_type.toLowerCase().includes(search.toLowerCase()) ||
    i.interest_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Interest Management</h1>
          <p className="text-sm text-gray-500">
            Manage interest, benchmark and APR configurations
          </p>
        </div>

        <button
          onClick={() => navigate("/interest/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Interest
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search benchmark or interest type..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading interest configurations...</p>
      ) : (
        <div className="space-y-3">
          {/* COLUMN HEADER */}
          <div className="hidden md:grid grid-cols-8 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
            <div>Benchmark</div>
            <div>Interest Type</div>
            <div>Accrual Method</div>
            <div>Benchmark Rate</div>
            <div>Mark Up</div>
            <div>APR</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>

          {/* ROWS */}
          {filteredInterests.map((item) => {
            const apr = item.benchmark_rate + item.benchmark_markup;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-8 gap-y-2 items-center text-sm"
              >
                {/* Benchmark */}
                <div className="font-medium text-gray-900">
                  {item.benchmark_type}
                </div>

                {/* Interest Type */}
                <div className="text-gray-600">
                  {item.interest_type}
                </div>

                {/* Accrual Method */}
                <div className="text-gray-600">
                  {item.accrual_method}
                </div>

                {/* Benchmark Rate */}
                <div className="text-gray-700">
                  {item.benchmark_rate}%
                </div>

                {/* Mark Up */}
                <div className="text-gray-700">
                  {item.benchmark_markup}%
                </div>

                {/* APR */}
                <div className="font-semibold text-blue-600">
                  {apr.toFixed(2)}%
                </div>

                {/* Status */}
                <div>
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    {item.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
                  <button
                    onClick={() =>
                      navigate(`/interest/${item.id}`)
                    }
                    className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                    title="View"
                  >
                    <FiEye />
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/interest/${item.id}/edit`)
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
            );
          })}

          {filteredInterests.length === 0 && (
            <p className="text-gray-500 text-sm">
              No interest configurations found.
            </p>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default InterestList;
