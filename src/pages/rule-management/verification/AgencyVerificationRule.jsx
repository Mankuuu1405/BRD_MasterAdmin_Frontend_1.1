import React,{useEffect,useState} from "react";
import MainLayout from "../../../layout/MainLayout";
import {FiPlus,FiEdit3,FiTrash2,FiEye,FiSearch} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import { ruleManagementService } from "../../../services/ruleManagementService";
import DeleteConfirmButton from "../../../components/DeleteConfirmButton";

export default function AgencyVerificationRule(){
  const navigate=useNavigate();
  const [search,setSearch]=useState("");
  const [rules,setRules]=useState([]);
  const [deleteId,setDeleteId]=useState(null);

  useEffect(()=>{ load(); },[]);

  const load = async () => {
    const data = await ruleManagementService.getAgencyVerificationRules();
    setRules(data || []);
  };

  const filteredRules = rules.filter(r =>
    (r.agency_type || "").toLowerCase().includes(search.toLowerCase()) ||
    (r.report_type || "").toLowerCase().includes(search.toLowerCase())
  );

  return(
    <MainLayout>
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Agency Verification Rules</h1>
          <p className="text-sm text-gray-500">
            Configure third-party / agency based verification rules
          </p>
        </div>
        <button onClick={()=>navigate("/rule-management/verification/agency/add")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl flex items-center gap-2">
          <FiPlus/> Add Rule
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400"/>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Search agency or report type..." className="w-full outline-none text-sm"/>
      </div>

      <div className="space-y-3">
        <div className="hidden md:grid grid-cols-5 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Agency Type</div>
          <div>Verification Stage</div>
          <div>Report Type</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filteredRules.map(r=>(
          <div key={r.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-5 gap-y-2 items-center text-sm">

            <div className="font-medium">{r.agency_type}</div>
            <div className="text-gray-600">{r.verification_stage}</div>
            <div className="text-gray-600">{r.report_type}</div>

            <span className={`px-3 py-1 text-xs rounded-full w-fit ${
              r.status==="ACTIVE"?"bg-green-100 text-green-700":"bg-red-100 text-red-600"
            }`}>
              {r.status}
            </span>

            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <IconButton color="gray" onClick={()=>navigate(`/rule-management/verification/agency/view/${r.id}`)}><FiEye/></IconButton>
              <IconButton color="blue" onClick={()=>navigate(`/rule-management/verification/agency/edit/${r.id}`)}><FiEdit3/></IconButton>
              <IconButton color="red" onClick={()=>setDeleteId(r.id)}><FiTrash2/></IconButton>
            </div>
          </div>
        ))}
      </div>

      {deleteId && (
        <DeleteConfirmButton
          title="Delete Rule"
          message="Are you sure you want to delete this agency verification rule?"
          onCancel={()=>setDeleteId(null)}
          onConfirm={async()=>{
            await ruleManagementService.deleteAgencyVerificationRule(deleteId);
            setDeleteId(null);
            load();
          }}
        />
      )}
    </MainLayout>
  );
}

const IconButton=({children,onClick,color})=>(
  <button onClick={onClick} className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200`}>
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
