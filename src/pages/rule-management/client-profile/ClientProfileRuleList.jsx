import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit3, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ruleManagementService } from "../../../services/ruleManagementService";
import DeleteConfirmButton from "../../../components/DeleteConfirmButton";

export default function ClientProfileRuleList() {
  const navigate = useNavigate();
  const [rules, setRules] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    const data = await ruleManagementService.getClientProfileRules();
    setRules(data || []);
  };

  const filtered = rules.filter((r) =>
    r.rule_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    await ruleManagementService.deleteClientProfileRule(deleteId);
    setDeleteId(null);
    loadRules();
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Client Profile Rules</h1>
          <p className="text-sm text-gray-500">
            Define applicant profile based rules
          </p>
        </div>

        <button
          onClick={() => navigate("/rule-management/client-profile/add")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl flex items-center gap-2"
        >
          <FiPlus /> Add Rule
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search rule..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* TABLE */}
      <div className="space-y-3">
        <div className="hidden md:grid grid-cols-6 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Rule</div>
          <div>Parameter</div>
          <div>Condition</div>
          <div>Value</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filtered.map((rule) => (
          <div
            key={rule.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-6 gap-y-2 items-center text-sm"
          >
            <div className="font-medium">{rule.rule_name}</div>
            <div>{rule.parameter}</div>
            <div>{rule.condition}</div>
            <div>{rule.value}</div>

  <span
  className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ring-1
    ${
      rule.status?.toLowerCase() === "active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-600"
    }`}
>
  {rule.status}
</span>



            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <IconButton color="gray" onClick={() => navigate(`/rule-management/client-profile/view/${rule.id}`)}>
                <FiEye />
              </IconButton>
              <IconButton color="blue" onClick={() => navigate(`/rule-management/client-profile/edit/${rule.id}`)}>
                <FiEdit3 />
              </IconButton>
              <IconButton color="red" onClick={() => setDeleteId(rule.id)}>
                <FiTrash2 />
              </IconButton>
            </div>
          </div>
        ))}
      </div>

      {/* DELETE CONFIRM */}
      {deleteId && (
        <DeleteConfirmButton
          title="Delete Rule"
          message="Are you sure you want to delete this rule?"
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </MainLayout>
  );
}

const IconButton = ({ children, onClick, color }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200`}
  >
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
