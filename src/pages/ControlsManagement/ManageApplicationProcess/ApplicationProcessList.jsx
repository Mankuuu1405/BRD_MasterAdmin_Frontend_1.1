// import React from "react";
// import MainLayout from "../../../layout/MainLayout";
// import { Header, Select, SaveBtn } from "../../../components/Controls/SharedUIHelpers";
// import { FiSettings, FiEdit3 } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// export default function ApplicationProcessList() {
//   const navigate = useNavigate();

//   const items = [
//     {
//       title: "Update Action Types",
//       desc: "Configure Submit, Approve, Reject, Review actions",
//       path: "/controls/application-process/action-type",
//     },
//     {
//       title: "Processing Mode",
//       desc: "Manual, Auto, Hybrid processing rules",
//       path: "/controls/application-process/processing-mode",
//     },
//     {
//       title: "Update Application",
//       desc: "Modify application master data behavior",
//       path: "/controls/application-process/update-application",
//     },
//     {
//       title: "Application Settings",
//       desc: "Modes, re-application, processing types",
//       path: "/controls/application-process/settings",
//     },
//   ];

//   return (
//     <MainLayout>
//       <div className="mb-6">
//         <h1 className="text-xl font-semibold">Application Process Management</h1>
//         <p className="text-sm text-gray-500">
//           Control how loan applications are processed and updated
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         {items.map((item) => (
//           <div
//             key={item.title}
//             className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-start"
//           >
//             <div>
//               <h3 className="font-semibold">{item.title}</h3>
//               <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
//             </div>
//             <button
//               onClick={() => navigate(item.path)}
//               className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100"
//             >
//               <FiEdit3 />
//             </button>
//           </div>
//         ))}
//       </div>
//     </MainLayout>
//   );
// }
