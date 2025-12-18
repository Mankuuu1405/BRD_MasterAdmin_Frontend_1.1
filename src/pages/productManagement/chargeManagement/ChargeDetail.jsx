import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiEdit } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

// import { chargeService } from "../../../services/chargeService";

const ChargeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  /* ---------------- LOAD CHARGE DETAIL ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const res = await chargeService.getChargeById(id);
        setData(res);
        */

        // TEMP MOCK DATA
        setData({
          name: "Processing Charge",
          frequency: "One-time",
          basis_of_recovery: "Fixed",
          recovery_stage: "Onboarding",
          recovery_mode: "Auto",
          rate: "₹2,000",
          status: "Active",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <p className="text-gray-500">Loading charge details...</p>
      </MainLayout>
    );
  }

  if (!data) {
    return (
      <MainLayout>
        <p className="text-gray-500">Charge not found.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
          >
            <FiArrowLeft className="text-gray-700 text-xl" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Charge Details
            </h1>
            <p className="text-gray-500 text-sm">
              View charge configuration and recovery rules
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/charges/${id}/edit`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiEdit /> Edit
        </button>
      </div>

      {/* CONTENT */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl space-y-8">
        {/* -------- CHARGE DETAILS -------- */}
        <Section title="Charge Configuration">
          <DetailItem label="Charge Name" value={data.name} />
          <DetailItem label="Frequency" value={data.frequency} />
          <DetailItem
            label="Basis of Recovery"
            value={data.basis_of_recovery}
          />
          <DetailItem
            label="Recovery Stage"
            value={data.recovery_stage}
          />
          <DetailItem
            label="Mode of Recovery"
            value={data.recovery_mode}
          />
          <DetailItem
            label="Rate of Charges"
            value={data.rate}
          />
        </Section>

        {/* STATUS */}
        <div className="flex justify-end">
          <span className="px-4 py-1 text-sm rounded-full bg-green-100 text-green-700">
            {data.status}
          </span>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChargeDetail;

/* ---------------- SMALL UI HELPERS ---------------- */

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-800">{value}</p>
  </div>
);
