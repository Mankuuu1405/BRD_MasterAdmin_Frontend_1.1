import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// import { chargeService } from "../../../services/chargeService";

const ChargeList = () => {
  const navigate = useNavigate();

  const [charges, setCharges] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD LIST ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await chargeService.getCharges();
        setCharges(data || []);
        */

        // TEMP MOCK DATA
        setCharges([
          {
            id: 1,
            name: "Processing Charge",
            frequency: "One-time",
            basis_of_recovery: "Fixed",
            recovery_stage: "Onboarding",
            recovery_mode: "Auto",
            rate: "₹2,000",
            status: "Active",
          },
          {
            id: 2,
            name: "Inspection Charge",
            frequency: "Recurring",
            basis_of_recovery: "Variable",
            recovery_stage: "Post-disbursement",
            recovery_mode: "Manual",
            rate: "1%",
            status: "Active",
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const filteredCharges = charges.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Charges Management</h1>
          <p className="text-sm text-gray-500">
            Manage additional charges beyond interest and fees
          </p>
        </div>

        <button
          onClick={() => navigate("/charges/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Charge
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search charge name..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading charges...</p>
      ) : (
        <div className="space-y-3">
          {/* COLUMN HEADER */}
          <div className="hidden md:grid grid-cols-8 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
            <div>Charge Name</div>
            <div>Frequency</div>
            <div>Basis</div>
            <div>Recovery Stage</div>
            <div>Mode</div>
            <div>Rate</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>

          {/* ROWS */}
          {filteredCharges.map((charge) => (
            <div
              key={charge.id}
              className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-8 gap-y-2 items-center text-sm"
            >
              {/* Charge Name */}
              <div className="font-medium text-gray-900">
                {charge.name}
              </div>

              {/* Frequency */}
              <div className="text-gray-600">
                {charge.frequency}
              </div>

              {/* Basis */}
              <div className="text-gray-600">
                {charge.basis_of_recovery}
              </div>

              {/* Recovery Stage */}
              <div className="text-gray-600">
                {charge.recovery_stage}
              </div>

              {/* Mode */}
              <div className="text-gray-600">
                {charge.recovery_mode}
              </div>

              {/* Rate */}
              <div className="font-medium text-gray-700">
                {charge.rate}
              </div>

              {/* Status */}
              <div>
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  {charge.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
                <button
                  onClick={() =>
                    navigate(`/charges/${charge.id}`)
                  }
                  className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                  title="View"
                >
                  <FiEye />
                </button>

                <button
                  onClick={() =>
                    navigate(`/charges/${charge.id}/edit`)
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

          {filteredCharges.length === 0 && (
            <p className="text-gray-500 text-sm">
              No charges found.
            </p>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default ChargeList;
