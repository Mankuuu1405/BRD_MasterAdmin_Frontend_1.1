// import React, { useEffect, useMemo, useState } from "react";
// import MainLayout from "../../../layout/MainLayout";
// import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// // import {
// //   PageHeader,
// //   SearchFilterBar,
// //   DataTable,
// //   StatusBadge,
// //   IconButton,
// // } from "../../../components/Controls/SharedUIHelpers";

// // import { repaymentService } from "../../../services/repaymentService";

// export default function RepaymentList() {
//   const navigate = useNavigate();

//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   /* ---------------- LOAD LIST ---------------- */
//   useEffect(() => {
//     (async () => {
//       try {
//         /*
//         const res = await repaymentService.getRepayments();
//         setData(res || []);
//         */

//         // TEMP MOCK
//         setData([
//           {
//             id: 1,
//             type: "EMI",
//             frequency: "Monthly",
//             tenure: 24,
//             no_of_repayments: 24,
//             collection_mode: "NACH",
//             status: "Active",
//           },
//           {
//             id: 2,
//             type: "Bullet",
//             frequency: "Bi-weekly",
//             tenure: 12,
//             no_of_repayments: 6,
//             collection_mode: "Online",
//             status: "Active",
//           },
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   /* ---------------- FILTER ---------------- */
//   const filtered = useMemo(() => {
//     return data.filter((r) =>
//       r.type.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [data, search]);

//   /* ---------------- TABLE CONFIG ---------------- */
//   const columns = [
//     { key: "type", label: "Type" },
//     { key: "frequency", label: "Frequency" },
//     { key: "tenure", label: "Tenure (Months)" },
//     { key: "no_of_repayments", label: "No. of Repayments" },
//     { key: "collection_mode", label: "Collection Mode" },
//     {
//       key: "status",
//       label: "Status",
//       render: (row) => <StatusBadge value={row.status} />,
//     },
//   ];

//   const actions = [
//     {
//       icon: <FiEye />,
//       onClick: (row) => navigate(`/repayment/${row.id}`),
//     },
//     {
//       icon: <FiEdit />,
//       onClick: (row) => navigate(`/repayment/${row.id}/edit`),
//     },
//     {
//       icon: <FiTrash2 />,
//       danger: true,
//       onClick: (row) => console.log("Delete", row.id),
//     },
//   ];

//   return (
//     <MainLayout>
//       {/* HEADER */}
//       <PageHeader
//         title="Repayment Management"
//         subtitle="Manage loan repayment rules and schedules"
//         actionLabel="Add Repayment Rule"
//         onAction={() => navigate("/repayment/add")}
//       />

//       {/* SEARCH */}
//       <SearchFilterBar
//         search={search}
//         onSearchChange={setSearch}
//         placeholder="Search by repayment type..."
//       />

//       {/* TABLE */}
//       <DataTable
//         loading={loading}
//         columns={columns}
//         data={filtered}
//         actions={actions}
//         emptyText="No repayment rules found."
//       />
//     </MainLayout>
//   );
// }


export default function RepaymentList(){
  return(
    <>
      hello
    </>
  )
}
