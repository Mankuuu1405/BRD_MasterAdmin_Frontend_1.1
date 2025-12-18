import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiEdit } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

// import { interestService } from "../../../services/interestService";

const InterestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  /* ---------------- LOAD INTEREST DETAIL ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const res = await interestService.getInterestById(id);
        setData(res);
        */

        // TEMP MOCK DATA
        setData({
          benchmark: {
            type: "MCLR",
            frequency: "Quarterly",
            rate: 8.5,
            mark_up: 1.5,
          },
          interest: {
            type: "Floating",
            accrual_stage: "Post-EMI",
            accrual_method: "Compound",
            rate: 10,
          },
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
        <p className="text-gray-500">Loading interest details...</p>
      </MainLayout>
    );
  }

  if (!data) {
    return (
      <MainLayout>
        <p className="text-gray-500">Interest configuration not found.</p>
      </MainLayout>
    );
  }

  const apr = data.benchmark.rate + data.benchmark.mark_up;

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
              Interest Configuration Details
            </h1>
            <p className="text-gray-500 text-sm">
              View benchmark, interest rules and APR
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/interest/${id}/edit`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiEdit /> Edit
        </button>
      </div>

      {/* CONTENT */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl space-y-8">
        {/* -------- BENCHMARK SECTION -------- */}
        <Section title="Benchmark Configuration">
          <DetailItem label="Benchmark Type" value={data.benchmark.type} />
          <DetailItem
            label="Frequency"
            value={data.benchmark.frequency}
          />
          <DetailItem
            label="Benchmark Rate"
            value={`${data.benchmark.rate}%`}
          />
          <DetailItem
            label="Mark Up"
            value={`${data.benchmark.mark_up}%`}
          />
        </Section>

        {/* -------- INTEREST SECTION -------- */}
        <Section title="Interest Configuration">
          <DetailItem label="Interest Type" value={data.interest.type} />
          <DetailItem
            label="Stage of Accrual"
            value={data.interest.accrual_stage}
          />
          <DetailItem
            label="Method of Accrual"
            value={data.interest.accrual_method}
          />
          <DetailItem
            label="Interest Rate"
            value={`${data.interest.rate}% p.a.`}
          />
        </Section>

        {/* -------- APR -------- */}
        <div className="border-t pt-6 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Average Percentage Rate (APR)
          </h3>
          <span className="text-2xl font-bold text-blue-600">
            {apr.toFixed(2)}%
          </span>
        </div>

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

export default InterestDetail;

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
