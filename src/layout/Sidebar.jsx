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
} from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();

  const [openProductRevenue, setOpenProductRevenue] = useState(
    location.pathname.startsWith("/product") ||
      location.pathname.startsWith("/fees") ||
      location.pathname.startsWith("/charges") ||
      location.pathname.startsWith("/interest")
  );

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  const menuItemStyle = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all
     ${
       isActive(path)
         ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
         : "text-gray-700 hover:bg-gray-100"
     }`;

  // -------------------------
  // MENU CONFIG (FIXED)
  // -------------------------
  const menuItems = [
    { name: "Home", path: "/dashboard", icon: <FiHome size={18} /> },
    { name: "Organizations", path: "/organizations", icon: <FiGrid size={18} /> },
    { name: "Users", path: "/users", icon: <FiUsers size={18} /> },
    { name: "Roles", path: "/roles", icon: <FiKey size={18} /> },
    { name: "Subscription", path: "/subscriptions", icon: <FiCreditCard size={18} /> },
    { name: "Approval Master", path: "/approvals", icon: <FiCreditCard size={18} /> },
    { name: "Manage Approvals", path: "/manage-approvals", icon: <FiCreditCard size={18} /> },
    { name: "Escalation", path: "/escalation", icon: <FiCreditCard size={18} /> },

    // ===== SECTION =====
    { section: "Master Data & Governance" },

    { name: "Master Data Config", path: "/master-data", icon: <FiShield size={18} /> },

    {
      name: "Integration & API",
      path: "/integrations",
      icon: <FiLink size={18} />,
    },
    {
      name: "Audit & Security",
      path: "/audits",
      icon: <FiShield size={18} />,
    },
    {
      name: "Reports & Analytics",
      path: "/reports",
      icon: <FiBarChart2 size={18} />,
    },

    // ===== SECTION =====
    { section: "User Master" },

    {
      name: "Employment Types",
      path: "/employment-types",
      icon: <FiUserCheck size={18} />,
    },
    {
      name: "Occupation Types",
      path: "/occupation-types",
      icon: <FiBriefcase size={18} />,
    },
  ];
  const dropdownParentActive =
    location.pathname.startsWith("/product") ||
    location.pathname.startsWith("/fees") ||
    location.pathname.startsWith("/charges") ||
    location.pathname.startsWith("/interest");

  return (
    <div className="w-64 h-screen bg-white fixed left-0 top-0 flex flex-col justify-between border-r">
      <div>
        {/* Title */}
        <div className="p-6">
          <span className="text-xl font-semibold text-gray-900">
            Master Admin
          </span>
        </div>

        {/* MENU */}
        <nav className="px-3 space-y-1">
          {/* MAIN ITEMS */}
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
          <p className="text-xs text-gray-500 uppercase font-semibold mt-4 mb-2 px-3">
            Master Data & Governance
          </p>

          <Link to="/master-data" className={menuItemStyle("/master-data")}>
            <FiShield size={18} /> Master Data Config
          </Link>

          {/* ===== PRODUCT & REVENUE DROPDOWN ===== */}
          <button
            onClick={() => setOpenProductRevenue((p) => !p)}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all
              ${
                dropdownParentActive
                  ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
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

              <Link
                to="/interest/list"
                className={menuItemStyle("/interest")}
              >
                Interest Management
              </Link>
            </div>
          )}

          <Link to="/audits" className={menuItemStyle("/audits")}>
            <FiShield size={18} /> Audit & Security
          </Link>

          <Link to="/reports" className={menuItemStyle("/reports")}>
            <FiBarChart2 size={18} /> Reports & Analytics
          </Link>

          {/* SECTION */}
          <p className="text-xs text-gray-500 uppercase font-semibold mt-4 mb-2 px-3">
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
      <div className="p-4 border-t">
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
