// import React, { useState } from "react";
// import MainLayout from "../../../layout/MainLayout";
// import { Header, Select, SaveBtn } from "../../../components/Controls/SharedUIHelpers";
// import ToggleSwitch from "../../../components/Controls/ToggleSwitch";
// import { useNavigate } from "react-router-dom";

// export default function ApplicationSettings() {
//   const navigate = useNavigate();

//   const [settings, setSettings] = useState({
//     reApplication: true,
//   });

//   return (
//     <MainLayout>
//       <Header
//         title="Application Settings"
//         subtitle="Configure re-application and system rules"
//       />

//       <div className="bg-white p-8 rounded-2xl shadow-md max-w-xl space-y-4">
//         <ToggleSwitch
//           label="Enable Re-Application"
//           checked={settings.reApplication}
//           onChange={() =>
//             setSettings({ reApplication: !settings.reApplication })
//           }
//         />

//         <div className="flex justify-end">
//           <SaveBtn onClick={() => navigate(-1)} />
//         </div>
//       </div>
//     </MainLayout>
//   );
// }
