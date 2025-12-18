import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Organization from "./pages/organization/Organization";
import AddOrganization from "./pages/organization/AddOrganization";
import OrganizationList from "./pages/organization/OrganizationList";
import BranchList from "./pages/organization/BranchList";
import UpdateBranch from "./pages/organization/UpdateBranch";
import CreateBranch from "./pages/organization/CreateBranch";
import EditOrganization from "./pages/organization/EditOrganization";

// import ProtectedRoute from "./components/ProtectedRoute"; // we will create this
import Users from "./pages/Users/Users";
import AddUser from "./pages/Users/AddUser";
import EditUser from "./pages/Users/EditUser";

import UserList from "./pages/Users/UserList";
// ROLE MANAGEMENT PAGES
import Roles from "./pages/roles/Roles";
import CreateRole from "./pages/roles/CreateRole";
import SetPermissions from "./pages/roles/SetPermissions";
import AssignPermissions from "./pages/roles/AssignPermissions";

import MasterData from "./pages/masterData/MasterData";
import LoanProduct from "./pages/masterData/LoanProducts";
import InterestSettings from "./pages/masterData/InterestSettings";
import DocumentTemplates from "./pages/masterData/DocumentTemplates";

import Notification from "./pages/notifications/Notifications";

import ReportingAnalytics from "./pages/Reports/ReportingAnalytics";
import DailyDisbursementReport from "./pages/Reports/DailyDisbursementReport";
import BranchPerformanceReport from "./pages/Reports/BranchPerformanceReport";
import LoanApprovalRejectionReport from "./pages/Reports/LoanApprovalRejectionReport";
import NpaReport from "./pages/Reports/NpaReport";
import RevenueReport from "./pages/Reports/RevenueReport";
import UserActivityReport from "./pages/Reports/UserActivityReport";
import AuditMain from "./pages/audit/AuditMain";
import ViewUserActions from "./pages/audit/ViewUserActions";
import TrackEditsDeletes from "./pages/audit/TrackEditsDeletes";
import ActivityTimeline from "./pages/audit/ActivityTimeline";
import TrackIpLogs from "./pages/audit/TrackIpLogs";
import BranchDataMonitor from "./pages/audit/BranchDataMonitor";
import ProfilePage from "./components/ProfilePage";
// import CouponPage from "./pages/subscription/CouponPage";
// import SubscribersPage from "./pages/subscription/SubscribersPage";
// import EmploymentTypePage from "./pages/subscription/EmploymentTypePage";
// import OccupationTypePage from "./pages/subscription/OccupationTypePage";
import SubscriptionHome from "./pages/subscription/SubscriptionHome";
import RoleList from "./pages/roles/RoleList";
import SubscriptionPage from "./pages/subscription/SubscriptionPage";
import AddSubscription from "./pages/subscription/AddSubscription";
import CouponPage from "./pages/subscription/CouponPage";
import AddCoupon from "./pages/subscription/AddCoupon";
import SubscribersPage from "./pages/subscription/SubscribersPage";
import EditSubscription from "./pages/subscription/EditSubscription";
import EditCoupon from "./pages/subscription/EditCoupon";
import EmploymentTypePage from "./pages/employement/EmploymentTypePage";
import AddEmploymentTypePage from "./pages/employement/AddEmploymentTypePage";
import EditEmploymentTypePage from "./pages/employement/EditEmploymentTypePage";
import ViewEmploymentTypePage from "./pages/employement/ViewEmploymentTypePage";
import AddOccupationTypePage from "./pages/occupation/AddOccupationTypePage";
import EditOccupationTypePage from "./pages/occupation/EditOccupationTypePage";
import OccupationTypePage from "./pages/occupation/OccupationTypePage";
import ViewOccupationTypePage from "./pages/occupation/ViewOccupationTypePage";
import RequireMasterAdmin from "./auth/RequireMasterAdmin";
import ProductList from "./pages/productManagement/product/ProductList";
import AddProduct from "./pages/productManagement/product/AddProduct";
import EditProduct from "./pages/productManagement/product/EditProduct";
import ProductMixList from "./pages/productManagement/productMixer/ProductMixList";
import AddProductMix from "./pages/productManagement/productMixer/AddProductMix";
import EditProductMix from "./pages/productManagement/productMixer/EditProductMix";
import FeeList from "./pages/productManagement/fees/FeeList";
import AddFees from "./pages/productManagement/fees/AddFees";
import EditFees from "./pages/productManagement/fees/EditFees";
import InterestList from "./pages/productManagement/interestManagement/InterestList";
import AddInterest from "./pages/productManagement/interestManagement/AddInterest";
import InterestDetail from "./pages/productManagement/interestManagement/InterestDetail";
import EditInterest from "./pages/productManagement/interestManagement/EditInterest";
import ChargeList from "./pages/productManagement/chargeManagement/ChargeList";
import AddCharge from "./pages/productManagement/chargeManagement/AddCharge";
import ChargeDetail from "./pages/productManagement/chargeManagement/ChargeDetail";
import EditCharge from "./pages/productManagement/chargeManagement/EditCharge";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* DEFAULT ROUTE → Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />  */}
        <Route
          path="/dashboard"
          element={
            <RequireMasterAdmin>
              <Dashboard />
            </RequireMasterAdmin>
          }
        />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organizations" element={<Organization />} />
        <Route path="/organizations/add" element={<AddOrganization />} />
        <Route
          path="/organizations/branches/create"
          element={<CreateBranch />}
        />
        <Route path="/organizations/list" element={<OrganizationList />} />
        <Route path="/organizations/edit/:id" element={<EditOrganization />} />

        <Route path="/organizations/branches/list" element={<BranchList />} />
        <Route
          path="/organizations/branches/update/:id"
          element={<UpdateBranch />}
        />
        <Route path="/organizations/branches/add" element={<CreateBranch />} />

        {/* <Route path="/users" element={<Users />} /> */}
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/edit/:id" element={<EditUser />} />

        <Route path="/roles" element={<Roles />} />
        <Route path="/roles/list" element={<RoleList />} />
        <Route path="/roles/create" element={<CreateRole />} />
        <Route path="/roles/set-permissions" element={<SetPermissions />} />
        <Route
          path="/roles/assign-permissions"
          element={<AssignPermissions />}
        />

        <Route path="/reports" element={<ReportingAnalytics />} />
        <Route
          path="/reports/daily-disbursement"
          element={<DailyDisbursementReport />}
        />
        <Route
          path="/reports/branch-performance"
          element={<BranchPerformanceReport />}
        />
        <Route
          path="/reports/loan-approval-rejection"
          element={<LoanApprovalRejectionReport />}
        />
        <Route path="/reports/npa-report" element={<NpaReport />} />
        <Route path="/reports/revenue-report" element={<RevenueReport />} />
        <Route
          path="/reports/user-activity-report"
          element={<UserActivityReport />}
        />

        <Route path="/audits" element={<AuditMain />} />
        <Route path="/audits/user-actions" element={<ViewUserActions />} />
        <Route path="/audits/user-actions" element={<ViewUserActions />} />
        <Route path="/audits/edits-deletes" element={<TrackEditsDeletes />} />
        <Route path="/audits/timestamps" element={<ActivityTimeline />} />
        <Route path="/audits/ip-logs" element={<TrackIpLogs />} />
        <Route path="/audits/branch-data" element={<BranchDataMonitor />} />

        <Route path="/subscriptions" element={<SubscriptionHome />} />
        <Route path="/subscriptions/list" element={<SubscriptionPage />} />
        <Route path="/subscriptions/add" element={<AddSubscription />} />
        <Route
          path="/subscriptions/edit/:uuid"
          element={<EditSubscription />}
        />

        <Route path="/coupons" element={<CouponPage />} />
        <Route path="/coupons/add" element={<AddCoupon />} />
        <Route path="/coupons/edit/:uuid" element={<EditCoupon />} />

        <Route path="/subscribers" element={<SubscribersPage />} />

        <Route path="/employment-types" element={<EmploymentTypePage />} />
        <Route
          path="/employment-types/add"
          element={<AddEmploymentTypePage />}
        />
        <Route
          path="/employment-types/edit/:uuid"
          element={<EditEmploymentTypePage />}
        />
        <Route
          path="/employment-types/view/:uuid"
          element={<ViewEmploymentTypePage />}
        />

        <Route path="/occupation-types" element={<OccupationTypePage />} />
        <Route
          path="/occupation-types/add"
          element={<AddOccupationTypePage />}
        />
        <Route
          path="/occupation-types/edit/:uuid"
          element={<EditOccupationTypePage />}
        />
        <Route
          path="/occupation-types/view/:uuid"
          element={<ViewOccupationTypePage />}
        />

        <Route path="/master-data" element={<MasterData />} />
        <Route path="/master-data/loan-products" element={<LoanProduct />} />
        <Route
          path="/master-data/interest-setting"
          element={<InterestSettings />}
        />
        <Route
          path="/master-data/document-template"
          element={<DocumentTemplates />}
        />

        <Route path="/document" element={<Notification />} />
        <Route path="/product-management/list" element={<ProductList />} />
        <Route path="/product-management/add" element={<AddProduct />} />
        <Route path="/product-management/:id/edit" element={<EditProduct />} />

        <Route path="/product-mix/list" element={<ProductMixList />} />
        <Route path="/product-mix/add" element={<AddProductMix />} />
        <Route path="/product-mix/:id/edit" element={<EditProductMix />} />

        <Route path="/fees/list" element={<FeeList />} />
        <Route path="/fees/add" element={<AddFees />} />
        <Route path="/fees/:id/edit" element={<EditFees />} />

        <Route path="/interest/list" element={<InterestList />} />
        <Route path="/interest/add" element={<AddInterest />} />
        <Route path="/interest/:id" element={<InterestDetail />} />
        <Route path="/interest/:id/edit" element={<EditInterest />} />

        <Route path="/charges/list" element={<ChargeList />} />
        <Route path="/charges/add" element={<AddCharge />} />
        <Route path="/charges/:id" element={<ChargeDetail />} />
        <Route path="/charges/:id/edit" element={<EditCharge />} />



      </Routes>
    </Router>
  );
}

export default App;
