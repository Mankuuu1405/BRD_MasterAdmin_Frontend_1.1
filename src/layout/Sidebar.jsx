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
  FiLink,
  FiChevronDown,
  FiChevronUp,
  FiLogOut,
  FiBox,
  FiCheckCircle,
  FiThumbsUp,
  FiLayers,
  FiClipboard,
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
      location.pathname.startsWith("/interest")
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

  /* ---------------- HELPERS ---------------- */
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  const menuItemStyle = (path) => `
    flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all
    ${
      isActive(path)
        ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
        : "text-gray-700 hover:bg-gray-100"
    }
  `;

  const dropdownParentActive =
    location.pathname.startsWith("/product") ||
    location.pathname.startsWith("/fees") ||
    location.pathname.startsWith("/charges") ||
    location.pathname.startsWith("/interest");

  /* ---------------- RENDER ---------------- */
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r flex flex-col justify-between overflow-y-scroll">
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

          <Link
            to="/subscriptions"
            className={menuItemStyle("/subscriptions")}
          >
            <FiCreditCard size={18} /> Subscription
          </Link>

          {/* SECTION */}
          <p className="mt-4 mb-2 px-3 text-xs font-semibold uppercase text-gray-500">
            Master Data & Governance
          </p>

          <Link to="/master-data" className={menuItemStyle("/master-data")}>
            <FiShield size={18} /> Master Data Config
          </Link>

          {/* APPROVAL MASTER */}
          <button
            onClick={() => setOpenApprovalMaster((p) => !p)}
            className={`
              flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all
              ${
                openApprovalMaster
                  ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            <span className="flex items-center gap-3">
              <FiThumbsUp size={18} />
              Approval Master
            </span>
            {openApprovalMaster ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openApprovalMaster && (
            <div className="ml-6 mt-1 space-y-1">
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
            className={`
              flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all
              ${
                dropdownParentActive
                  ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            <span className="flex items-center gap-3">
              <FiBox size={18} />
              Product & Revenue
            </span>
            {openProductRevenue ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openProductRevenue && (
            <div className="ml-6 mt-1 space-y-1">
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
            </div>
          )}

          {/* Eligibility & Score Management */}
          <button
            onClick={() => setEligibilityAndScore((p) => !p)}
            className={`
              flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all
              ${
                openEligibilityAndScore
                  ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            <span className="flex items-center gap-3">
              <FiClipboard size={18} />
              Eligibility & Score
            </span>
            {openEligibilityAndScore ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openEligibilityAndScore && (
            <div className="ml-6 mt-1 space-y-1">
              <Link to="/eligibility" className={menuItemStyle("/eligibility")}>
                Eligibility Management
              </Link>

              <Link
                to="/banking"
                className={menuItemStyle("/banking")}
              >
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

          {/* Template Management */}
          <button
            onClick={() => setTemplateManagement((p) => !p)}
            className={`
              flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all
              ${
                openTemplateManagement
                  ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            <span className="flex items-center gap-3">
              <FiClipboard size={18} />
              Template Management
            </span>
            {openTemplateManagement ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openTemplateManagement && (
            <div className="ml-6 mt-1 space-y-1">
              <Link to="/predefine-template" className={menuItemStyle("/predefine-template")}>
                Predefine Template
              </Link>

              <Link
                to="/customize-template"
                className={menuItemStyle("/customize")}
              >
                Customize Template
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
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
