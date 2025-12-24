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
import VerificationAgencyList from "./pages/agent-management/VerificationAgency/VerificationAgencyList";
import VerificationAgencyForm from "./pages/agent-management/VerificationAgency/VerificationAgencyForm";
import VerificationAgencyView from "./pages/agent-management/VerificationAgency/VerificationAgencyView";
import ManageVerificationFees from "./pages/agent-management/VerificationAgency/ManageVerificationFees";
import LanguageList from "./pages/ControlsManagement/ManageLanguage/LanguageList";
import LanguageAdd from "./pages/ControlsManagement/ManageLanguage/AddLanguage";
import LanguageEdit from "./pages/ControlsManagement/ManageLanguage/EditLanguage";
import LanguageView from "./pages/ControlsManagement/ManageLanguage/ViewLanguage";
import CountryList from "./pages/ControlsManagement/ManageGeoLocation/CountryList";
import AddCountry from "./pages/ControlsManagement/ManageGeoLocation/AddCountry";
import EditCountry from "./pages/ControlsManagement/ManageGeoLocation/EditCountry";
import StateList from "./pages/ControlsManagement/ManageGeoLocation/StateList";
import AddState from "./pages/ControlsManagement/ManageGeoLocation/AddState";
import EditState from "./pages/ControlsManagement/ManageGeoLocation/EditState";
import CityList from "./pages/ControlsManagement/ManageGeoLocation/CityList";
import AddCity from "./pages/ControlsManagement/ManageGeoLocation/AddCity";
import EditCity from "./pages/ControlsManagement/ManageGeoLocation/EditCity";
import AreaList from "./pages/ControlsManagement/ManageGeoLocation/AreaList";
import AddArea from "./pages/ControlsManagement/ManageGeoLocation/AddArea";
import EditArea from "./pages/ControlsManagement/ManageGeoLocation/EditArea";
import LoginAuthList from "./pages/ControlsManagement/ManageLoginAuthentication/LoginAuthList";
import AddLoginAuth from "./pages/ControlsManagement/ManageLoginAuthentication/AddLoginAuth";
import EditLoginAuth from "./pages/ControlsManagement/ManageLoginAuthentication/EditLoginAuth";
import ViewLoginAuth from "./pages/ControlsManagement/ManageLoginAuthentication/ViewLoginAuth";
import CoApplicantList from "./pages/ControlsManagement/ManageCoApplicant/CoApplicantList";
import AddCoApplicant from "./pages/ControlsManagement/ManageCoApplicant/AddCoApplicant";
import EditCoApplicant from "./pages/ControlsManagement/ManageCoApplicant/EditCoApplicant";
import ViewCoApplicant from "./pages/ControlsManagement/ManageCoApplicant/ViewCoApplicant";
import LoginFeeList from "./pages/ControlsManagement/ManageLoginFees/LoginFeeList";
import AddLoginFee from "./pages/ControlsManagement/ManageLoginFees/AddLoginFee";
import EditLoginFee from "./pages/ControlsManagement/ManageLoginFees/EditLoginFee";
import ViewLoginFee from "./pages/ControlsManagement/ManageLoginFees/ViewLoginFee";
import JointApplicantList from "./pages/ControlsManagement/ManageJointApplicant/JointApplicantList";
import AddJointApplicant from "./pages/ControlsManagement/ManageJointApplicant/AddJointApplicant";
import EditJointApplicant from "./pages/ControlsManagement/ManageJointApplicant/EditJointApplicant";
import ViewJointApplicant from "./pages/ControlsManagement/ManageJointApplicant/ViewJointApplicant";
import ReferenceList from "./pages/ControlsManagement/ManageReferences/ReferenceList";
import AddReference from "./pages/ControlsManagement/ManageReferences/AddReference";
import EditReference from "./pages/ControlsManagement/ManageReferences/EditReference";
import ViewReference from "./pages/ControlsManagement/ManageReferences/ViewReference";
import ApplicationProcessList from "./pages/ControlsManagement/ManageApplicationProcess/ApplicationProcessList";
import UpdateProcessingMode from "./pages/ControlsManagement/ManageApplicationProcess/UpdateProcessingMode";
import UpdateApplication from "./pages/ControlsManagement/ManageApplicationProcess/UpdateApplication";
import ApplicationSettings from "./pages/ControlsManagement/ManageApplicationProcess/ApplicationSettings";
import UpdateActionType from "./pages/ControlsManagement/ManageApplicationProcess/UpdateActionType";
import ReferenceCheckList from "./pages/ControlsManagement/ManageScoreCardRating/ReferenceCheck/ReferenceCheckList";
import AddReferenceCheck from "./pages/ControlsManagement/ManageScoreCardRating/ReferenceCheck/AddReferenceCheck";
import EditReferenceCheck from "./pages/ControlsManagement/ManageScoreCardRating/ReferenceCheck/EditReferenceCheck";
import ScoreCardRatingHome from "./pages/ControlsManagement/ManageScoreCardRating/ScoreCardRatingHome";
import CreditHistoryList from "./pages/ControlsManagement/ManageScoreCardRating/CreditHistory/CreditHistoryList";
import AddCreditHistory from "./pages/ControlsManagement/ManageScoreCardRating/CreditHistory/AddCreditHistory";
import EditCreditHistory from "./pages/ControlsManagement/ManageScoreCardRating/CreditHistory/EditCreditHistory";
import AddInvestigationReport from "./pages/ControlsManagement/ManageScoreCardRating/InvastigationReport/AddInvestigationReport";
import EditInvestigationReport from "./pages/ControlsManagement/ManageScoreCardRating/InvastigationReport/EditInvestigationReport";
import InvestigationReportList from "./pages/ControlsManagement/ManageScoreCardRating/InvastigationReport/InvestigationReportList";
import TeleVerificationList from "./pages/ControlsManagement/ManageVerification/TeleVerification/TeleVerificationList";
import MeetingList from "./pages/ControlsManagement/ManageVerification/CreditPersonalMeetings/MeetingList";
import VerificationHome from "./pages/ControlsManagement/ManageVerification/VerificationHome";
import AddTeleVerification from "./pages/ControlsManagement/ManageVerification/TeleVerification/AddTeleVerification";
import EditTeleVerification from "./pages/ControlsManagement/ManageVerification/TeleVerification/EditTeleVerification";
import ViewTeleVerification from "./pages/ControlsManagement/ManageVerification/TeleVerification/ViewTeleVerification";
import AddMeeting from "./pages/ControlsManagement/ManageVerification/CreditPersonalMeetings/AddMeeting";
import EditMeeting from "./pages/ControlsManagement/ManageVerification/CreditPersonalMeetings/EditMeeting";
import ViewMeeting from "./pages/ControlsManagement/ManageVerification/CreditPersonalMeetings/ViewMeeting";
import DisbursementList from "./pages/disbursment-management/disbursement/DisbursementList";
import DisbursementForm from "./pages/disbursment-management/disbursement/DisbursementForm";
import DisbursementDetail from "./pages/disbursment-management/disbursement/DisbursementDetail";
import AgencyList from "./pages/disbursment-management/agency/AgencyList";
import AgencyDetail from "./pages/disbursment-management/agency/AgencyDetail";
import AgencyForm from "./pages/disbursment-management/agency/AgencyForm";  
import DocumentDetail from "./pages/disbursment-management/document/DocumentDetail";
import DocumentList from "./pages/disbursment-management/document/DocumentList";
import DocumentForm from "./pages/disbursment-management/document/DocumentForm";
import DownPaymentDetail from "./pages/disbursment-management/downPayment/DownPaymentDetail";
import DownPaymentList from "./pages/disbursment-management/downPayment/DownPaymentList";
import DownPaymentForm from "./pages/disbursment-management/downPayment/DownPaymentForm";
import FrequencyForm from "./pages/disbursment-management/frequency/FrequencyForm";
import FrequencyList from "./pages/disbursment-management/frequency/FrequencyList";
import FrequencyDetail from "./pages/disbursment-management/frequency/FrequencyDetail";
import ThirdPartyDetail from "./pages/disbursment-management/third-party/ThirdPartyDetail";
import ThirdPartyList from "./pages/disbursment-management/third-party/ThirdPartyList";
import ThirdPartyForm from "./pages/disbursment-management/third-party/ThirdPartyForm";
import StageMasterDetail from "./pages/disbursment-management/stage/StageMasterDetail";
import StageMasterList from "./pages/disbursment-management/stage/StageMasterList";
import StageMasterForm from "./pages/disbursment-management/stage/StageMasterForm";

import ClassificationForm from "./pages/provisioning-classification/loan-classification/ClassificationForm";
import ClassificationList from "./pages/provisioning-classification/loan-classification/ClassificationList";
import ClassificationManage from "./pages/provisioning-classification/loan-classification/ClassificationManage";
import ClassificationUpdate from "./pages/provisioning-classification/loan-classification/ClassificationUpdate";

import ProvisioningRuleList from "./pages/provisioning-classification/provisioning-npa/ProvisioningRuleList";
import ProvisioningRuleForm from "./pages/provisioning-classification/provisioning-npa/ProvisioningRuleForm";
import ProvisioningManagerForm from "./pages/provisioning-classification/provisioning-npa/ProvisioningManagerForm";

import SettlementManage from "./pages/provisioning-classification/settlement/SettlementManage";
import SettlementUpdate from "./pages/provisioning-classification/settlement/SettlementUpdate";
import SettlementRuleForm from "./pages/provisioning-classification/settlement/SettlementRuleForm";
import SettlementRuleList from "./pages/provisioning-classification/settlement/SettlementRuleList";

import WriteoffManage from "./pages/provisioning-classification/writeoff-settlement/WriteoffManage";
import WriteoffUpdate from "./pages/provisioning-classification/writeoff-settlement/WriteoffUpdate";
import WriteoffRuleForm from "./pages/provisioning-classification/writeoff-settlement/WriteoffRuleForm";
import WriteoffRuleList from "./pages/provisioning-classification/writeoff-settlement/WriteoffRuleList";

import IncentiveRuleForm from "./pages/provisioning-classification/incentive-management/IncentiveRuleForm";
import IncentiveRuleList from "./pages/provisioning-classification/incentive-management/IncentiveRuleList";








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
        {/* ================= RISK MANAGEMENT ================= */}
        /* ---------- Risk Master ---------- */
        <Route path="/risk-management/risks" element={<RiskList />} />
        <Route path="/risk-management/risks/add" element={<AddRisk />} />
        <Route path="/risk-management/risks/:id/view" element={<ViewRisk />} />
        <Route path="/risk-management/risks/:id/edit" element={<EditRisk />} />
        /* ---------- Risk Mitigation ---------- */
        <Route
          path="/risk-management/mitigation"
          element={<MitigationList />}
        />
        <Route
          path="/risk-management/mitigation/add"
          element={<AddMitigation />}
        />
        <Route
          path="/risk-management/mitigation/:id/view"
          element={<ViewMitigation />}
        />
        <Route
          path="/risk-management/mitigation/:id/edit"
          element={<EditMitigation />}
        />
        /* ---------- Deviation Management ---------- */
        <Route path="/risk-management/deviations" element={<DeviationList />} />
        <Route
          path="/risk-management/deviations/add"
          element={<AddDeviation />}
        />
        <Route
          path="/risk-management/deviations/:id/view"
          element={<ViewDeviation />}
        />
        <Route
          path="/risk-management/deviations/:id/edit"
          element={<EditDeviation />}
        />
        /* ---------- RCU ---------- */
        <Route path="/risk-management/rcu" element={<RCUList />} />
        <Route path="/risk-management/rcu/add" element={<AddRCU />} />
        <Route path="/risk-management/rcu/:id/view" element={<ViewRCU />} />
        <Route path="/risk-management/rcu/:id/edit" element={<EditRCU />} />
        /* ---------- Fraud Management ---------- */
        <Route path="/risk-management/fraud" element={<FraudList />} />
        <Route path="/risk-management/fraud/add" element={<AddFraud />} />
        <Route path="/risk-management/fraud/:id/view" element={<ViewFraud />} />
        <Route path="/risk-management/fraud/:id/edit" element={<EditFraud />} />
        /* ---------- Portfolio Limits ---------- */
        <Route
          path="/risk-management/portfolio-limits"
          element={<PortfolioLimitList />}
        />
        <Route
          path="/risk-management/portfolio-limits/add"
          element={<AddPortfolioLimit />}
        />
        <Route
          path="/risk-management/portfolio-limits/:id/view"
          element={<ViewPortfolioLimit />}
        />
        <Route
          path="/risk-management/portfolio-limits/:id/edit"
          element={<EditPortfolioLimit />}
        />
        /* ---------- Default Limits ---------- */
        <Route
          path="/risk-management/default-limits"
          element={<DefaultLimitList />}
        />
        <Route
          path="/risk-management/default-limits/add"
          element={<AddDefaultLimit />}
        />
        <Route
          path="/risk-management/default-limits/:id/view"
          element={<ViewDefaultLimit />}
        />
        <Route
          path="/risk-management/default-limits/:id/edit"
          element={<EditDefaultLimit />}
        />
        /* ---------- Other Parameters ---------- */
        <Route path="/risk-management/others" element={<OtherList />} />
        <Route path="/risk-management/others/add" element={<AddOther />} />
        <Route
          path="/risk-management/others/:id/view"
          element={<ViewOther />}
        />
        <Route
          path="/risk-management/others/:id/edit"
          element={<EditOther />}
        />
        {/* Agent Management -> Channel Partners */}
        <Route path="/channel-partners" element={<ChannelPartnerList />} />
        <Route path="/channel-partners/add" element={<AddEditAgent />} />
        <Route path="/channel-partners/edit/:id" element={<AddEditAgent />} />
        <Route
          path="/channel-partners/view/:id"
          element={<ChannelPartnerView />}
        />
        <Route path="/channel-partners/payout/:id" element={<UpdatePayout />} />
        <Route
          path="/channel-partners/recovery/:id"
          element={<UpdateRecovery />}
        />
        <Route
          path="/channel-partners/performance/:id"
          element={<AgentPerformance />}
        />
        <Route
          path="/channel-partners/tenants/:id"
          element={<ManageTenants />}
        />
        {/* Agent Management -> Collection Agent Management */}
        <Route path="/collection-agent" element={<CollectionAgentList />} />
        <Route path="/collection-agent/add" element={<CollectionAgentForm />} />
        <Route
          path="/collection-agent/edit/:id"
          element={<CollectionAgentForm />}
        />
        <Route
          path="/collection-agent/view/:id"
          element={<CollectionAgentView />}
        />
        <Route path="/collection-agent/update/:id" element={<UpdateAgent />} />
        <Route path="/collection-agent/fees/:id" element={<ManageFees />} />
        <Route path="/legal-agent" element={<LegalAgentList />} />
        <Route path="/legal-agents/edit/:id" element={<LegalAgentForm />} />
        <Route path="/legal-agents/view/:id" element={<LegalAgentView />} />
        <Route path="/legal-agents/add" element={<LegalAgentForm />} />

        <Route path="/verification-agency" element={<VerificationAgencyList />} />
        <Route path="/verification-agency/edit/:id" element={<VerificationAgencyForm />} />
        <Route path="/verification-agency/view/:id" element={<VerificationAgencyView />} />
        <Route path="/verification-agency/add" element={<VerificationAgencyForm />} />
        <Route path="/verification-agency/manage-fees/:id" element={<ManageVerificationFees />} />

        <Route path="/controls/language" element={<LanguageList />} />
        <Route path="/controls/language/add" element={<LanguageAdd />} />
        <Route path="/controls/language/edit/:id" element={<LanguageEdit />} />
        <Route path="/controls/language/view/:id" element={<LanguageView />} />

        <Route path="/controls/geo/country" element={<CountryList />} />
        <Route path="/controls/geo/country/add" element={<AddCountry />} />
        <Route path="/controls/geo/country/edit/:id" element={<EditCountry />} />

        <Route path="/controls/geo/state" element={<StateList />} />
        <Route path="/controls/geo/state/add" element={<AddState />} />
        <Route path="/controls/geo/state/edit/:id" element={<EditState />} />

        <Route path="/controls/geo/city" element={<CityList />} />
        <Route path="/controls/geo/city/add" element={<AddCity />} />
        <Route path="/controls/geo/city/edit/:id" element={<EditCity />} />

        <Route path="/controls/geo/area" element={<AreaList />} />
        <Route path="/controls/geo/area/add" element={<AddArea />} />
        <Route path="/controls/geo/area/edit/:id" element={<EditArea />} />

        <Route path="/controls/login-auth" element={<LoginAuthList />} />
        <Route path="/controls/login-auth/add" element={<AddLoginAuth />} />
        <Route path="/controls/login-auth/edit/:id" element={<EditLoginAuth />} />
        <Route path="/controls/login-auth/view/:id" element={<ViewLoginAuth />} />

        <Route path="/controls/co-applicant" element={<CoApplicantList />} />
        <Route path="/controls/co-applicant/add" element={<AddCoApplicant />} />
        <Route path="/controls/co-applicant/edit/:id" element={<EditCoApplicant />} />
        <Route path="/controls/co-applicant/view/:id" element={<ViewCoApplicant />} />

        <Route path="/controls/login-fees" element={<LoginFeeList />} />
        <Route path="/controls/login-fees/add" element={<AddLoginFee />} />
        <Route path="/controls/login-fees/edit/:id" element={<EditLoginFee />} />
        <Route path="/controls/login-fees/view/:id" element={<ViewLoginFee />} />

        <Route path="/controls/joint-applicant" element={<JointApplicantList />} />
        <Route path="/controls/joint-applicant/add" element={<AddJointApplicant />} />
        <Route path="/controls/joint-applicant/edit/:id" element={<EditJointApplicant />} />
        <Route path="/controls/joint-applicant/view/:id" element={<ViewJointApplicant />} />

        <Route path="/controls/references" element={<ReferenceList />} />
        <Route path="/controls/references/add" element={<AddReference />} />
        <Route path="/controls/references/edit/:id" element={<EditReference />} />
        <Route path="/controls/references/view/:id" element={<ViewReference />} />

        <Route path="/controls/application-process" element={<ApplicationProcessList />} />
        <Route path="/controls/application-process/processing-mode" element={<UpdateProcessingMode />} />
        <Route path="/controls/application-process/update-application" element={<UpdateApplication />} />
        <Route path="/controls/application-process/settings" element={<ApplicationSettings />} />
        <Route path="/controls/application-process/action-type" element={<UpdateActionType />} />

        <Route
          path="/controls/score-card"
          element={<ScoreCardRatingHome />}
        />

        <Route path="/controls/score-card/reference-check" element={<ReferenceCheckList />}/>
        <Route path="/controls/score-card/reference-check/add" element={<AddReferenceCheck />}/>
        <Route path="/controls/score-card/reference-check/edit/:id" element={<EditReferenceCheck />}/>

        <Route path="/controls/score-card/credit-history" element={<CreditHistoryList />} />
        <Route path="/controls/score-card/credit-history/add" element={<AddCreditHistory />} />
        <Route path="/controls/score-card/credit-history/edit/:id" element={<EditCreditHistory />} />

        <Route path="/controls/score-card/investigation-report" element={<InvestigationReportList />} />
        <Route path="/controls/score-card/investigation-report/add" element={<AddInvestigationReport />} />
        <Route path="/controls/score-card/investigation-report/edit/:id" element={<EditInvestigationReport />} />

        <Route path="/controls/verification" element={<VerificationHome />} />

        <Route path="/controls/verification/tele-verification" element={<TeleVerificationList />} />
        <Route path="/controls/verification/tele-verification/add" element={<AddTeleVerification />} />
        <Route path="/controls/verification/tele-verification/edit/:id" element={<EditTeleVerification />} />
        <Route path="/controls/verification/tele-verification/view/:id" element={<ViewTeleVerification />} />

        <Route path="/controls/verification/credit-personal-meetings" element={<MeetingList />} />
        <Route path="/controls/verification/credit-personal-meetings/add" element={<AddMeeting />} />
        <Route path="/controls/verification/credit-personal-meetings/edit/:id" element={<EditMeeting />} />
        <Route path="/controls/verification/credit-personal-meetings/view/:id" element={<ViewMeeting />} />

      </Routes>
<Route path="/collection-management">
  <Route index element={<CollectionManagement />} />

  <Route path="payment-gateways">
    <Route index element={<PaymentGatewayList />} />
    <Route path="add" element={<AddPaymentGateway />} />
    <Route path=":id/edit" element={<EditPaymentGateway />} />
  </Route>

  <Route path="controls" element={<CollectionControl />} />

  <Route path="client-team-mapping/add" element={<MapClientTeam />} />
  <Route path="client-agent-mapping/add" element={<MapClientAgent />} />

  <Route path="payouts/add" element={<PayoutManagement />} />
</Route>



<Route path="/disbursement-management">
  <Route index element={<DisbursementList />} />

  <Route path="disbursement">
    <Route index element={<DisbursementList />} />
    <Route path="add" element={<DisbursementForm />} />
    <Route path=":id/edit" element={<DisbursementForm />} />
    <Route path=":id/view" element={<DisbursementDetail />} />
  </Route>

  <Route path="agency">
    <Route index element={<AgencyList />} />
    <Route path="add" element={<AgencyForm />} />
    <Route path=":id/edit" element={<AgencyForm />} />
    <Route path=":id/view" element={<AgencyDetail />} />
  </Route>

  <Route path="document">
    <Route index element={<DocumentList />} />
    <Route path="add" element={<DocumentForm />} />
    <Route path=":id/edit" element={<DocumentForm />} />
    <Route path=":id/view" element={<DocumentDetail />} />
  </Route>

  <Route path="frequency">
    <Route index element={<FrequencyList />} />
    <Route path="add" element={<FrequencyForm />} />
    <Route path=":id/edit" element={<FrequencyForm />} />
    <Route path=":id/view" element={<FrequencyDetail />} />
  </Route>

  <Route path="down-payment">
    <Route index element={<DownPaymentList />} />
    <Route path="add" element={<DownPaymentForm />} />
    <Route path=":id/edit" element={<DownPaymentForm />} />
    <Route path=":id/view" element={<DownPaymentDetail />} />
  </Route>

  <Route path="stage">
    <Route index element={<StageMasterList />} />
    <Route path="add" element={<StageMasterForm />} />
    <Route path=":id/edit" element={<StageMasterForm />} />
    <Route path=":id/view" element={<StageMasterDetail />} />
  </Route>

  <Route path="third-party">
    <Route index element={<ThirdPartyList />} />
    <Route path="add" element={<ThirdPartyForm />} />
    <Route path=":id/edit" element={<ThirdPartyForm />} />
    <Route path=":id/view" element={<ThirdPartyDetail />} />
  </Route>
</Route>


<Route path="/provisioning-classification">

  <Route path="loan-classification">
    <Route index element={<ClassificationList />} />
    <Route path="add" element={<ClassificationForm />} />
    <Route path=":id/edit" element={<ClassificationForm />} />
    <Route path=":id/update" element={<ClassificationUpdate />} />
    <Route path=":id/manage" element={<ClassificationManage />} />
  </Route>

  <Route path="writeoff">
    <Route index element={<WriteoffRuleList />} />
    <Route path="add" element={<WriteoffRuleForm />} />
    <Route path=":id/edit" element={<WriteoffRuleForm />} />
    <Route path=":id/update" element={<WriteoffUpdate />} />
    <Route path=":id/manage" element={<WriteoffManage />} />
  </Route>

  <Route path="settlement">
    <Route index element={<SettlementRuleList />} />
    <Route path="add" element={<SettlementRuleForm />} />
    <Route path=":id/edit" element={<SettlementRuleForm />} />
    <Route path=":id/update" element={<SettlementUpdate />} />
    <Route path=":id/manage" element={<SettlementManage />} />
  </Route>

  <Route path="provisioning-npa">
    <Route index element={<ProvisioningRuleList />} />
    <Route path="add" element={<ProvisioningRuleForm />} />
    <Route path=":id/edit" element={<ProvisioningRuleForm />} />
    <Route path=":id/manage" element={<ProvisioningManagerForm />} />
  </Route>

  <Route path="incentive-management">
    <Route index element={<IncentiveRuleList />} />
    <Route path="add" element={<IncentiveRuleForm />} />
    <Route path=":id/edit" element={<IncentiveRuleForm />} />
  </Route>

</Route>




      </Routes>
    </Router>
  );
}

export default App;
