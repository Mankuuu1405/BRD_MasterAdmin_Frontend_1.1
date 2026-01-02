// import React, { useEffect, useMemo, useState } from "react";
// import MainLayout from "../../../layout/MainLayout";
// import { useNavigate, useParams } from "react-router-dom";

// import {
//   PageHeader,
//   FormCard,
//   FormGrid,
//   InputField,
//   SelectField,
//   MultiSelectField,
//   PrimaryButton,
// } from "../../../components/Controls/SharedUIHelpers";

// // import { repaymentService } from "../../../services/repaymentService";

// /* ---------------- OPTIONS ---------------- */
// const TYPE_OPTIONS = ["EMI", "Bullet", "Step-up"];
// const FREQUENCY_OPTIONS = ["Monthly", "Bi-weekly"];
// const SEQUENCE_OPTIONS = ["Principal First", "Interest First"];
// const COLLECTION_MODE_OPTIONS = ["NACH", "Cash", "Online"];

// const MONTH_OPTIONS = [
//   "January","February","March","April","May","June",
//   "July","August","September","October","November","December",
// ];

// const DAY_OPTIONS = [
//   "Monday","Tuesday","Wednesday",
//   "Thursday","Friday","Saturday","Sunday",
// ];

// const DATE_OPTIONS = ["1","5","10","15","20","25","30"];

// export default function EditRepayment() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   const [form, setForm] = useState({
//     type: "",
//     frequency: "",
//     limit_in_month: "",
//     gap_first_repayment: "",
//     no_of_repayments: "",
//     sequence: "",
//     repayment_months: [],
//     repayment_days: [],
//     repayment_dates: [],
//     collection_mode: "",
//   });

//   const [errors, setErrors] = useState({});

//   /* ---------------- LOAD DATA ---------------- */
//   useEffect(() => {
//     (async () => {
//       try {
//         /*
//         const data = await repaymentService.getRepaymentById(id);
//         setForm({
//           type: data.type,
//           frequency: data.frequency,
//           limit_in_month: data.limit_in_month,
//           gap_first_repayment: data.gap_first_repayment,
//           no_of_repayments: data.no_of_repayments,
//           sequence: data.sequence,
//           repayment_months: data.repayment_months || [],
//           repayment_days: data.repayment_days || [],
//           repayment_dates: data.repayment_dates || [],
//           collection_mode: data.collection_mode,
//         });
//         */

//         // TEMP MOCK
//         setForm({
//           type: "EMI",
//           frequency: "Monthly",
//           limit_in_month: 24,
//           gap_first_repayment: 1,
//           no_of_repayments: 24,
//           sequence: "Principal First",
//           repayment_months: ["January", "February"],
//           repayment_days: ["Monday"],
//           repayment_dates: ["5"],
//           collection_mode: "NACH",
//         });
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [id]);

//   /* ---------------- VALIDATION ---------------- */
//   const validate = (v) => {
//     const e = {};
//     if (!v.type) e.type = "Required";
//     if (!v.frequency) e.frequency = "Required";
//     if (v.limit_in_month <= 0) e.limit_in_month = "Invalid";
//     if (v.gap_first_repayment < 0) e.gap_first_repayment = "Invalid";
//     if (v.no_of_repayments <= 0) e.no_of_repayments = "Invalid";
//     if (!v.sequence) e.sequence = "Required";
//     if (!v.collection_mode) e.collection_mode = "Required";
//     return e;
//   };

//   const hasErrors = useMemo(
//     () => Object.keys(validate(form)).length > 0,
//     [form]
//   );

//   /* ---------------- HANDLERS ---------------- */
//   const update = (key, value) => {
//     const updated = { ...form, [key]: value };
//     setForm(updated);
//     setErrors(validate(updated));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validate(form);
//     setErrors(validationErrors);
//     if (Object.keys(validationErrors).length) return;

//     setSubmitting(true);
//     try {
//       /*
//       await repaymentService.updateRepayment(id, {
//         ...form,
//         limit_in_month: Number(form.limit_in_month),
//         gap_first_repayment: Number(form.gap_first_repayment),
//         no_of_repayments: Number(form.no_of_repayments),
//       });
//       */
//       navigate(-1);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <MainLayout>
//         <p className="text-gray-500">Loading repayment rule...</p>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <PageHeader
//         title="Edit Repayment Rule"
//         subtitle="Update repayment schedule and collection rules"
//         onBack={() => navigate(-1)}
//       />

//       <FormCard>
//         <form onSubmit={handleSubmit}>
//           <FormGrid columns={2}>
//             <SelectField
//               label="Repayment Type"
//               value={form.type}
//               options={TYPE_OPTIONS}
//               error={errors.type}
//               onChange={(v) => update("type", v)}
//             />

//             <SelectField
//               label="Frequency"
//               value={form.frequency}
//               options={FREQUENCY_OPTIONS}
//               error={errors.frequency}
//               onChange={(v) => update("frequency", v)}
//             />

//             <InputField
//               label="Limit in Months"
//               type="number"
//               value={form.limit_in_month}
//               error={errors.limit_in_month}
//               onChange={(v) => update("limit_in_month", Number(v))}
//             />

//             <InputField
//               label="Gap before First Repayment (Months)"
//               type="number"
//               value={form.gap_first_repayment}
//               error={errors.gap_first_repayment}
//               onChange={(v) => update("gap_first_repayment", Number(v))}
//             />

//             <InputField
//               label="No. of Repayments"
//               type="number"
//               value={form.no_of_repayments}
//               error={errors.no_of_repayments}
//               onChange={(v) => update("no_of_repayments", Number(v))}
//             />

//             <SelectField
//               label="Repayment Sequence"
//               value={form.sequence}
//               options={SEQUENCE_OPTIONS}
//               error={errors.sequence}
//               onChange={(v) => update("sequence", v)}
//             />

//             <MultiSelectField
//               label="Repayment Months"
//               options={MONTH_OPTIONS}
//               values={form.repayment_months}
//               onChange={(v) => update("repayment_months", v)}
//             />

//             <MultiSelectField
//               label="Repayment Days"
//               options={DAY_OPTIONS}
//               values={form.repayment_days}
//               onChange={(v) => update("repayment_days", v)}
//             />

//             <MultiSelectField
//               label="Repayment Dates"
//               options={DATE_OPTIONS}
//               values={form.repayment_dates}
//               onChange={(v) => update("repayment_dates", v)}
//             />

//             <SelectField
//               label="Collection Mode"
//               value={form.collection_mode}
//               options={COLLECTION_MODE_OPTIONS}
//               error={errors.collection_mode}
//               onChange={(v) => update("collection_mode", v)}
//             />
//           </FormGrid>

//           <PrimaryButton
//             loading={submitting}
//             disabled={hasErrors}
//             className="mt-6"
//           >
//             Update Repayment Rule
//           </PrimaryButton>
//         </form>
//       </FormCard>
//     </MainLayout>
//   );
// }


export default function EditRepayment(){
  return(
    <>
      hello
    </>
  )
}
