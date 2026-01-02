// import React, { useState } from "react";
// import MainLayout from "../../../layout/MainLayout";
// import { Header, Select, SaveBtn } from "../../../components/Controls/SharedUIHelpers";
// import { useNavigate } from "react-router-dom";

// export default function UpdateApplication() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     processingType: "Initial",
//     applicationMode: "Online",
//   });

//   return (
//     <MainLayout>
//       <Header
//         title="Update Application"
//         subtitle="Configure application update behavior"
//       />

//       <div className="bg-white p-8 rounded-2xl shadow-md max-w-2xl grid md:grid-cols-2 gap-6">
//         <Select
//           label="Processing Type"
//           value={form.processingType}
//           onChange={(e) =>
//             setForm({ ...form, processingType: e.target.value })
//           }
//           options={["Initial", "Re-application", "Refinance"]}
//         />

//         <Select
//           label="Application Mode"
//           value={form.applicationMode}
//           onChange={(e) =>
//             setForm({ ...form, applicationMode: e.target.value })
//           }
//           options={["Online", "Offline"]}
//         />

//         <div className="md:col-span-2 flex justify-end">
//           <SaveBtn onClick={() => navigate(-1)} />
//         </div>
//       </div>
//     </MainLayout>
//   );
// }
