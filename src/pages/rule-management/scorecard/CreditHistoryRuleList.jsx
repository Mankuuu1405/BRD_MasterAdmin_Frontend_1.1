import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit3, FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function CreditHistoryRuleList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [rules, setRules] = useState([
    { id:1, bureau:"CIBIL", min_score:650, max_dpd:30, enquiries:5, risk:"Low", status:"Active" },
    { id:2, bureau:"Experian", min_score:700, max_dpd:15, enquiries:3, risk:"Medium", status:"Active" },
  ]);

  const filtered = rules.filter(r =>
    r.bureau.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Credit History Scorecard</h1>
          <p className="text-sm text-gray-500">Bureau based scoring logic</p>
        </div>

        <button
          onClick={() => navigate("/rule-management/scorecard/credit-history/add")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl flex items-center gap-2"
        >
          <FiPlus/> Add Rule
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400"/>
        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search by bureau..."
          className="w-full outline-none text-sm"
        />
      </div>

      <div className="space-y-3">
        <div className="hidden md:grid grid-cols-7 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Bureau</div>
          <div>Min Score</div>
          <div>Max DPD</div>
          <div>Max Enquiries</div>
          <div>Risk</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filtered.map(r=>(
          <div key={r.id} className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-7 gap-y-2 text-sm items-center">
            <div className="font-medium">{r.bureau}</div>
            <div>{r.min_score}</div>
            <div>{r.max_dpd}</div>
            <div>{r.enquiries}</div>
            <div>{r.risk}</div>
            <span className={`px-3 py-1 text-xs rounded-full ${r.status==="Active"?"bg-green-100 text-green-700":"bg-red-100 text-red-600"}`}>{r.status}</span>

            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <IconButton color="gray" onClick={()=>navigate(`/rule-management/scorecard/credit-history/view/${r.id}`)}><FiEye/></IconButton>
              <IconButton color="blue" onClick={()=>navigate(`/rule-management/scorecard/credit-history/edit/${r.id}`)}><FiEdit3/></IconButton>
              <IconButton color="red" onClick={()=>setRules(rules.filter(x=>x.id!==r.id))}><FiTrash2/></IconButton>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

const IconButton = ({ children, onClick, color }) => (
  <button onClick={onClick} className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200`}>
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
