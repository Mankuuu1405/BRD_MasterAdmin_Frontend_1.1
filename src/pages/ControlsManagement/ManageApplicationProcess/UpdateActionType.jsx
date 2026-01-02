// import React, { useState } from "react";
// import MainLayout from "../../../layout/MainLayout";
// import { Header, Select, SaveBtn } from "../../../components/Controls/SharedUIHelpers";
// import ToggleSwitch from "../../../components/Controls/ToggleSwitch";
// import { FiArrowLeft, FiSave } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// export default function UpdateActionType() {
//   const navigate = useNavigate();

//   const [actions, setActions] = useState({
//     submit: true,
//     approve: true,
//     reject: true,
//     review: false,
//   });

//   const toggle = (key) =>
//     setActions((p) => ({ ...p, [key]: !p[key] }));

//   const handleSave = () => {
//     console.log("Action Types:", actions);
//     navigate(-1);
//   };

//   return (
//     <MainLayout>
//       <Header title="Update Action Types" subtitle="Enable or disable application actions" />

//       <div className="bg-white p-8 rounded-2xl shadow-md max-w-xl space-y-4">
//         {Object.keys(actions).map((k) => (
//           <ToggleSwitch
//             key={k}
//             label={k.toUpperCase()}
//             checked={actions[k]}
//             onChange={() => toggle(k)}
//           />
//         ))}

//         <div className="flex justify-end">
//           <SaveBtn onClick={handleSave} />
//         </div>
//       </div>
//     </MainLayout>
//   );
// }
