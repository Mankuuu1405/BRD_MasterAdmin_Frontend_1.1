import React,{useEffect,useState} from "react";
import MainLayout from "../../../layout/MainLayout";
import {FiArrowLeft,FiSave} from "react-icons/fi";
import {useNavigate,useParams} from "react-router-dom";

const PARAMETERS=["Bank Balance","Employment Stability","Residence Stability","Credit Vintage"];
const RISK_LEVELS=["Low","Medium","High"];
const STATUS=["Active","Inactive"];

export default function EditInternalScoreRule(){
  const navigate=useNavigate();
  const {id}=useParams();
  const [form,setForm]=useState({
    parameter:"",
    min_value:"",
    weight:"",
    risk:"",
    status:"Active",
    remarks:""
  });

  useEffect(()=>{
    setForm({parameter:"Bank Balance",min_value:10000,weight:20,risk:"Low",status:"Active",remarks:"Standard rule"});
  },[id]);

  const handleChange=e=>{
    const {name,value}=e.target;
    setForm(p=>({...p,[name]:value}));
  };

  const handleSubmit=e=>{
    e.preventDefault();
    console.log("Updated Internal Rule:",id,form);
    navigate("/rule-management/scorecard/internal");
  };

  return (
    <MainLayout>
      <div className="flex items-center gap-3 mb-8">
        <button onClick={()=>navigate(-1)} className="p-2 rounded-xl bg-gray-50"><FiArrowLeft/></button>
        <h1 className="text-2xl font-bold">Edit Internal Score Rule</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select label="Parameter" name="parameter" value={form.parameter} onChange={handleChange} options={PARAMETERS} required/>
        <Input label="Minimum Value" name="min_value" value={form.min_value} onChange={handleChange} required/>
        <Input label="Weight (%)" name="weight" value={form.weight} onChange={handleChange} required/>
        <Select label="Risk Level" name="risk" value={form.risk} onChange={handleChange} options={RISK_LEVELS} required/>
        <Select label="Status" name="status" value={form.status} onChange={handleChange} options={STATUS}/>
        <Textarea label="Remarks" name="remarks" value={form.remarks} onChange={handleChange} className="md:col-span-2"/>

        <div className="md:col-span-2 flex justify-end">
          <button className="px-5 py-3 bg-indigo-600 text-white rounded-xl flex items-center gap-2">
            <FiSave/> Update Rule
          </button>
        </div>
      </form>
    </MainLayout>
  );
}

const Input=({label,...props})=>(
  <div><label className="text-sm font-medium">{label}</label><input {...props} className="mt-2 w-full p-3 bg-gray-50 rounded-xl border text-sm"/></div>
);
const Select=({label,options,...props})=>(
  <div><label className="text-sm font-medium">{label}</label>
    <select {...props} className="mt-2 w-full p-3 bg-gray-50 rounded-xl border text-sm">
      <option value="">Select</option>{options.map(o=><option key={o}>{o}</option>)}
    </select>
  </div>
);
const Textarea=({label,...props})=>(
  <div><label className="text-sm font-medium">{label}</label><textarea {...props} className="mt-2 w-full p-3 bg-gray-50 rounded-xl border text-sm"/></div>
);
