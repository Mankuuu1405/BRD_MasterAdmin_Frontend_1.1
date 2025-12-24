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

// import IntegrationManagament from "./pages/integration/IntegrationManagement";

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

import ApprovalPage from "./pages/approvalMaster/ApprovalPage";
import AddApproval from "./pages/approvalMaster/AddApproval";
import EditApproval from "./pages/approvalMaster/EditApproval";
import { ManageApprovalPage } from "./pages/approvalMaster/ManageApprovalPage";
import { EscalationPage } from "./pages/approvalMaster/EscalationPage";

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
import ApprovalView from "./pages/approvalMaster/ApprovalView";
import EligibilityList from "./pages/Eligibilty&ScoreManagement/EligibilityManagement/EligibilityList";
import EligibilityView from "./pages/Eligibilty&ScoreManagement/EligibilityManagement/EligibilityView";
import EligibilityForm from "./pages/Eligibilty&ScoreManagement/EligibilityManagement/EligibilityForm";
import BankingList from "./pages/Eligibilty&ScoreManagement/BankingManagement/BankingList";
import BankingView from "./pages/Eligibilty&ScoreManagement/BankingManagement/BankingView";
import BankingForm from "./pages/Eligibilty&ScoreManagement/BankingManagement/BankingForm";
import ExistingObligationList from "./pages/Eligibilty&ScoreManagement/ExistingObligationManagement/ExistingObligationList";
import ExistingObligationView from "./pages/Eligibilty&ScoreManagement/ExistingObligationManagement/ExistingObligationView";
import ExistingObligationForm from "./pages/Eligibilty&ScoreManagement/ExistingObligationManagement/ExistingObligationForm";
import ScoreCardList from "./pages/Eligibilty&ScoreManagement/ScoreCardManagement/ScoreCardList";
import ScoreCardView from "./pages/Eligibilty&ScoreManagement/ScoreCardManagement/ScoreCardView";
import ScoreCardForm from "./pages/Eligibilty&ScoreManagement/ScoreCardManagement/ScoreCardForm";
import AddTemplate from "./pages/templateManagement/predefineTemplate/AddTemplate";
import ViewTemplate from "./pages/templateManagement/predefineTemplate/ViewTemplate";
import EditTemplate from "./pages/templateManagement/predefineTemplate/EditTemplate";
import PredefinedTemplateList from "./pages/templateManagement/predefineTemplate/PredefinedTemplateList";
import CustomizeTemplateList from "./pages/templateManagement/customizeTemplate/CustomizeTemplateList";
import CustomizeTemplateView from "./pages/templateManagement/customizeTemplate/CustomizeTemplateView";
import CustomizeTemplateEdit from "./pages/templateManagement/customizeTemplate/CustomizeTemplateEdit";
import RepaymentList from "./pages/productManagement/repaymentManagement/RepaymentList";
import AddRepayment from "./pages/productManagement/repaymentManagement/AddRepayment";
import RepaymentDetail from "./pages/productManagement/repaymentManagement/RepaymentDetail";
import EditRepayment from "./pages/productManagement/repaymentManagement/EditRepayment";

import MoratoriumList from "./pages/productManagement/moratiumManagment/MoratoriumList";
import AddMoratorium from "./pages/productManagement/moratiumManagment/AddMoratorium";
import MoratoriumDetail from "./pages/productManagement/moratiumManagment/MoratoriumDetail";
import EditMoratorium from "./pages/productManagement/moratiumManagment/EditMoratorium";
import PenaltyList from "./pages/productManagement/penaltyManagement/PenaltyList";
import AddPenalty from "./pages/productManagement/penaltyManagement/AddPenalty";
import PenaltyDetail from "./pages/productManagement/penaltyManagement/PenaltyDetail";
import EditPenalty from "./pages/productManagement/penaltyManagement/EditPenalty";

import LoanImprovementList from "./pages/loanImproveManagement/LoanImprovementList";
import LoanImprovementDashboard from "./pages/loanImproveManagement/LoanImprovementDashboard";
import ChangeInterestRate from "./pages/loanImproveManagement/ChangeInterestRate";
import ChangeRepaymentPeriod from "./pages/loanImproveManagement/ChangeRepaymentPeriod";
import ChangeRepaymentAmount from "./pages/loanImproveManagement/ChangeRepaymentAmount";
import ChangeLoanProduct from "./pages/loanImproveManagement/ChangeLoanProduct";
import ChangeFeesCharges from "./pages/loanImproveManagement/ChangeFeesCharges";
import ChangeCollateral from "./pages/loanImproveManagement/ChangeCollateral";
import RepaymentRationalisation from "./pages/loanImproveManagement/RepaymentRationalisation";
import MoratoriumInterest from "./pages/loanImproveManagement/MoratoriumInterest";
import TopUpManagement from "./pages/loanImproveManagement/TopUpManagement";

import SanctionDocumentList from "./pages/documentManagement/sanctions/SanctionDocumentList";
import AddSanctionDocument from "./pages/documentManagement/sanctions/AddSanctionDocument";
import EditSanctionDocument from "./pages/documentManagement/sanctions/EditSanctionDocument";
import ViewSanctionDocument from "./pages/documentManagement/sanctions/ViewSanctionDocument";
import LoanDocumentList from "./pages/documentManagement/loanDocuments/LoanDocumentList";
import AddLoanDocument from "./pages/documentManagement/loanDocuments/AddLoanDocument";
import EditLoanDocument from "./pages/documentManagement/loanDocuments/EditLoanDocument";
import ViewLoanDocument from "./pages/documentManagement/loanDocuments/ViewLoanDocument";

import AddCollateralDocument from "./pages/documentManagement/collateralDocuments/AddCollateralDocument";
import EditCollateralDocument from "./pages/documentManagement/collateralDocuments/EditCollateralDocument";
import ViewCollateralDocument from "./pages/documentManagement/collateralDocuments/ViewCollateralDocument";
import CollateralDocumentList from "./pages/documentManagement/collateralDocuments/CollateralDocumentList";
import RiskList from "./pages/risk-Management/risk-master/RiskList";
import BankManagement from "./pages/bank-funds/BankManagement";
import FundManagement from "./pages/bank-funds/FundManagement";
import PortfolioManagement from "./pages/bank-funds/PortfolioManagement";
import ModeOfBank from "./pages/bank-funds/ModeOfBank";
import TaxationManagement from "./pages/bank-funds/TaxationManagement";
import BusinessModel from "./pages/bank-funds/BusinessModel";
import EditBank from "./pages/bank-funds/EditBank";
import AddFund from "./pages/bank-funds/AddFund";
import EditFund from "./pages/bank-funds/EditFund";
import ViewFund from "./pages/bank-funds/ViewFund";
import FundAllocationRules from "./pages/bank-funds/FundAllocationRule";
import AddPortfolio from "./pages/bank-funds/AddPortfolio";
import EditPortfolio from "./pages/bank-funds/EditPortfolio";
import ViewPortfolio from "./pages/bank-funds/ViewPortfolio";
import PortfolioBankMatrix from "./pages/bank-funds/PortfolioBankMatrix";
import PortfolioAllocationRules from "./pages/bank-funds/PortfolioAllocationRule";
import ModeFormPage from "./pages/bank-funds/ModeFormPage";
import ModeViewPage from "./pages/bank-funds/ModeViewPage";
import TaxFormPage from "./pages/bank-funds/TaxFormPage";
import TaxViewPage from "./pages/bank-funds/TaxViewPage";
import BusinessModelFormPage from "./pages/bank-funds/BusinessModelFormPage";
import BusinessModelViewPage from "./pages/bank-funds/BusinessModelViewPage";
import VendorList from "./pages/profile-management/vendor/VendorList";
import VendorView from "./pages/profile-management/vendor/VendorView";
import VendorMasterEdit from "./pages/profile-management/vendor/VendorMasterEdit";
import AgentList from "./pages/profile-management/agent/AgentList";
import AgentView from "./pages/profile-management/agent/AgentView";
import AgentMasterEdit from "./pages/profile-management/agent/AgentMasterEdit";
import ClientList from "./pages/profile-management/client/ClientList";
import ClientView from "./pages/profile-management/client/ClientView";
import ClientMasterEdit from "./pages/profile-management/client/ClientMasterEdit";
import VendorAdd from "./pages/profile-management/vendor/VendorAdd";
import AgentAdd from "./pages/profile-management/agent/AgentAdd";
import ClientAdd from "./pages/profile-management/client/ClientAdd";
import ChannelPartnerList from "./pages/agent-management/ChannelPartner/ChannelPartnerList";
import ChannelPartnerView from "./pages/agent-management/ChannelPartner/ChannelPartnerView";
import AddEditAgent from "./pages/agent-management/ChannelPartner/AddEditAgent";
import UpdatePayout from "./pages/agent-management/ChannelPartner/UpdatePayout";
import UpdateRecovery from "./pages/agent-management/ChannelPartner/UpdateRecovery";
import AgentPerformance from "./pages/agent-management/ChannelPartner/AgentPerformance";
import ManageTenants from "./pages/agent-management/ChannelPartner/ManageTenants";
import PromotionalOffers from "./pages/agent-management/ChannelPartner/PromotionalOffers";
import PerformanceTemplate from "./pages/agent-management/ChannelPartner/PerformanceTemplate";
import CollectionAgentList from "./pages/agent-management/CollectionAgent/CollectionAgentList";
import CollectionAgentView from "./pages/agent-management/CollectionAgent/CollectionAgentView";
import CollectionAgentForm from "./pages/agent-management/CollectionAgent/CollectionAgentForm";
import LegalAgentForm from "./pages/agent-management/CollectionAgent/LegalAgentForm";
import UpdateAgent from "./pages/agent-management/CollectionAgent/UpdateAgent";
import ManageFees from "./pages/agent-management/CollectionAgent/ManageFees";
import AddRisk from "./pages/risk-Management/risk-master/AddRisk";
import EditRisk from "./pages/risk-Management/risk-master/EditRisk";
import ViewRisk from "./pages/risk-Management/risk-master/ViewRisk";
import MitigationList from "./pages/risk-Management/mitigation/MitigationList";
import AddMitigation from "./pages/risk-Management/mitigation/AddMitigation";
import ViewMitigation from "./pages/risk-Management/mitigation/ViewMitigation";
import EditMitigation from "./pages/risk-Management/mitigation/EditMitigation";

import DeviationList from "./pages/risk-Management/deviation/DeviationList";
import AddDeviation from "./pages/risk-Management/deviation/AddDeviation";
import ViewDeviation from "./pages/risk-Management/deviation/ViewDeviation";
import EditDeviation from "./pages/risk-Management/deviation/EditDeviation";

import RCUList from "./pages/risk-Management/rcu/RCUList";
import ViewRCU from "./pages/risk-Management/rcu/ViewRCU";
import EditRCU from "./pages/risk-Management/rcu/EditRCU";
import AddRCU from "./pages/risk-Management/rcu/AddRCU";

import FraudList from "./pages/risk-Management/fraud/FraudList";
import AddFraud from "./pages/risk-Management/fraud/AddFraud";
import ViewFraud from "./pages/risk-Management/fraud/ViewFraud";
import EditFraud from "./pages/risk-Management/fraud/EditFraud";

import PortfolioLimitList from "./pages/risk-Management/portfolio-limits/PortfolioLimitList";
import AddPortfolioLimit from "./pages/risk-Management/portfolio-limits/AddPortfolioLimit";
import EditPortfolioLimit from "./pages/risk-Management/portfolio-limits/EditPortfolioLimit";
import ViewPortfolioLimit from "./pages/risk-Management/portfolio-limits/ViewPortfolioLimit";

import DefaultLimitList from "./pages/risk-Management/default-limits/DefaultLimitList";
import AddDefaultLimit from "./pages/risk-Management/default-limits/AddDefaultLimit";
import EditDefaultLimit from "./pages/risk-Management/default-limits/EditDefaultLimit";
import ViewDefaultLimit from "./pages/risk-Management/default-limits/ViewDefaultLimit";

import OtherList from "./pages/risk-Management/others/OtherList";
import AddOther from "./pages/risk-Management/others/AddOther";
import EditOther from "./pages/risk-Management/others/EditOther";
import ViewOther from "./pages/risk-Management/others/ViewOther";

import CollectionManagement from "./pages/collection-management/CollectionManagement";
import PaymentGatewayList from "./pages/collection-management/payment-gateways/PaymentGatewayList";
import EditPaymentGateway from "./pages/collection-management/payment-gateways/EditPaymentGateway";
import AddPaymentGateway from "./pages/collection-management/payment-gateways/AddPaymentGateway";
import CollectionControl from "./pages/collection-management/CollectionControl";
import MapClientTeam from "./pages/collection-management/MapClientTeam";
import MapClientAgent from "./pages/collection-management/MapClientAgent";
import PayoutManagement from "./pages/collection-management/PayoutManagement";
import LegalAgentList from "./pages/agent-management/CollectionAgent/LegalAgentList";
import LegalAgentView from "./pages/agent-management/CollectionAgent/LegalAgentView";






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
        <Route path="/approvals" element={<ApprovalPage />} />
        <Route path="/approvals/add" element={<AddApproval />} />
        <Route path="/approvals/edit/:id" element={<EditApproval />} />
        <Route path="/approvals/view/:id" element={<ApprovalView />} />
        <Route path="/eligibility" element={<EligibilityList />} />
        <Route path="/eligibility/view/:id" element={<EligibilityView />} />
        <Route path="/eligibility/add" element={<EligibilityForm />} />
        <Route path="/eligibility/edit/:id" element={<EligibilityForm />} />
        <Route path="/banking" element={<BankingList />} />
        <Route path="/banking/view/:id" element={<BankingView />} />
        <Route path="/banking/add" element={<BankingForm />} />
        <Route path="/banking/edit/:id" element={<BankingForm />} />
        <Route path="/obligation" element={<ExistingObligationList />} />
        <Route
          path="/obligation/view/:id"
          element={<ExistingObligationView />}
        />
        <Route path="/obligation/add" element={<ExistingObligationForm />} />
        <Route
          path="/obligation/edit/:id"
          element={<ExistingObligationForm />}
        />
        <Route path="/score-card" element={<ScoreCardList />} />
        <Route path="/score-card/view/:id" element={<ScoreCardView />} />
        <Route path="/score-card/add" element={<ScoreCardForm />} />
        <Route path="/score-card/edit/:id" element={<ScoreCardForm />} />
        <Route
          path="/predefine-template"
          element={<PredefinedTemplateList />}
        />
        <Route path="/predefine-template/view/:id" element={<ViewTemplate />} />
        <Route path="/predefine-template/add" element={<AddTemplate />} />
        <Route path="/predefine-template/edit/:id" element={<EditTemplate />} />
        <Route path="/customize-template" element={<CustomizeTemplateList />} />
        <Route
          path="/customize-template/view/:id"
          element={<CustomizeTemplateView />}
        />
        <Route
          path="/customize-template/edit/:id"
          element={<CustomizeTemplateEdit />}
        />
        <Route path="/manage-approvals" element={<ManageApprovalPage />} />
        <Route path="/escalation" element={<EscalationPage />} />
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



        {/* <Route path="/integrations/payment-gateway" element={<IntegrationManagament />} />
           <Route path="/integrations/credit-bureau" element={<ManageCreditBureau />} />
           <Route path="/integrations/sms-email-api" element={<ManageSmsEmailApi />} />
           <Route path="/integrations/accounting-erp" element={<ManageCrm />} />
           <Route path="/integrations/crm" element={<ManagePaymentGateway />} />
           <Route path="/integrations/api-keys" element={<AddApiKeys />} />
           <Route path="/integrations/endpoints" element={<SetEndpoints />} />
           <Route path="/integrations/monitor-status" element={<MonitorStatus />} />
           <Route path="/integrations/test-connections" element={<TestConnections />} />  */}
        <Route path="/document" element={<Notification />} />
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
        <Route path="/repayment/list" element={<RepaymentList />} />
        <Route path="/repayment/add" element={<AddRepayment />} />
        <Route path="/repayment/:id" element={<RepaymentDetail />} />
        <Route path="/repayment/:id/edit" element={<EditRepayment />} />
        <Route path="/moratorium" element={<MoratoriumList />} />
        <Route path="/moratorium/add" element={<AddMoratorium />} />
        <Route path="/moratorium/:id" element={<MoratoriumDetail />} />
        <Route path="/moratorium/:id/edit" element={<EditMoratorium />} />
        <Route path="/penalties" element={<PenaltyList />} />
        <Route path="/penalties/add" element={<AddPenalty />} />
        <Route path="/penalties/:id" element={<PenaltyDetail />} />
        <Route path="/penalties/:id/edit" element={<EditPenalty />} />
        <Route path="/loan-improvement" element={<LoanImprovementList />} />
        <Route
          path="/loan-improvement/:loanId"
          element={<LoanImprovementDashboard />}
        />
        <Route
          path="/loan-improvement/:loanId"
          element={<LoanImprovementDashboard />}
        />
        <Route
          path="/loan-improvement/:loanId/interest-rate"
          element={<ChangeInterestRate />}
        />
        <Route
          path="/loan-improvement/:loanId/tenure"
          element={<ChangeRepaymentPeriod />}
        />
        <Route
          path="/loan-improvement/:loanId/emi"
          element={<ChangeRepaymentAmount />}
        />
        <Route
          path="/loan-improvement/:loanId/product"
          element={<ChangeLoanProduct />}
        />
        <Route
          path="/loan-improvement/:loanId/fees"
          element={<ChangeFeesCharges />}
        />
        <Route
          path="/loan-improvement/:loanId/collateral"
          element={<ChangeCollateral />}
        />
        <Route
          path="/loan-improvement/:loanId/rationalisation"
          element={<RepaymentRationalisation />}
        />
        <Route
          path="/loan-improvement/:loanId/moratorium"
          element={<MoratoriumInterest />}
        />
        <Route
          path="/loan-improvement/:loanId/top-up"
          element={<TopUpManagement />}
        />
        /* ================= DOCUMENT MANAGEMENT ================= */ //
        Sanction Documents
        <Route path="/documents/sanction" element={<SanctionDocumentList />} />
        <Route
          path="/documents/sanction/add"
          element={<AddSanctionDocument />}
        />
        <Route
          path="/documents/sanction/:id/edit"
          element={<EditSanctionDocument />}
        />
        <Route
          path="/documents/sanction/:id"
          element={<ViewSanctionDocument />}
        />
        // Loan Documents
        <Route path="/documents/loan" element={<LoanDocumentList />} />
        <Route path="/documents/loan/add" element={<AddLoanDocument />} />
        <Route path="/documents/loan/:id/edit" element={<EditLoanDocument />} />
        <Route path="/documents/loan/:id" element={<ViewLoanDocument />} />
        // Collateral Documents
        <Route
          path="/documents/collateral"
          element={<CollateralDocumentList />}
        />
        <Route
          path="/documents/collateral/add"
          element={<AddCollateralDocument />}
        />
        <Route
          path="/documents/collateral/:id/edit"
          element={<EditCollateralDocument />}
        />
        <Route
          path="/documents/collateral/:id"
          element={<ViewCollateralDocument />}
        />

        <Route
          path="/risk-management/risks"
          element={<RiskList />}
        />

        {/* Agent Management -> Channel Partners */}
        <Route path="/channel-partners" element={<ChannelPartnerList />} />
        <Route path="/channel-partners/add" element={<AddEditAgent />} />
        <Route path="/channel-partners/edit/:id" element={<AddEditAgent />} />
        <Route path="/channel-partners/view/:id" element={<ChannelPartnerView />} />
        <Route path="/channel-partners/payout/:id" element={<UpdatePayout />} />
        <Route path="/channel-partners/recovery/:id" element={<UpdateRecovery />} />
        <Route path="/channel-partners/performance/:id" element={<AgentPerformance />} />
        <Route path="/channel-partners/tenants/:id" element={<ManageTenants />} />

        {/* Agent Management -> Collection Agent Management */}
        <Route path="/collection-agent" element={<CollectionAgentList />} />
        <Route path="/collection-agent/add" element={<CollectionAgentForm />} />
        <Route path="/collection-agent/edit/:id" element={<CollectionAgentForm />} />
        <Route path="/collection-agent/view/:id" element={<CollectionAgentView />} />
        <Route path="/collection-agent/update/:id" element={<UpdateAgent />} />
        <Route path="/collection-agent/fees/:id" element={<ManageFees />} />
        <Route path="/legal-agent" element={<LegalAgentList />} />
        <Route path="/legal-agents/edit/:id" element={<LegalAgentForm />} />
        <Route path="/legal-agents/view/:id" element={<LegalAgentView />} />
        <Route path="/legal-agents/add" element={<LegalAgentForm />} />

      </Routes>


    </Router>
  );
}

export default App;
