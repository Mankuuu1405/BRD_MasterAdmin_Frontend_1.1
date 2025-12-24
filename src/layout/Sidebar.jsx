import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiUsers,
  FiKey,
  FiBarChart2,
  FiShield,
  FiCreditCard,
  FiUserCheck,
  FiBriefcase,
  FiChevronDown,
  FiChevronUp,
  FiLogOut,
  FiBox,
  FiThumbsUp,
  FiLayers,
  FiClipboard,
  FiRefreshCcw,
  FiFolder,
  FiFileText,
  FiUser,
  FiUserX,
  FiDollarSign,
  FiSettings,
} from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();

  /* ---------------- STATE ---------------- */
  const [openApprovalMaster, setOpenApprovalMaster] = useState(
    location.pathname.startsWith("/approvals") ||
    location.pathname.startsWith("/manage-approvals") ||
    location.pathname.startsWith("/escalation")
  );

  const [openProductRevenue, setOpenProductRevenue] = useState(
    location.pathname.startsWith("/product") ||
    location.pathname.startsWith("/fees") ||
    location.pathname.startsWith("/charges") ||
    location.pathname.startsWith("/interest") ||
    location.pathname.startsWith("/repayment") ||
    location.pathname.startsWith("/penalties") ||
    location.pathname.startsWith("/moratorium")
  );

  const [openLoanImprovement, setOpenLoanImprovement] = useState(
    location.pathname.startsWith("/loan-improvement")
  );

  const [openEligibilityAndScore, setEligibilityAndScore] = useState(
    location.pathname.startsWith("/eligibility") ||
    location.pathname.startsWith("/banking") ||
    location.pathname.startsWith("/obligation") ||
    location.pathname.startsWith("/score-card")
  );

  const [openTemplateManagement, setTemplateManagement] = useState(
    location.pathname.startsWith("/predefined-template") ||
    location.pathname.startsWith("/customized-template")
  );

  const [openBankAndFundManagemnet, setBankAndFundManagement] = useState(
    location.pathname.startsWith("/bank-management") ||
    location.pathname.startsWith("/fund-management") ||
    location.pathname.startsWith("/portfolio-management") ||
    location.pathname.startsWith("/mode-of-bank") ||
    location.pathname.startsWith("/taxation-management") ||
    location.pathname.startsWith("/business-model")
  );

  const [openAgentManagement, setAgentManagement] = useState(
    location.pathname.startsWith("/channel-partners") ||
    location.pathname.startsWith("/verification-agency") ||
    location.pathname.startsWith("/collection-agent") ||
    location.pathname.startsWith("/legal-agent")
  );



  const PROFILE_MANAGEMENT_ROUTES = [
    "/profile-management",
    "/fund-management",
    "/portfolio-management",
    "/mode-of-bank",
    "/taxation-management",
    "/business-model",
  ];

  const [openProfileManagement, setProfileManagement] = useState(
    PROFILE_MANAGEMENT_ROUTES.some((route) =>
      location.pathname.startsWith(route)
    )
  );

  const CONTROL_MANAGEMENT_ROUTES = [
    "/controls/language",
    "/controls/geo",
    "/controls/login-auth",
    "/controls/co-applicant",
    "/controls/login-fees",
    "/controls/joint-applicant",
    "/controls/references",
    "/controls/application-process",
    "/controls/score-card",
    "/controls/verification",
  ];

  const [openControlManagement, setControlManagement] = useState(
    CONTROL_MANAGEMENT_ROUTES.some((route) =>
      location.pathname.startsWith(route)
    )
  );


  /* ---------------- HELPERS ---------------- */
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  const menuItemStyle = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${isActive(path)
      ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
      : "text-gray-700 hover:bg-gray-100"
    }`;

  const productRevenueActive =
    location.pathname.startsWith("/product") ||
    location.pathname.startsWith("/fees") ||
    location.pathname.startsWith("/charges") ||
    location.pathname.startsWith("/interest") ||
    location.pathname.startsWith("/repayment") ||
    location.pathname.startsWith("/penalties") ||
    location.pathname.startsWith("/moratorium");

  const loanImprovementActive =
    location.pathname.startsWith("/loan-improvement");

  const [openDocumentManagement, setOpenDocumentManagement] = useState(
    location.pathname.startsWith("/documents")
  );

  const [openRiskMitigation, setOpenRiskMitigation] = useState(
  location.pathname.startsWith("/risk-management")
);

/* ---------------- DISBURSEMENT MANAGEMENT ---------------- */
const [openDisbursementManagement, setOpenDisbursementManagement] = useState(
  location.pathname.startsWith("/disbursement-management")
);
/* ---------------- COLLECTION MANAGEMENT ---------------- */
const [openCollectionManagement, setOpenCollectionManagement] = useState(
  location.pathname.startsWith("/collection-management")
);

// /* ---------------- PROVISIONING & CLASSIFICATION ---------------- */
const [openProvisioning, setOpenProvisioning] = useState(
  location.pathname.startsWith("/provisioning-classification")
);



  /* ---------------- RENDER ---------------- */
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r flex flex-col justify-between overflow-y-auto">
      {/* TOP */}
      <div>
        {/* TITLE */}
        <div className="p-6">
          <span className="text-xl font-semibold text-gray-900">
            Master Admin
          </span>
        </div>

        {/* MENU */}
        <nav className="px-3 space-y-1">
          {/* MAIN */}
          <Link to="/dashboard" className={menuItemStyle("/dashboard")}>
            <FiHome size={18} /> Home
          </Link>

          <Link to="/organizations" className={menuItemStyle("/organizations")}>
            <FiGrid size={18} /> Organizations
          </Link>

          <Link to="/users" className={menuItemStyle("/users")}>
            <FiUsers size={18} /> Users
          </Link>

          <Link to="/roles" className={menuItemStyle("/roles")}>
            <FiKey size={18} /> Roles
          </Link>

          <Link to="/subscriptions" className={menuItemStyle("/subscriptions")}>
            <FiCreditCard size={18} /> Subscription
          </Link>

          {/* SECTION */}
          <p className="mt-4 mb-2 px-3 text-xs font-semibold uppercase text-gray-500">
            Master Data & Governance
          </p>



          {/* APPROVAL MASTER */}
          <button
            onClick={() => setOpenApprovalMaster((p) => !p)}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${openApprovalMaster
              ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="flex items-center gap-3">
              <FiThumbsUp size={18} /> Approval Master
            </span>
            {openApprovalMaster ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openApprovalMaster && (
            <div className="ml-6 space-y-1">
              <Link to="/approvals" className={menuItemStyle("/approvals")}>
                Approvals
              </Link>
              <Link
                to="/manage-approvals"
                className={menuItemStyle("/manage-approvals")}
              >
                Manage Approvals
              </Link>
              <Link to="/escalation" className={menuItemStyle("/escalation")}>
                Escalation
              </Link>
            </div>
          )}

          {/* PRODUCT & REVENUE */}
          <button
            onClick={() => setOpenProductRevenue((p) => !p)}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${productRevenueActive
              ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="flex items-center gap-3">
              <FiBox size={18} /> Product & Revenue
            </span>
            {openProductRevenue ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openProductRevenue && (
            <div className="ml-6 space-y-1">
              <Link
                to="/product-management/list"
                className={menuItemStyle("/product-management")}
              >
                Product Management
              </Link>
              <Link
                to="/product-mix/list"
                className={menuItemStyle("/product-mix")}
              >
                Product Mix Management
              </Link>
              <Link to="/fees/list" className={menuItemStyle("/fees")}>
                Fees Management
              </Link>
              <Link to="/charges/list" className={menuItemStyle("/charges")}>
                Charges Management
              </Link>
              <Link to="/interest/list" className={menuItemStyle("/interest")}>
                Interest Management
              </Link>
              <Link
                to="/repayment/list"
                className={menuItemStyle("/repayment")}
              >
                Repayment Management
              </Link>
              <Link to="/penalties" className={menuItemStyle("/penalties")}>
                Penalties Management
              </Link>
              <Link to="/moratorium" className={menuItemStyle("/moratorium")}>
                Moratorium Management
              </Link>
            </div>
          )}

          {/* LOAN IMPROVEMENT */}
          <Link
            to="/loan-improvement"
            className={menuItemStyle("/loan-improvement")}
          >
            <FiRefreshCcw size={18} /> Loan Improvement
          </Link>

          {/* ELIGIBILITY & SCORE */}
          <button
            onClick={() => setEligibilityAndScore((p) => !p)}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${openEligibilityAndScore
              ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="flex items-center gap-3">
              <FiClipboard size={18} /> Eligibility & Score
            </span>
            {openEligibilityAndScore ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openEligibilityAndScore && (
            <div className="ml-6 space-y-1">
              <Link to="/eligibility" className={menuItemStyle("/eligibility")}>
                Eligibility Management
              </Link>
              <Link to="/banking" className={menuItemStyle("/banking")}>
                Banking Management
              </Link>
              <Link to="/obligation" className={menuItemStyle("/obligation")}>
                Obligation Management
              </Link>
              <Link to="/score-card" className={menuItemStyle("/score-card")}>
                Score Card Management
              </Link>
            </div>
          )}

          {/* TEMPLATE */}
          <button
            onClick={() => setTemplateManagement((p) => !p)}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${openTemplateManagement
              ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="flex items-center gap-3">
              <FiFileText size={18} /> Template Management
            </span>
            {openTemplateManagement ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openTemplateManagement && (
            <div className="ml-6 space-y-1">
              <Link
                to="/predefine-template"
                className={menuItemStyle("/predefine-template")}
              >
                Predefine Template
              </Link>
              <Link
                to="/customize-template"
                className={menuItemStyle("/customize-template")}
              >
                Customize Template
              </Link>
            </div>
          )}

          {/* Bank&Fund */}
          <button
            onClick={() => setBankAndFundManagement((p) => !p)}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${openBankAndFundManagemnet
              ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="flex items-center gap-3">
              <FiBriefcase size={18} /> Bank & Fund
            </span>
            {openBankAndFundManagemnet ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openBankAndFundManagemnet && (
            <div className="ml-6 space-y-1">
              <Link
                to="/bank-management"
                className={menuItemStyle("/bank-management")}
              >
                Bank Management
              </Link>
              <Link
                to="/fund-management"
                className={menuItemStyle("/fund-management")}
              >
                Fund Management
              </Link>
              <Link
                to="/portfolio-management"
                className={menuItemStyle("/portfolio-management")}
              >
                Portfolio Management
              </Link>
              <Link
                to="/mode-of-bank"
                className={menuItemStyle("/mode-of-bank")}
              >
                Mode Of Bank
              </Link>
              <Link
                to="/taxation-management"
                className={menuItemStyle("/taxation-management")}
              >
                Taxation Management
              </Link>
              <Link
                to="/business-model"
                className={menuItemStyle("/business-model")}
              >
                Business Model
              </Link>
            </div>
          )}

          {/* Profile Management */}
          <button
            onClick={() => setProfileManagement((p) => !p)}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${openProfileManagement
                ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
                : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="flex items-center gap-3">
              <FiUser size={18} /> Profile Management
            </span>
            {openProfileManagement ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openProfileManagement && (
            <div className="ml-6 space-y-1">
              {/* Vendor / Agent / Client */}
              <Link
                to="/profile-management/vendor"
                className={menuItemStyle("/profile-management/vendor")}
              >
                Vendor Profile
              </Link>

              <Link
                to="/profile-management/agent"
                className={menuItemStyle("/profile-management/agent")}
              >
                Agent Profile
              </Link>

              <Link
                to="/profile-management/client"
                className={menuItemStyle("/profile-management/client")}
              >
                Client Profile
              </Link>

            </div>
          )}


          {/* Agent Management */}
          <button
            onClick={() => setAgentManagement((p) => !p)}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${openAgentManagement
                ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
                : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="flex items-center gap-3">
              <FiUsers size={18} /> Agent Management
            </span>
            {openAgentManagement ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openAgentManagement && (
            <div className="ml-6 space-y-1">
              {/* Vendor / Agent / Client */}
              <Link
                to="/channel-partners"
                className={menuItemStyle("/channel-partners")}
              >
                Channel Partners
              </Link>

              <Link
                to="/verification-agency"
                className={menuItemStyle("/verification-agency")}
              >
                Verification Agency
              </Link>

              <Link
                to="/collection-agent"
                className={menuItemStyle("/collection-agent")}
              >
                Collection Agent
              </Link>

              <Link
                to="/legal-agent"
                className={menuItemStyle("/legal-agent")}
              >
                Legal Agent
              </Link>

            </div>
          )}

          {/* Controls Management */}
          <button
            onClick={() => setControlManagement((p) => !p)}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${openControlManagement
                ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
                : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="flex items-center gap-3">
              <FiSettings size={18} /> Controls Management
            </span>
            {openControlManagement ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openControlManagement && (
            <div className="ml-6 space-y-1">
              
              <Link
                to="/controls/language"
                className={menuItemStyle("/controls/language")}
              >
                Manage Language
              </Link>

              <Link
                to="/controls/geo/country"
                className={menuItemStyle("/controls/geo/country")}
              >
                Geo Location
              </Link>

              <Link
                to="/controls/login-auth"
                className={menuItemStyle("/controls/login-auth")}
              >
                Login Authentication
              </Link>


              <Link
                to="/controls/co-applicant"
                className={menuItemStyle("/controls/co-applicant")}
              >
                CoApplicant
              </Link>

              <Link
                to="/controls/login-fees"
                className={menuItemStyle("/controls/login-fees")}
              >
                Login Fee
              </Link>

              <Link
                to="/controls/joint-applicant"
                className={menuItemStyle("/controls/joint-applicant")}
              >
                Joint Applicant
              </Link>

              <Link
                to="/controls/references"
                className={menuItemStyle("/controls/references")}
              >
                References
              </Link>

              <Link
                to="/controls/application-process"
                className={menuItemStyle("/controls/application-process")}
              >
                Application Process
              </Link>

              <Link
                to="/controls/score-card"
                className={menuItemStyle("/controls/score-card")}
              >
                Score Card Rating
              </Link>

              <Link
                to="/controls/verification"
                className={menuItemStyle("/controls/verification")}
              >
                Verification
              </Link>

            </div>
          )}


          {/* DOCUMENT MANAGEMENT */}
          <button
            onClick={() => setOpenDocumentManagement((p) => !p)}
            className={`
    flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all
    ${location.pathname.startsWith("/documents")
                ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
                : "text-gray-700 hover:bg-gray-100"
              }
  `}
          >
            <span className="flex items-center gap-3">
              <FiFolder size={18} />
              Document
            </span>
            {openDocumentManagement ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openDocumentManagement && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                to="/documents/sanction"
                className={menuItemStyle("/documents/sanction")}
              >
                Sanction Documents
              </Link>

              <Link
                to="/documents/loan"
                className={menuItemStyle("/documents/loan")}
              >
                Loan Documents
              </Link>

              <Link
                to="/documents/collateral"
                className={menuItemStyle("/documents/collateral")}
              >
                Collateral Documents
              </Link>
            </div>
          )}
         {/* RISK & MITIGATION */}
<button
  onClick={() => setOpenRiskMitigation((p) => !p)}
  className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${
    location.pathname.startsWith("/risk-management")
      ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
      : "text-gray-700 hover:bg-gray-100"
  }`}
>
  <span className="flex items-center gap-3">
    <FiShield size={18} /> Risk & Mitigation
  </span>
  {openRiskMitigation ? <FiChevronUp /> : <FiChevronDown />}
</button>

{openRiskMitigation && (
  <div className="ml-6 space-y-1">
    <Link
      to="/risk-management/risks"
      className={menuItemStyle("/risk-management/risks")}
    >
      Risk Management
    </Link>

    <Link
      to="/risk-management/mitigation"
      className={menuItemStyle("/risk-management/mitigation")}
    >
      Risk Mitigation
    </Link>

    <Link
      to="/risk-management/deviations"
      className={menuItemStyle("/risk-management/deviations")}
    >
      Deviation Management
    </Link>

    <Link
      to="/risk-management/rcu"
      className={menuItemStyle("/risk-management/rcu")}
    >
      Risk Containment Unit (RCU)
    </Link>

    <Link
      to="/risk-management/fraud"
      className={menuItemStyle("/risk-management/fraud")}
    >
      Fraud Management
    </Link>

    <Link
      to="/risk-management/portfolio-limits"
      className={menuItemStyle("/risk-management/portfolio-limits")}
    >
      Portfolio Limits
    </Link>

    <Link
      to="/risk-management/default-limits"
      className={menuItemStyle("/risk-management/default-limits")}
    >
      Default Limits
    </Link>

    <Link
      to="/risk-management/others"
      className={menuItemStyle("/risk-management/others")}
    >
      Others (Custom Rules)
    </Link>
  </div>
)}

{/* DISBURSEMENT MANAGEMENT */}
<button
  onClick={() => setOpenDisbursementManagement(p => !p)}
  className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${
    location.pathname.startsWith("/disbursement-management")
      ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
      : "text-gray-700 hover:bg-gray-100"
  }`}
>
  <span className="flex items-center gap-3">
    <FiDollarSign size={18} /> Disbursement 
  </span>
  {openDisbursementManagement ? <FiChevronUp /> : <FiChevronDown />}
</button>

{openDisbursementManagement && (
  <div className="ml-6 space-y-1">
    <Link to="/disbursement-management/disbursement" className={menuItemStyle("/disbursement-management/disbursement")}>
      Disbursement Master
    </Link>
    <Link to="/disbursement-management/agency" className={menuItemStyle("/disbursement-management/agency")}>
      Agency Master
    </Link>
    <Link to="/disbursement-management/document" className={menuItemStyle("/disbursement-management/document")}>
      Documents Master
    </Link>
    <Link to="/disbursement-management/frequency" className={menuItemStyle("/disbursement-management/frequency")}>
      Frequency Master
    </Link>
    <Link to="/disbursement-management/down-payment" className={menuItemStyle("/disbursement-management/down-payment")}>
      Down Payment Master
    </Link>
    <Link to="/disbursement-management/stage" className={menuItemStyle("/disbursement-management/stage")}>
      Stage Master
    </Link>
    <Link to="/disbursement-management/third-party" className={menuItemStyle("/disbursement-management/third-party")}>
      Third Party Master
    </Link>
  </div>
)}

{/* COLLECTION MANAGEMENT */}
<button
  onClick={() => setOpenCollectionManagement(p => !p)}
  className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${
    location.pathname.startsWith("/collection-management")
      ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
      : "text-gray-700 hover:bg-gray-100"
  }`}
>
  <span className="flex items-center gap-3">
    <FiLayers size={18} /> Collection Management
  </span>
  {openCollectionManagement ? <FiChevronUp /> : <FiChevronDown />}
</button>

{openCollectionManagement && (
  <div className="ml-6 space-y-1">
    <Link to="/collection-management/payment-gateways" className={menuItemStyle("/collection-management/payment-gateways")}>
      Payment Gateways
    </Link>
    <Link to="/collection-management/controls" className={menuItemStyle("/collection-management/controls")}>
      Collection Controls
    </Link>
    <Link to="/collection-management/client-team-mapping/add" className={menuItemStyle("/collection-management/client-team-mapping")}>
      Client–Team Mapping
    </Link>
    <Link to="/collection-management/client-agent-mapping/add" className={menuItemStyle("/collection-management/client-agent-mapping")}>
      Client–Agent Mapping
    </Link>
    <Link to="/collection-management/payouts/add" className={menuItemStyle("/collection-management/payouts")}>
      Payout Management
    </Link>
  </div>
)}

<button
  onClick={() => setOpenProvisioning(p => !p)}
  className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${
    location.pathname.startsWith("/provisioning-classification")
      ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
      : "text-gray-700 hover:bg-gray-100"
  }`}
>
  <span className="flex items-center gap-3">
    <FiLayers size={18} /> Provisioning & Classification
  </span>
  {openProvisioning ? <FiChevronUp /> : <FiChevronDown />}
</button>

{openProvisioning && (
  <div className="ml-6 mt-1 space-y-1">

    <Link
      to="/provisioning-classification/loan-classification"
      className={menuItemStyle("/provisioning-classification/loan-classification")}
    >
      Loan Classification
    </Link>

    <Link
      to="/provisioning-classification/writeoff"
      className={menuItemStyle("/provisioning-classification/writeoff")}
    >
      Write-off Rules
    </Link>

    <Link
      to="/provisioning-classification/settlement"
      className={menuItemStyle("/provisioning-classification/settlement")}
    >
      Settlement Rules
    </Link>

    <Link
      to="/provisioning-classification/provisioning-npa"
      className={menuItemStyle("/provisioning-classification/provisioning-npa")}
    >
      Provisioning & NPA
    </Link>

    <Link
      to="/provisioning-classification/incentive-management"
      className={menuItemStyle("/provisioning-classification/incentive-management")}
    >
      Incentive Management
    </Link>

  </div>
)}



          <Link to="/audits" className={menuItemStyle("/audits")}>
            <FiShield size={18} /> Audit & Security
          </Link>

          <Link to="/reports" className={menuItemStyle("/reports")}>
            <FiBarChart2 size={18} /> Reports & Analytics
          </Link>

          {/* USER MASTER */}
          <p className="mt-4 mb-2 px-3 text-xs font-semibold uppercase text-gray-500">
            User Master
          </p>

          <Link
            to="/employment-types"
            className={menuItemStyle("/employment-types")}
          >
            <FiUserCheck size={18} /> Employment Types
          </Link>

          <Link
            to="/occupation-types"
            className={menuItemStyle("/occupation-types")}
          >
            <FiBriefcase size={18} /> Occupation Types
          </Link>
        </nav>
      </div>

      {/* LOGOUT */}
      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition"
        >
          <FiLogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
