import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit3, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ruleManagementService } from "../../../services/ruleManagementService";
import DeleteConfirmButton from "../../../components/DeleteConfirmButton";

export default function InternalScoreRuleList() {
  const navigate = useNavigate();
  const [rules, setRules] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const data = await ruleManagementService.getInternalScoreRules();
    setRules(data || []);
  };

const filtered = rules.filter(r =>
  (r.parameter || "").toLowerCase().includes(search.toLowerCase())
);


  return (
    <MainLayout>
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Internal Scorecard Rules</h1>
          <p className="text-sm text-gray-500">Company internal scoring logic</p>
        </div>

        <button
          onClick={() => navigate("/rule-management/scorecard/internal/add")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl flex items-center gap-2"
        >
          <FiPlus /> Add Rule
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400"/>
        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search by parameter..."
          className="w-full outline-none text-sm"
        />
      </div>

      <div className="space-y-3">
        <div className="hidden md:grid grid-cols-6 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Parameter</div>
          <div>Min Value</div>
          <div>Weight</div>
          <div>Risk</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filtered.map(r=>(
          <div key={r.id} className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-6 items-center text-sm">
            <div className="font-medium">{r.parameter}</div>
            <div>{r.min_value}</div>
            <div>{r.weight}</div>
            <div className="capitalize">{r.risk_level}</div>

            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
              r.status==="ACTIVE"?"bg-green-100 text-green-700":"bg-red-100 text-red-600"
            }`}>
              {r.status}
            </span>

            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <IconButton color="gray" onClick={()=>navigate(`/rule-management/scorecard/internal/view/${r.id}`)}><FiEye/></IconButton>
              <IconButton color="blue" onClick={()=>navigate(`/rule-management/scorecard/internal/edit/${r.id}`)}><FiEdit3/></IconButton>
              <IconButton color="red" onClick={()=>setDeleteId(r.id)}><FiTrash2/></IconButton>
            </div>
          </div>
        ))}
      </div>

      {deleteId && (
        <DeleteConfirmButton
          title="Delete Rule"
          message="Are you sure you want to delete this internal score rule?"
          onCancel={()=>setDeleteId(null)}
          onConfirm={async()=>{
            await ruleManagementService.deleteInternalScoreRule(deleteId);
            setDeleteId(null);
            load();
          }}
        />
      )}
    </MainLayout>
  );
}

const IconButton = ({ children, onClick, color }) => (
  <button onClick={onClick} className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200`}>
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
