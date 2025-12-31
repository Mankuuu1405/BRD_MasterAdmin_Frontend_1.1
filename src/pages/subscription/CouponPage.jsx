import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import couponService from "../../services/couponService";

export default function CouponPage() {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  /* ---------------- DATE FORMAT ---------------- */
  const formatDate = (date) => (date ? date.split("T")[0] : "-");

  /* ---------------- LOAD ---------------- */
  const loadCoupons = async () => {
    try {
      const res = await couponService.getAll();
      const data = Array.isArray(res) ? res : res.results || [];
      setList(data);
    } catch (err) {
      console.error("Failed to load coupons:", err);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  /* ---------------- FILTER ---------------- */
  const filtered = list.filter((c) =>
    c.coupon_code?.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    await couponService.delete(id);
    loadCoupons();
  };

  return (
    <MainLayout>
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-white hover:bg-gray-100 shadow"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">Coupons</h1>
      </div>

      {/* ================= SEARCH + ADD ================= */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center bg-white p-3 rounded-xl shadow-sm w-full">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            placeholder="Search coupon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        <button
          onClick={() => navigate("/coupons/add")}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 text-sm"
        >
          <FiPlus /> Add Coupon
        </button>
      </div>

      {/* ================= LIST ================= */}
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">

        {/* ===== DESKTOP HEADER ===== */}
        <div className="hidden md:grid grid-cols-5 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600 sticky top-0 z-10">
          <div>Code</div>
          <div>Value</div>
          <div>Validity</div>
          <div>Subscriptions</div>
          <div className="text-right">Actions</div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No coupons found
          </div>
        ) : (
          filtered.map((c) => (
            <React.Fragment key={c.id}>

              {/* ================= DESKTOP ROW ================= */}
              <div className="hidden md:grid bg-white rounded-2xl px-5 py-4 shadow-sm grid-cols-5 items-center text-sm">
                <div className="font-medium">{c.coupon_code}</div>

                <div className="text-gray-700">
                  ₹{c.coupon_value}
                </div>

                <div className="text-xs text-gray-600">
                  {formatDate(c.valid_from)} → {formatDate(c.valid_to)}
                </div>

                <div className="text-xs text-gray-500 truncate">
                  {c.subscription_names?.length
                    ? c.subscription_names.join(", ")
                    : "-"}
                </div>

                <div className="flex justify-end gap-2">
                  <IconButton
                    color="blue"
                    onClick={() => navigate(`/coupons/edit/${c.id}`)}
                  >
                    <FiEdit2 />
                  </IconButton>
                  <IconButton
                    color="red"
                    onClick={() => handleDelete(c.id)}
                  >
                    <FiTrash2 />
                  </IconButton>
                </div>
              </div>

              {/* ================= MOBILE CARD ================= */}
              <div className="md:hidden bg-white rounded-2xl shadow-sm divide-y">
                {/* TOP */}
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="font-semibold text-sm">
                    {c.coupon_code}
                  </span>

                  <div className="flex gap-3 text-gray-600">
                    <FiEdit2
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(`/coupons/edit/${c.id}`)
                      }
                    />
                    <FiTrash2
                      className="cursor-pointer"
                      onClick={() => handleDelete(c.id)}
                    />
                  </div>
                </div>

                {/* BODY */}
                <div className="px-4 py-3 space-y-3 text-sm">
                  <Row label="Value" value={`₹${c.coupon_value}`} />
                  <Row
                    label="Validity"
                    value={`${formatDate(c.valid_from)} → ${formatDate(
                      c.valid_to
                    )}`}
                  />
                  <Row
                    label="Subscriptions"
                    value={
                      c.subscription_names?.length
                        ? c.subscription_names.join(", ")
                        : "-"
                    }
                  />
                </div>
              </div>

            </React.Fragment>
          ))
        )}
      </div>
    </MainLayout>
  );
}

/* ================= HELPERS ================= */

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <span className="text-gray-400 text-xs">{label}</span>
    <span className="font-medium text-gray-800 text-right">
      {value}
    </span>
  </div>
);

const IconButton = ({ children, onClick, color }) => {
  const map = {
    blue: "bg-blue-100 hover:bg-blue-200 text-blue-600",
    red: "bg-red-100 hover:bg-red-200 text-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full ${map[color]}`}
    >
      {children}
    </button>
  );
};
