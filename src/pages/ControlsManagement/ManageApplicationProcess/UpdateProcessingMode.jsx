// import React, { useState } from "react";
// import MainLayout from "../../../layout/MainLayout";
// import { Header, Select, SaveBtn } from "../../../components/Controls/SharedUIHelpers";
// import { FiArrowLeft, FiSave } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// export default function UpdateProcessingMode() {
//   const navigate = useNavigate();
//   const [mode, setMode] = useState("Manual");

//   const handleSave = () => {
//     console.log("Processing Mode:", mode);
//     navigate(-1);
//   };

//   return (
//     <MainLayout>
//       <Header
//         title="Processing Mode"
//         subtitle="Select how applications are processed"
//       />

//       <div className="bg-white p-8 rounded-2xl shadow-md max-w-xl space-y-6">
//         <Select
//           label="Processing Mode"
//           value={mode}
//           onChange={(e) => setMode(e.target.value)}
//           options={["Manual", "Auto", "Hybrid"]}
//         />

//         <div className="flex justify-end">
//           <SaveBtn onClick={handleSave} />
//         </div>
//       </div>
//     </MainLayout>
//   );
// }
