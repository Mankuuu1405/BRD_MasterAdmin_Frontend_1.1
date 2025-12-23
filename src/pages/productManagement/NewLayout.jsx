import { useEffect, useState, useMemo } from "react";
import axiosInstance from "../../utils/axiosInstance";

// ----------------------------------------------------------------------
// 1. CONSTANTS & UTILS
// ----------------------------------------------------------------------

const LOAN_TYPES = [
  "Payday Loan (Short-term Loan)",
  "Personal Loan (Unsecured)",
  "Business Loan",
  "Group Loan (JLG/SHG Model)",
  "Unsecured Education Loan",
  "Consumer Durable Loan",
  "Loan Against Property (LAP)",
  "Loan Against Shares/Securities",
  "Gold Loan",
  "Vehicle Loan",
  "Secured Education Loan",
  "Supply Chain Finance",
  "Bill/Invoice Discounting",
  "Virtual Card (Buy Now, Pay Later)",
  "Credit Line - OD Facility",
  "Agriculture Loan",
  "Microfinance Loan",
  "Equipment Financing",
  "Working Capital Loan",
  "Medical Emergency Loan"
];

const api = {
  get: (endpoint) => axiosInstance.get(`tenants/${endpoint}/`),
  post: (endpoint, data) => axiosInstance.post(`tenants/${endpoint}/`, data),
  delete: (endpoint, id) => axiosInstance.delete(`tenants/${endpoint}/${id}/`),
  update: (endpoint, id, data) => axiosInstance.put(`tenants/${endpoint}/${id}/`, data),
  patch: (endpoint, id, data) => axiosInstance.patch(`tenants/${endpoint}/${id}/`, data),
};

// ----------------------------------------------------------------------
// 2. SHARED UI COMPONENTS
// ----------------------------------------------------------------------

const Switch = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={(e) => { e.stopPropagation(); onChange(); }}
    className={`${
      checked ? 'bg-indigo-600' : 'bg-slate-300'
    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`}
  >
    <span
      aria-hidden="true"
      className={`${
        checked ? 'translate-x-5' : 'translate-x-0'
      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
    />
  </button>
);

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20",
    red: "bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20",
    purple: "bg-purple-50 text-purple-700 border-purple-200 ring-purple-500/20",
    orange: "bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide border ring-1 ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

// ----------------------------------------------------------------------
// 3. MASTER CONFIGURATION FORMS (ENHANCED UI)
// ----------------------------------------------------------------------

const InterestConfigForm = ({ product, onSave, onCancel }) => {
  const [form, setForm] = useState({
    name: `${product.name} - Interest Rate`,
    interest_type: "FIXED",
    base_rate: "",
    benchmark_type: "REPO",
    spread_margin: "0",
    accrual_method: "SIMPLE",
    accrual_stage: "POST_EMI"
  });

  const handleSubmit = async () => {
    try {
      const res = await api.post("interest-configs", form);
      await api.patch("products", product.id, { interest_config: res.data.id });
      onSave();
    } catch (e) { alert("Failed to save Interest Configuration"); }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
      <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-200 flex justify-between items-center backdrop-blur-sm">
        <div>
            <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Interest Configuration</h3>
            <p className="text-slate-500 text-sm mt-1">Define how interest is calculated and applied.</p>
        </div>
        <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100">
           <span className="text-2xl">💸</span>
        </div>
      </div>
      
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="form-group">
            <label className="label-sexy">Interest Type</label>
            <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-xl">
               {['FIXED', 'FLOATING'].map((type) => (
                 <button
                   key={type}
                   onClick={() => setForm({...form, interest_type: type})}
                   className={`py-2 text-sm font-bold rounded-lg transition-all shadow-sm ${form.interest_type === type ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:bg-slate-200/50 shadow-none'}`}
                 >
                   {type === 'FIXED' ? 'Fixed Rate' : 'Floating Rate'}
                 </button>
               ))}
            </div>
          </div>

          <div className="form-group">
            <label className="label-sexy">Base Rate (%)</label>
            <div className="relative group">
                <input type="number" className="input-sexy pr-12 font-mono text-xl" placeholder="0.00" value={form.base_rate} onChange={e => setForm({...form, base_rate: e.target.value})} />
                <span className="absolute right-4 top-3 text-slate-400 font-bold bg-slate-100 px-2 rounded text-sm group-hover:text-indigo-500 transition-colors">%</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="form-group">
             <label className="label-sexy">Accrual Method</label>
             <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer border rounded-2xl p-4 flex flex-col items-center gap-2 transition-all duration-200 ${form.accrual_method === 'SIMPLE' ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500 shadow-md' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                    <input type="radio" name="accrual" value="SIMPLE" checked={form.accrual_method === 'SIMPLE'} onChange={()=>setForm({...form, accrual_method: 'SIMPLE'})} className="hidden"/>
                    <span className="font-bold text-slate-800">Simple</span>
                    <span className="text-xs text-slate-500 text-center">Flat Interest</span>
                </label>
                <label className={`cursor-pointer border rounded-2xl p-4 flex flex-col items-center gap-2 transition-all duration-200 ${form.accrual_method === 'COMPOUND' ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500 shadow-md' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                    <input type="radio" name="accrual" value="COMPOUND" checked={form.accrual_method === 'COMPOUND'} onChange={()=>setForm({...form, accrual_method: 'COMPOUND'})} className="hidden"/>
                    <span className="font-bold text-slate-800">Compound</span>
                    <span className="text-xs text-slate-500 text-center">Reducing Balance</span>
                </label>
             </div>
          </div>

          <div className="form-group">
             <label className="label-sexy">Application Stage</label>
             <select className="input-sexy cursor-pointer" value={form.accrual_stage} onChange={e=>setForm({...form, accrual_stage: e.target.value})}>
                 <option value="POST_EMI">Post-EMI (Standard)</option>
                 <option value="PRE_EMI">Pre-EMI (Moratorium)</option>
             </select>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 px-8 py-5 border-t border-slate-200 flex justify-end gap-3">
        <button onClick={onCancel} className="btn-cancel">Cancel</button>
        <button onClick={handleSubmit} className="btn-save">Save Configuration</button>
      </div>
    </div>
  );
};

const RepaymentConfigForm = ({ product, onSave, onCancel }) => {
  const [form, setForm] = useState({
    name: `${product.name} - Repayment Schedule`,
    schedule_type: "EMI",
    frequency: "MONTHLY",
    cycle_date: "5",
    waterfall_sequence: ["Penalties", "Charges", "Fees", "Interest", "Principal"],
    grace_days: 3
  });

  const moveItem = (index, direction) => {
    const newSeq = [...form.waterfall_sequence];
    const [removed] = newSeq.splice(index, 1);
    newSeq.splice(index + direction, 0, removed);
    setForm({...form, waterfall_sequence: newSeq});
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("repayment-configs", form);
      await api.patch("products", product.id, { repayment_config: res.data.id });
      onSave();
    } catch (e) { alert("Failed to save Repayment Config"); }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
      <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-200 flex justify-between items-center">
        <div>
            <h3 className="text-xl font-extrabold text-slate-800">Repayment Schedule</h3>
            <p className="text-slate-500 text-sm mt-1">Configure cycles, frequencies and priority.</p>
        </div>
        <div className="bg-orange-50 p-2 rounded-lg border border-orange-100">
           <span className="text-2xl">🔄</span>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-1 space-y-6">
           <div className="form-group">
             <label className="label-sexy">Schedule Type</label>
             <select className="input-sexy" value={form.schedule_type} onChange={e=>setForm({...form, schedule_type: e.target.value})}>
               <option value="EMI">Amortized EMI</option>
               <option value="BULLET">Bullet / Balloon</option>
               <option value="STEP_UP">Step-Up</option>
             </select>
           </div>
           <div className="form-group">
             <label className="label-sexy">Frequency</label>
             <select className="input-sexy" value={form.frequency} onChange={e=>setForm({...form, frequency: e.target.value})}>
               <option value="MONTHLY">Monthly</option>
               <option value="WEEKLY">Weekly</option>
               <option value="BI_WEEKLY">Bi-Weekly</option>
             </select>
           </div>
           <div className="form-group">
             <label className="label-sexy">Cycle Date (Day)</label>
             <div className="relative">
                <input type="number" className="input-sexy font-mono pl-10" value={form.cycle_date} onChange={e=>setForm({...form, cycle_date: e.target.value})} placeholder="5" />
                <span className="absolute left-3 top-3 text-slate-400">📅</span>
             </div>
           </div>
        </div>

        {/* Right Column: Waterfall */}
        <div className="lg:col-span-2">
           <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl p-6 h-full shadow-inner">
              <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🌊</span>
                  <div>
                      <h4 className="text-sm font-bold text-orange-900 uppercase tracking-wider">Waterfall Mechanism</h4>
                      <p className="text-xs text-orange-700/70">Drag priority order (Simulated)</p>
                  </div>
              </div>
              
              <div className="space-y-3 relative">
                 {/* Connecting line */}
                <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-orange-200 border-l border-dashed border-orange-300 z-0"></div>

                {form.waterfall_sequence.map((item, idx) => (
                  <div key={item} className="relative z-10 flex justify-between items-center bg-white p-3 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4">
                        <span className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm shadow-inner ring-2 ring-white">{idx + 1}</span>
                        <span className="font-bold text-slate-700">{item}</span>
                    </div>
                    <div className="flex gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button disabled={idx===0} onClick={()=>moveItem(idx, -1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-orange-600 transition disabled:opacity-0">▲</button>
                      <button disabled={idx===form.waterfall_sequence.length-1} onClick={()=>moveItem(idx, 1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-orange-600 transition disabled:opacity-0">▼</button>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>

      <div className="bg-slate-50 px-8 py-5 border-t border-slate-200 flex justify-end gap-3">
        <button onClick={onCancel} className="btn-cancel">Cancel</button>
        <button onClick={handleSubmit} className="btn-save">Save Schedule</button>
      </div>
    </div>
  );
};

const RiskConfigForm = ({ product, onSave, onCancel }) => {
  const [form, setForm] = useState({
    name: `${product.name} - Risk Policy`,
    min_age: 21,
    max_age: 60,
    min_salary: 15000,
    max_foir: 60,
    allowed_income_types: ["Salaried"],
    min_cibil_score: 700 
  });

  const incomeTypes = ["Salaried", "Self-Employed", "Business"];

  const toggleIncomeType = (type) => {
    const current = form.allowed_income_types || [];
    if (current.includes(type)) {
      setForm({ ...form, allowed_income_types: current.filter(t => t !== type) });
    } else {
      setForm({ ...form, allowed_income_types: [...current, type] });
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("risk-rules", form);
      await api.patch("products", product.id, { risk_rule: res.data.id });
      onSave();
    } catch (e) {
      alert("Failed to save Risk Configuration");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
      <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-200 flex justify-between items-center">
        <div>
            <h3 className="text-xl font-extrabold text-slate-800">Risk & Eligibility</h3>
            <p className="text-slate-500 text-sm mt-1">Set underwriting parameters and eligibility criteria.</p>
        </div>
        <div className="bg-rose-50 p-2 rounded-lg border border-rose-100">
           <span className="text-2xl">🛡️</span>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column */}
        <div className="space-y-8">
           <div>
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Applicant Criteria</h4>
               <div className="grid grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="label-sexy">Min Age</label>
                    <input type="number" className="input-sexy" value={form.min_age} onChange={e=>setForm({...form, min_age: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="label-sexy">Max Age</label>
                    <input type="number" className="input-sexy" value={form.max_age} onChange={e=>setForm({...form, max_age: e.target.value})} />
                  </div>
               </div>
           </div>

           <div className="form-group">
              <label className="label-sexy">Allowed Profiles</label>
              <div className="flex flex-wrap gap-2">
                {incomeTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleIncomeType(type)}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 ease-out transform active:scale-95 ${
                      form.allowed_income_types.includes(type)
                      ? 'bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-200'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {form.allowed_income_types.includes(type) && "✓ "} {type}
                  </button>
                ))}
              </div>
           </div>

           <div className="form-group">
             <label className="label-sexy">Min Monthly Income</label>
             <div className="relative">
                <input type="number" className="input-sexy pl-10" value={form.min_salary} onChange={e=>setForm({...form, min_salary: e.target.value})} />
                <span className="absolute left-3 top-3 text-slate-400 font-bold">₹</span>
             </div>
           </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
           <div>
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Underwriting Logic</h4>
               
               {/* Custom Slider Card */}
               <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6 relative overflow-hidden group hover:border-rose-200 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-9xl text-rose-500 font-bold -mt-8 -mr-8 select-none">%</div>
                  <div className="flex justify-between items-end mb-4 relative z-10">
                     <label className="text-sm font-bold text-slate-700">Max FOIR Limit</label>
                     <span className="text-3xl font-extrabold text-rose-600">{form.max_foir}<span className="text-lg text-rose-400 ml-1">%</span></span>
                  </div>
                  <input 
                    type="range" min="10" max="90" 
                    value={form.max_foir} 
                    onChange={e=>setForm({...form, max_foir: e.target.value})}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-600 relative z-10"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider relative z-10">
                      <span>Conservative</span>
                      <span>Aggressive</span>
                  </div>
               </div>

               <div className="form-group">
                  <label className="label-sexy text-slate-700">Minimum CIBIL Score</label>
                  <div className="relative">
                      <input type="number" className="input-sexy pl-12 border-rose-100 focus:border-rose-500 focus:ring-rose-500 font-mono text-lg" value={form.min_cibil_score} onChange={e=>setForm({...form, min_cibil_score: e.target.value})} />
                      <span className="absolute left-4 top-3.5 text-lg">🛡️</span>
                  </div>
               </div>
           </div>
           
           <div className="form-group">
              <label className="label-sexy">Internal Policy Name</label>
              <input className="input-sexy" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
           </div>
        </div>
      </div>

      <div className="bg-slate-50 px-8 py-5 border-t border-slate-200 flex justify-end gap-3">
        <button onClick={onCancel} className="btn-cancel">Cancel</button>
        <button onClick={handleSubmit} className="btn-save bg-rose-600 hover:bg-rose-700 text-white">Save Rules</button>
      </div>
    </div>
  );
};

const FeesManager = ({ product, existingCharges, onSave }) => {
  const [charges, setCharges] = useState(existingCharges || []);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [newFee, setNewFee] = useState({
    name: "",
    category: "FEE",
    frequency: "ONE_TIME",
    basis: "FIXED",
    value: "",
    recovery_stage: "DISBURSEMENT"
  });

  const handleAddFee = async () => {
    if (!newFee.name || !newFee.value) {
      alert("Please enter Fee Name and Value");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("charge-configs", newFee);
      const newFeeId = res.data.id;
      const newFeeObj = res.data;
      
      const currentIds = charges.map(c => c.id);
      const updatedIds = [...currentIds, newFeeId];

      await api.patch("products", product.id, { charges: updatedIds });
      
      setCharges([...charges, newFeeObj]);
      setIsCreating(false);
      setNewFee({ name: "", category: "FEE", frequency: "ONE_TIME", basis: "FIXED", value: "", recovery_stage: "DISBURSEMENT" });
      
      if (onSave) onSave(); 
    } catch (e) {
      console.error(e);
      alert("Failed to add fee.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFee = async (feeId) => {
    if(!confirm("Are you sure you want to remove this fee?")) return;
    try {
      const updatedIds = charges.filter(c => c.id !== feeId).map(c => c.id);
      await api.patch("products", product.id, { charges: updatedIds });
      setCharges(charges.filter(c => c.id !== feeId));
      if (onSave) onSave();
    } catch(e) { 
      alert("Failed to remove fee"); 
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 animate-fade-in">
         {charges.map((fee, index) => (
           <div key={fee.id || index} className="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="flex items-center gap-5">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${fee.category === 'FEE' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {fee.category === 'FEE' ? '🧾' : '⚠️'}
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{fee.name}</h4>
                    <div className="flex gap-2 mt-1.5">
                      <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wide border border-slate-200">{fee.recovery_stage}</span>
                      <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wide border border-slate-200">{fee.frequency}</span>
                    </div>
                 </div>
              </div>
              <div className="text-right flex items-center gap-8">
                 <div>
                    <div className="text-xl font-extrabold text-slate-900 font-mono">
                      {fee.basis === 'FIXED' ? `₹${fee.value}` : `${fee.value}%`}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Amount</div>
                 </div>
                 <button onClick={() => handleRemoveFee(fee.id)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all border border-slate-200 shadow-sm">
                    ✕
                 </button>
              </div>
           </div>
         ))}
         {charges.length === 0 && !isCreating && (
           <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
             <div className="text-4xl opacity-30 mb-2">💸</div>
             <p className="text-slate-500 font-medium">No fees configured yet.</p>
           </div>
         )}
      </div>

      {isCreating ? (
        <div className="bg-white rounded-2xl border border-emerald-100 shadow-xl animate-fade-in overflow-hidden ring-4 ring-emerald-50/50">
           <div className="bg-emerald-50/50 px-8 py-6 border-b border-emerald-100 flex justify-between items-center">
              <h4 className="font-bold text-lg text-emerald-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Add New Fee
              </h4>
              <button onClick={() => setIsCreating(false)} className="text-xs font-bold text-emerald-700 hover:text-emerald-900 uppercase tracking-wide bg-emerald-100 px-3 py-1 rounded-lg">Cancel</button>
           </div>
           
           <div className="p-8">
               <div className="grid grid-cols-2 gap-8 mb-8">
                  <div className="col-span-2 form-group">
                     <label className="label-sexy">Fee Name</label>
                     <input className="input-sexy" placeholder="e.g. Processing Fee" value={newFee.name} onChange={e=>setNewFee({...newFee, name: e.target.value})} autoFocus />
                  </div>
                  <div className="form-group">
                     <label className="label-sexy">Category</label>
                     <select className="input-sexy" value={newFee.category} onChange={e=>setNewFee({...newFee, category: e.target.value})}>
                        <option value="FEE">Standard Fee</option>
                        <option value="PENALTY">Penalty</option>
                     </select>
                  </div>
                  <div className="form-group">
                     <label className="label-sexy">Value</label>
                     <div className="flex shadow-sm rounded-lg">
                        <input type="number" className="input-sexy rounded-r-none border-r-0 shadow-none focus:ring-0 focus:border-indigo-500 z-10" placeholder="0.00" value={newFee.value} onChange={e=>setNewFee({...newFee, value: e.target.value})} />
                        <select className="w-32 bg-slate-50 border border-slate-300 rounded-r-lg px-4 outline-none text-sm font-bold text-slate-700 hover:bg-slate-100 transition border-l-0" value={newFee.basis} onChange={e=>setNewFee({...newFee, basis: e.target.value})}>
                           <option value="FIXED">₹ (Flat)</option>
                           <option value="PERCENTAGE">% (Percent)</option>
                        </select>
                     </div>
                  </div>
                  <div className="form-group">
                     <label className="label-sexy">Collection Stage</label>
                     <select className="input-sexy" value={newFee.recovery_stage} onChange={e=>setNewFee({...newFee, recovery_stage: e.target.value})}>
                        <option value="DISBURSEMENT">Deduct from Disbursement</option>
                        <option value="ONGOING">Add to EMI</option>
                        <option value="MISSED_EMI">On Missed EMI</option>
                        <option value="POST_DEFAULT">Post Default</option>
                     </select>
                  </div>
                  <div className="form-group">
                     <label className="label-sexy">Frequency</label>
                     <select className="input-sexy" value={newFee.frequency} onChange={e=>setNewFee({...newFee, frequency: e.target.value})}>
                        <option value="ONE_TIME">One Time</option>
                        <option value="RECURRING">Recurring</option>
                     </select>
                  </div>
               </div>
               <button onClick={handleAddFee} disabled={loading} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all transform active:scale-[0.98]">
                  {loading ? 'Saving...' : 'Create & Link Fee'}
               </button>
           </div>
        </div>
      ) : (
        <button onClick={() => setIsCreating(true)} className="w-full py-6 border-2 border-dashed border-slate-300 text-slate-400 font-bold rounded-2xl hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all text-sm uppercase tracking-widest flex flex-col items-center gap-2 group">
           <span className="text-3xl group-hover:scale-110 transition-transform">+</span>
           Add New Fee / Charge
        </button>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------
// 4. MAIN PRODUCT MANAGER & DETAILS
// ----------------------------------------------------------------------

const EditProductForm = ({ product, onSave, onCancel }) => {
  const [form, setForm] = useState({ ...product });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.patch("products", product.id, form);
      onSave(form);
    } catch (e) {
      alert("Failed to update product details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-indigo-100 shadow-2xl overflow-hidden animate-fade-in relative">
       {/* Decorative Header */}
       <div className="bg-gradient-to-r from-slate-900 to-indigo-900 p-8 text-white flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Edit Product Details</h3>
            <p className="text-indigo-200 text-sm mt-1 font-medium">Update core parameters and limits</p>
          </div>
          <button onClick={onCancel} className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition text-white">×</button>
       </div>

       <div className="p-10 space-y-12">
          {/* Identity Section */}
          <div className="space-y-6">
             <div className="flex items-center gap-4 mb-4 border-b border-slate-100 pb-4">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">1</span>
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Product Identity</h4>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-4">
                <div className="col-span-2 form-group">
                   <label className="label-sexy">Product Name</label>
                   <input className="input-sexy focus:ring-indigo-500 focus:border-indigo-500" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
                </div>
                <div className="col-span-2 form-group">
                   <label className="label-sexy">Loan Type</label>
                   <select className="input-sexy focus:ring-indigo-500 focus:border-indigo-500" value={form.loan_type} onChange={e=>setForm({...form, loan_type: e.target.value})}>
                      {LOAN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                   </select>
                </div>
             </div>
          </div>

          {/* Limits Section */}
          <div className="space-y-6">
             <div className="flex items-center gap-4 mb-4 border-b border-slate-100 pb-4">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">2</span>
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Financial Constraints</h4>
             </div>

             <div className="grid grid-cols-2 gap-8 pl-4">
                <div className="form-group">
                   <label className="label-sexy">Min Amount (₹)</label>
                   <input type="number" className="input-sexy" value={form.min_amount} onChange={e=>setForm({...form, min_amount: e.target.value})} />
                </div>
                <div className="form-group">
                   <label className="label-sexy">Max Amount (₹)</label>
                   <input type="number" className="input-sexy" value={form.max_amount} onChange={e=>setForm({...form, max_amount: e.target.value})} />
                </div>
                <div className="form-group">
                   <label className="label-sexy">Min Tenure (Months)</label>
                   <input type="number" className="input-sexy" value={form.min_tenure} onChange={e=>setForm({...form, min_tenure: e.target.value})} />
                </div>
                <div className="form-group">
                   <label className="label-sexy">Max Tenure (Months)</label>
                   <input type="number" className="input-sexy" value={form.max_tenure} onChange={e=>setForm({...form, max_tenure: e.target.value})} />
                </div>
             </div>
          </div>
       </div>

       {/* Footer Actions */}
       <div className="bg-slate-50 p-8 flex justify-end gap-4 border-t border-slate-200">
          <button onClick={onCancel} className="px-8 py-3 text-slate-600 font-bold hover:bg-white hover:shadow-sm rounded-xl border border-transparent hover:border-slate-200 transition-all uppercase text-xs tracking-widest">
             Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} className="px-10 py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed uppercase text-xs tracking-widest">
             {loading ? 'Saving...' : 'Update Product'}
          </button>
       </div>
    </div>
  );
};

const ProductDetails = ({ product, onBack }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-fade-in">
       <div className="bg-slate-900 text-white p-8 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">←</button>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>
          <p className="text-slate-400 text-sm mt-2 ml-12 uppercase tracking-wider font-semibold">{product.loan_type}</p>
        </div>
        <div className="text-right">
           <Badge color={product.is_active ? "green" : "red"}>{product.is_active ? "ACTIVE" : "INACTIVE"}</Badge>
        </div>
      </div>

      <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="space-y-6">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
               <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Financial Limits</h3>
               <div className="grid grid-cols-2 gap-y-8 text-sm">
                  <div>
                     <div className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Min Amount</div>
                     <div className="font-mono text-xl font-bold text-slate-700">₹{Number(product.min_amount).toLocaleString()}</div>
                  </div>
                  <div>
                     <div className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Max Amount</div>
                     <div className="font-mono text-xl font-bold text-slate-700">₹{Number(product.max_amount).toLocaleString()}</div>
                  </div>
                  <div>
                     <div className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Min Tenure</div>
                     <div className="font-mono text-xl font-bold text-slate-700">{product.min_tenure} Months</div>
                  </div>
                  <div>
                     <div className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Max Tenure</div>
                     <div className="font-mono text-xl font-bold text-slate-700">{product.max_tenure} Months</div>
                  </div>
               </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
               <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Config IDs</h3>
               <ul className="space-y-3 text-xs text-slate-500 font-mono">
                  <li className="flex justify-between p-3 bg-white rounded-lg border border-slate-200 shadow-sm"><span>Interest Config:</span> <span className="font-bold text-slate-800">{product.interest_config || "Not Set"}</span></li>
                  <li className="flex justify-between p-3 bg-white rounded-lg border border-slate-200 shadow-sm"><span>Repayment Config:</span> <span className="font-bold text-slate-800">{product.repayment_config || "Not Set"}</span></li>
                  <li className="flex justify-between p-3 bg-white rounded-lg border border-slate-200 shadow-sm"><span>Risk Rule:</span> <span className="font-bold text-slate-800">{product.risk_rule || "Not Set"}</span></li>
                  <li className="flex justify-between p-3 bg-white rounded-lg border border-slate-200 shadow-sm"><span>Scorecard:</span> <span className="font-bold text-slate-800">{product.scorecard || "Not Set"}</span></li>
               </ul>
            </div>
         </div>

         <div className="space-y-6">
             <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col justify-center items-center text-center h-full hover:border-indigo-200 transition-colors">
                 <div className="text-6xl mb-6 opacity-40 grayscale">📦</div>
                 <h3 className="text-2xl font-bold text-slate-700">Product Overview</h3>
                 <p className="text-slate-400 mt-3 text-sm max-w-sm mx-auto leading-relaxed">
                    This is a read-only view of the loan product. To edit parameters or configurations, please switch to the Configuration mode.
                 </p>
             </div>
         </div>
      </div>
    </div>
  );
};


const ProductManager = ({ product, onBack }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [configData, setConfigData] = useState({ interest: null, repayment: null, risk: null, charges: [] });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  
  const [currentProduct, setCurrentProduct] = useState(product);

  const refreshConfig = async () => {
    setLoading(true);
    try {
      const res = await api.get(`products/${currentProduct.id}`);
      if (res.data.name) {
          setCurrentProduct(prev => ({...prev, ...res.data}));
      }
      setConfigData({
        interest: res.data.interest_details,
        repayment: res.data.repayment_config_details,
        risk: res.data.risk_details,
        charges: res.data.charges_details || [] 
      });
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { refreshConfig(); }, []);

  const handleEditSuccess = (updatedData) => {
    setCurrentProduct({...currentProduct, ...updatedData});
    setIsEditing(false);
    refreshConfig();
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "interest", label: "Interest Rules", icon: "💰" },
    { id: "repayment", label: "Repayment", icon: "🔄" },
    { id: "risk", label: "Risk Criteria", icon: "🛡️" },
    { id: "fees", label: "Fees & Charges", icon: "🧾" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden min-h-[85vh] flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-slate-400 hover:text-white transition">← Back</button>
            <h1 className="text-2xl font-bold">{currentProduct.name}</h1>
          </div>
          <p className="text-slate-400 text-sm mt-1 ml-14">{currentProduct.loan_type} • ₹{currentProduct.min_amount} - ₹{currentProduct.max_amount}</p>
        </div>
        <div className="text-right">
             <div className="text-xs text-slate-400">Status</div>
             <div className="font-semibold text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Config
             </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar Tabs */}
        <div className="w-72 bg-slate-50 border-r border-slate-200 p-6 space-y-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === tab.id 
                ? "bg-white text-indigo-600 shadow-md border border-slate-100 translate-x-1" 
                : "text-slate-500 hover:bg-white hover:text-slate-800 hover:shadow-sm"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-10 bg-slate-50/30 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full text-slate-400 flex-col gap-4">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-sm font-bold uppercase tracking-wider">Loading...</div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <>
                  {isEditing ? (
                     <EditProductForm 
                        product={currentProduct} 
                        onSave={handleEditSuccess} 
                        onCancel={() => setIsEditing(false)} 
                     />
                  ) : (
                    <div className="grid grid-cols-2 gap-8">
                      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                          <div className="flex justify-between items-center mb-8">
                             <h3 className="text-lg font-bold text-slate-800">Product Limits</h3>
                             <button 
                                onClick={() => setIsEditing(true)}
                                className="text-[10px] font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-lg transition-all shadow-md transform hover:-translate-y-0.5 uppercase tracking-widest"
                             >
                                ✎ Edit Details
                             </button>
                          </div>
                          <div className="space-y-6">
                            <div className="flex justify-between border-b border-slate-50 pb-4">
                              <span className="text-slate-500 text-sm font-bold uppercase tracking-wide">Min Amount</span>
                              <span className="font-bold text-slate-800 text-lg">₹{Number(currentProduct.min_amount).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-50 pb-4">
                              <span className="text-slate-500 text-sm font-bold uppercase tracking-wide">Max Amount</span>
                              <span className="font-bold text-slate-800 text-lg">₹{Number(currentProduct.max_amount).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between pt-2">
                              <span className="text-slate-500 text-sm font-bold uppercase tracking-wide">Tenure Range</span>
                              <span className="font-bold text-slate-800 text-lg">{currentProduct.min_tenure} - {currentProduct.max_tenure} Months</span>
                            </div>
                          </div>
                      </div>
                      
                      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                          <h3 className="text-lg font-bold text-slate-800 mb-8">Configuration Status</h3>
                          <div className="space-y-5">
                              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                                <span className={`w-3 h-3 rounded-full ${configData.interest ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`} />
                                <span className="text-slate-700 font-bold">Interest Rules</span>
                                <span className="ml-auto text-xs font-mono text-slate-400">{configData.interest ? 'CONFIGURED' : 'MISSING'}</span>
                              </div>
                              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                                <span className={`w-3 h-3 rounded-full ${configData.repayment ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`} />
                                <span className="text-slate-700 font-bold">Repayment Logic</span>
                                <span className="ml-auto text-xs font-mono text-slate-400">{configData.repayment ? 'CONFIGURED' : 'MISSING'}</span>
                              </div>
                              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                                <span className={`w-3 h-3 rounded-full ${configData.risk ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`} />
                                <span className="text-slate-700 font-bold">Risk Engine</span>
                                <span className="ml-auto text-xs font-mono text-slate-400">{configData.risk ? 'CONFIGURED' : 'MISSING'}</span>
                              </div>
                              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                                <span className={`w-3 h-3 rounded-full ${configData.charges?.length > 0 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} />
                                <span className="text-slate-700 font-bold">Fees Configured</span>
                                <span className="ml-auto text-xs font-mono text-slate-400">{configData.charges?.length || 0} ITEMS</span>
                              </div>
                          </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {/* INTEREST TAB */}
              {activeTab === 'interest' && (
                <div>
                  {configData.interest ? (
                    <div className="bg-white p-10 rounded-2xl border border-blue-100 shadow-xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50 blur-xl"></div>
                       <div className="flex justify-between items-start relative z-10">
                          <div>
                             <h3 className="text-2xl font-bold text-slate-800 mb-2">{configData.interest.name}</h3>
                             <Badge color="blue">{configData.interest.interest_type}</Badge>
                          </div>
                          <button onClick={() => setConfigData({...configData, interest: null})} className="text-xs font-bold bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition uppercase tracking-wide">Edit Config</button>
                       </div>
                       <div className="mt-10 grid grid-cols-3 gap-8">
                          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                             <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Base Rate</div>
                             <div className="text-4xl font-extrabold text-slate-800">{configData.interest.base_rate}<span className="text-xl text-slate-400">%</span></div>
                          </div>
                          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                             <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Method</div>
                             <div className="text-xl font-bold text-slate-800">{configData.interest.accrual_method}</div>
                          </div>
                          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                             <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Stage</div>
                             <div className="text-xl font-bold text-slate-800">{configData.interest.accrual_stage}</div>
                          </div>
                       </div>
                    </div>
                  ) : (
                    <InterestConfigForm product={currentProduct} onSave={refreshConfig} onCancel={() => {}} />
                  )}
                </div>
              )}

              {/* REPAYMENT TAB */}
              {activeTab === 'repayment' && (
                <div>
                   {configData.repayment ? (
                      <div className="bg-white p-10 rounded-2xl border border-orange-100 shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 opacity-50 blur-xl"></div>
                          <div className="flex justify-between items-start mb-8 relative z-10">
                             <div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">{configData.repayment.name}</h3>
                                <div className="flex gap-2">
                                    <Badge color="orange">{configData.repayment.schedule_type}</Badge>
                                    <Badge color="purple">{configData.repayment.frequency}</Badge>
                                </div>
                             </div>
                             <button onClick={() => setConfigData({...configData, repayment: null})} className="text-xs font-bold bg-orange-50 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-100 transition uppercase tracking-wide">Edit Config</button>
                          </div>
                          <div className="bg-orange-50/50 p-8 rounded-2xl border border-orange-100">
                             <div className="text-xs font-bold text-orange-800 uppercase mb-4 tracking-widest">Waterfall Sequence</div>
                             <div className="flex flex-wrap gap-3">
                                {(configData.repayment.waterfall_sequence || []).map((step, i) => (
                                   <div key={i} className="flex items-center">
                                      <span className="w-8 h-8 flex items-center justify-center bg-white border border-orange-200 rounded-full text-sm font-bold text-orange-600 shadow-sm mr-2">{i+1}</span>
                                      <span className="font-bold text-slate-700">{step}</span>
                                      {i < (configData.repayment.waterfall_sequence || []).length - 1 && <span className="text-orange-300 mx-4 font-bold">→</span>}
                                   </div>
                                ))}
                             </div>
                          </div>
                      </div>
                   ) : (
                      <RepaymentConfigForm product={currentProduct} onSave={refreshConfig} onCancel={() => {}} />
                   )}
                </div>
              )}

              {/* RISK TAB */}
              {activeTab === 'risk' && (
                 <div>
                   {configData.risk ? (
                     <div className="bg-white p-10 rounded-2xl border border-rose-100 shadow-xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -mr-16 -mt-16 opacity-50 blur-xl"></div>
                        <div className="flex justify-between items-start mb-10 relative z-10">
                           <div>
                              <h3 className="text-2xl font-bold text-slate-800 mb-2">{configData.risk.name}</h3>
                              <Badge color="red">Risk Rules</Badge>
                           </div>
                           <button onClick={() => setConfigData({...configData, risk: null})} className="text-xs font-bold bg-rose-50 text-rose-600 px-4 py-2 rounded-lg hover:bg-rose-100 transition uppercase tracking-wide">Edit Rules</button>
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                           <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Eligibility</h4>
                              <ul className="space-y-4 text-sm text-slate-700">
                                <li className="flex justify-between items-center border-b border-slate-200 pb-2">
                                    <span className="font-medium text-slate-500">Age Range</span> 
                                    <span className="font-bold text-lg text-slate-800">{configData.risk.min_age} - {configData.risk.max_age} <span className="text-xs text-slate-400">Yrs</span></span>
                                </li>
                                <li className="flex justify-between items-center border-b border-slate-200 pb-2">
                                    <span className="font-medium text-slate-500">Min Salary</span> 
                                    <span className="font-bold text-lg text-slate-800">₹{Number(configData.risk.min_salary).toLocaleString()}</span>
                                </li>
                              </ul>
                           </div>
                           <div className="bg-rose-50/50 p-8 rounded-2xl border border-rose-100">
                               <h4 className="text-xs font-bold text-rose-800 uppercase tracking-widest mb-6 border-b border-rose-200 pb-2">Risk Thresholds</h4>
                               <div className="grid grid-cols-2 gap-6">
                                   <div className="bg-white p-5 rounded-xl shadow-sm border border-rose-100 text-center">
                                       <div className="text-3xl font-extrabold text-rose-600">{configData.risk.max_foir}<span className="text-lg text-rose-400">%</span></div>
                                       <div className="text-[10px] font-bold text-rose-400 uppercase mt-2 tracking-widest">Max FOIR</div>
                                   </div>
                                   <div className="bg-white p-5 rounded-xl shadow-sm border border-rose-100 text-center">
                                       <div className="text-3xl font-extrabold text-rose-600">{configData.risk.min_cibil_score || 700}</div>
                                       <div className="text-[10px] font-bold text-rose-400 uppercase mt-2 tracking-widest">Min CIBIL</div>
                                   </div>
                               </div>
                           </div>
                        </div>
                     </div>
                   ) : (
                     <RiskConfigForm product={currentProduct} onSave={refreshConfig} onCancel={()=>{}} />
                   )}
                 </div>
              )}

              {/* FEES TAB */}
              {activeTab === 'fees' && (
                 <div>
                    <div className="flex justify-between items-center mb-8">
                       <h2 className="text-2xl font-bold text-slate-800">Fees & Charges</h2>
                       <Badge color="green">{configData.charges?.length || 0} Active</Badge>
                    </div>
                    <FeesManager product={currentProduct} existingCharges={configData.charges} onSave={refreshConfig} />
                 </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 5. CREATE PRODUCT FORM (MODERNIZED)
// ----------------------------------------------------------------------

const CreateProductForm = ({ onCancel, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    loan_type: "Personal Loan (Unsecured)",
    min_amount: "",
    max_amount: "",
    min_tenure: "",
    max_tenure: "",
    is_active: true
  });

  const handleSubmit = async () => {
    try {
      await api.post("products", form);
      onSuccess();
    } catch (e) {
      alert("Failed to create product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in my-10 border border-slate-100">
      <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
        <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2 tracking-tight">Create New Product</h2>
            <p className="text-slate-400 font-medium">Define the core parameters for your lending product.</p>
        </div>
      </div>
      <div className="p-12 space-y-12">
        <div className="space-y-6">
           <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <span className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-lg">1</span>
                <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Core Details</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Basic identification info</p>
                </div>
           </div>
           <div className="grid grid-cols-1 gap-8 pl-4">
               <div className="form-group">
                   <label className="label-sexy">Product Name</label>
                   <input className="input-sexy text-lg" placeholder="e.g. Salaried Personal Loan 2025" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} autoFocus />
               </div>
               <div className="form-group">
                   <label className="label-sexy">Loan Type</label>
                   <select className="input-sexy" value={form.loan_type} onChange={e=>setForm({...form, loan_type: e.target.value})}>
                      {LOAN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                   </select>
               </div>
           </div>
        </div>

        <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <span className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-lg">2</span>
                <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Constraints</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Financial boundaries</p>
                </div>
           </div>
            <div className="grid grid-cols-2 gap-8 pl-4">
                <div className="form-group">
                   <label className="label-sexy">Min Amount (₹)</label>
                   <input type="number" className="input-sexy" value={form.min_amount} onChange={e=>setForm({...form, min_amount: e.target.value})} />
                </div>
                <div className="form-group">
                   <label className="label-sexy">Max Amount (₹)</label>
                   <input type="number" className="input-sexy" value={form.max_amount} onChange={e=>setForm({...form, max_amount: e.target.value})} />
                </div>
                 <div className="form-group">
                   <label className="label-sexy">Min Tenure (Months)</label>
                   <input type="number" className="input-sexy" value={form.min_tenure} onChange={e=>setForm({...form, min_tenure: e.target.value})} />
                </div>
                <div className="form-group">
                   <label className="label-sexy">Max Tenure (Months)</label>
                   <input type="number" className="input-sexy" value={form.max_tenure} onChange={e=>setForm({...form, max_tenure: e.target.value})} />
                </div>
            </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex justify-end gap-5">
           <button onClick={onCancel} className="px-8 py-4 text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-800 rounded-xl transition uppercase text-xs tracking-widest">Cancel</button>
           <button onClick={handleSubmit} className="px-12 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:bg-slate-800 transition-all uppercase text-xs tracking-widest transform hover:-translate-y-1">Create Product</button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 6. MAIN PAGE
// ----------------------------------------------------------------------

export default function newlayout() {
  const [view, setView] = useState("list"); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    try {
      const res = await api.get("products");
      setProducts(res.data || []);
    } catch (e) { console.error("Error loading products"); }
  };

  useEffect(() => { loadProducts(); }, [view]);

  const handleCreateSuccess = () => {
    setView("list");
    loadProducts();
  };

  const handleManage = (product) => {
    setSelectedProduct(product);
    setView("manage");
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setView("details");
  };

  const handleDelete = async (id) => {
    if(!confirm("Are you sure you want to delete this product?")) return;
    try {
        await api.delete("products", id);
        loadProducts(); 
    } catch(e) {
        alert("Failed to delete product.");
    }
  };

  const toggleStatus = async (p) => {
    try {
      await api.patch("products", p.id, { is_active: !p.is_active });
      loadProducts();
    } catch (e) { alert("Status update failed"); }
  };

  const filteredProducts = useMemo(() => {
    if (!search) return products;
    return products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [products, search]);

  if (view === "create") {
    return <div className="p-6 bg-slate-50 min-h-screen"><CreateProductForm onCancel={() => setView("list")} onSuccess={handleCreateSuccess} /></div>;
  }

  if (view === "manage" && selectedProduct) {
    return <div className="p-6 bg-slate-50 min-h-screen"><ProductManager product={selectedProduct} onBack={() => { setSelectedProduct(null); setView("list"); }} /></div>;
  }

  if (view === "details" && selectedProduct) {
    return <div className="p-6 bg-slate-50 min-h-screen"><ProductDetails product={selectedProduct} onBack={() => { setSelectedProduct(null); setView("list"); }} /></div>;
  }

  return (
    <div className="p-10 max-w-[1600px] mx-auto min-h-screen bg-slate-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Loan Products</h1>
          <p className="text-slate-500 mt-2 text-lg">Manage your lending portfolio and business logic.</p>
        </div>
        <button onClick={() => setView("create")} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-slate-800 hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center gap-3">
          <span className="text-2xl font-light">+</span> Create New Product
        </button>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-white">
           <div className="relative flex-1 max-w-lg">
             <span className="absolute left-4 top-3.5 text-slate-400 text-lg">🔍</span>
             <input className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-inner" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-widest text-[10px] backdrop-blur-sm">
              <tr>
                <th className="px-8 py-5">Product Name</th>
                <th className="px-8 py-5">Type</th>
                <th className="px-8 py-5">Limits</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-800 text-base">{p.name}</div>
                    <div className="text-xs text-slate-400 mt-1 font-medium">{p.min_tenure}-{p.max_tenure} Months Tenure</div>
                  </td>
                  <td className="px-8 py-6 text-slate-600"><Badge color="purple">{p.loan_type}</Badge></td>
                  <td className="px-8 py-6 text-slate-600 font-mono font-bold">₹{Number(p.min_amount).toLocaleString()} - ₹{Number(p.max_amount).toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <Switch checked={p.is_active} onChange={() => toggleStatus(p)} />
                      <span className={`text-xs font-bold uppercase tracking-wider ${p.is_active ? 'text-emerald-600' : 'text-slate-400'}`}>{p.is_active ? 'Active' : 'Inactive'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleView(p)} className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-xs font-bold transition-colors border border-transparent hover:border-blue-100">View</button>
                        <button onClick={() => handleManage(p)} className="text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg text-xs font-bold transition-colors border border-transparent hover:border-emerald-100">Configure</button>
                        <button onClick={() => handleDelete(p.id)} className="text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-lg text-xs font-bold transition-colors border border-transparent hover:border-rose-100">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filteredProducts.length && <tr><td colSpan={5} className="px-8 py-16 text-center text-slate-400">No products found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .label-sexy { @apply block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1; }
        .input-sexy { @apply w-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent block p-4 shadow-sm transition-all duration-200 ease-in-out outline-none placeholder:text-slate-300; }
        .btn-save { @apply px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all uppercase text-[10px] tracking-widest transform hover:-translate-y-0.5; }
        .btn-cancel { @apply px-5 py-3 bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-bold rounded-xl transition uppercase text-[10px] tracking-widest; }
        .form-group { @apply flex flex-col mb-2; }
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}