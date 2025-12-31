import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import subscriptionService from "../../services/subscriptionService";
import { FiPlus, FiEdit3, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SubscriptionPage() {
  const navigate = useNavigate();

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  /* ================= FETCH ================= */
  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await subscriptionService.getAll();
      const data = Array.isArray(res) ? res : res?.results || [];
      setSubscriptions(data);
    } catch (err) {
      console.error("Failed to load subscriptions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  /* ================= FILTER ================= */
  const filtered = subscriptions.filter((s) =>
    s.subscription_name?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subscription?")) return;
    await subscriptionService.delete(id);
    fetchSubscriptions();
  };

  return (
    <MainLayout>
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold">Subscriptions</h1>
          <p className="text-sm text-gray-500">
            Manage subscription plans and pricing
          </p>
        </div>

        <button
          onClick={() => navigate("/subscriptions/add")}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 text-sm"
        >
          <FiPlus /> Add Subscription
        </button>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          placeholder="Search subscription..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm bg-transparent"
        />
      </div>

      {/* ================= LIST ================= */}
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">

        {/* ===== DESKTOP HEADER ===== */}
        <div className="hidden md:grid grid-cols-5 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600 sticky top-0 z-10">
          <div>Name</div>
          <div>Amount</div>
          <div>Borrowers</div>
          <div>Type</div>
          <div className="text-right">Actions</div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading subscriptions...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No subscriptions found
          </div>
        ) : (
          filtered.map((item) => (
            <React.Fragment key={item.id}>

              {/* ================= DESKTOP ROW ================= */}
              <div className="hidden md:grid bg-white rounded-2xl px-5 py-4 shadow-sm grid-cols-5 items-center text-sm">
                <div className="font-medium truncate">
                  {item.subscription_name}
                </div>

                <div className="text-gray-600">
                  ₹{item.subscription_amount}
                </div>

                <div>{item.no_of_borrowers}</div>

                <div className="capitalize">{item.subscription_type}</div>

                <div className="flex justify-end gap-2">
                  <IconButton
                    color="blue"
                    onClick={() =>
                      navigate(`/subscriptions/edit/${item.id}`)
                    }
                  >
                    <FiEdit3 />
                  </IconButton>

                  <IconButton
                    color="red"
                    onClick={() => handleDelete(item.id)}
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
                    {item.subscription_name}
                  </span>

                  <div className="flex gap-3 text-gray-600">
                    <FiEdit3
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(`/subscriptions/edit/${item.id}`)
                      }
                    />
                    <FiTrash2
                      className="cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </div>

                {/* BODY */}
                <div className="px-4 py-3 space-y-3 text-sm">
                  <Row label="Amount" value={`₹${item.subscription_amount}`} />
                  <Row
                    label="Borrowers"
                    value={item.no_of_borrowers}
                  />
                  <Row
                    label="Type"
                    value={item.subscription_type}
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
      {value || "-"}
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
