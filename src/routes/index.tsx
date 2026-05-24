import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "@components/layout/MainLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";
import DetailAssetPage from "@/pages/Assets/detail-asset";
import ResidentsPage from "@/pages/Residents/view-residents";
import DetailResidentPage from "@/pages/Residents/detail-resident";
import BlocksPage from "@/pages/Blocks/view-blocks";
import CreateBlockPage from "@/pages/Blocks/create-block";
import UpdateBlockPage from "@/pages/Blocks/update-block";
import DetailNotificationPage from "@/pages/Notifications/detail-notification";
import DetailBlockPage from "@/pages/Blocks/detail-block";
import DetailApartmentPage from "@/pages/Apartments/detail-apartment";
import ApartmentsPage from "@/pages/Apartments/view-apartments";
import CreateVotingPage from "@/pages/Votings/create-voting";
import UpdateVotingPage from "@/pages/Votings/update-voting";
import DetailVotingPage from "@/pages/Votings/detail-voting";
import InvoicesPage from "@/pages/Invoices/view-invoices";
import DetailInvoicePage from "@/pages/Invoices/detail-invoice";
import TechniciansPage from "@/pages/Technicians/view-technicians";
import DetailTechnicianPage from "@/pages/Technicians/detail-technician";
import MaintenancesPage from "@/pages/Maintenances/view-maintenances";
import DetailMaintenancePage from "@/pages/Maintenances/detail-maintenance";
import IssuesPage from "@/pages/Issues/view-issues";
import DetailIssuePage from "@/pages/Issues/detail-issue";
import FeesPage from "@/pages/Fees/view-fees";
import DetailFeePage from "@/pages/Fees/detail-fee";
import AccountsPage from "@/pages/Accounts/view-accounts";
import DetailAccountPage from "@/pages/Accounts/detail-account";
import AuditLogsPage from "@/pages/admin/audit-logs";
import MetricsDashboard from "@/pages/admin/metrics";
import HealthDashboard from "@/pages/admin/health";
import PermissionsPage from "@/pages/Permissions";

const Assets = lazy(() => import("@/pages/Assets/view-assets"));
const Notifications = lazy(() => import("@/pages/Notifications/view-notifications"));
const SystemNotifications = lazy(() => import("@/pages/SystemNotifications"));
const Services = lazy(() => import("@/pages/Services"));
const Report = lazy(() => import("@/pages/Report"));
const DetailServicePage = lazy(() => import("@/pages/Services/DetailService"));
const Login = lazy(() => import("@/pages/Login"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const VerifyEmail = lazy(() => import("@/pages/VerifyEmail"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const VotingsPage = lazy(() => import("@/pages/Votings/view-votings"));
const ProfilePage = lazy(() => import("@/pages/Profile"));
const UnauthorizedPage = lazy(() => import("@/pages/Unauthorized"));
export const routes = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-email", element: <VerifyEmail /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/unauthorized", element: <UnauthorizedPage /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/blocks" replace /> },

      // Assets
      {
        path: "assets",
        element: (
          <RoleBasedRoute requiredModule="assets">
            <Assets />
          </RoleBasedRoute>
        ),
      },
      {
        path: "assets/:id",
        element: (
          <RoleBasedRoute requiredModule="assets">
            <DetailAssetPage />
          </RoleBasedRoute>
        ),
      },

      // Notifications
      {
        path: "notifications",
        element: (
          <RoleBasedRoute requiredModule="notifications">
            <Notifications />
          </RoleBasedRoute>
        ),
      },
      {
        path: "notifications/:id",
        element: (
          <RoleBasedRoute requiredModule="notifications">
            <DetailNotificationPage />
          </RoleBasedRoute>
        ),
      },

      // System Notifications
      {
        path: "system-notifications",
        element: (
          <RoleBasedRoute requiredModule="notifications">
            <SystemNotifications />
          </RoleBasedRoute>
        ),
      },

      // Residents
      {
        path: "residents",
        element: (
          <RoleBasedRoute requiredModule="residents">
            <ResidentsPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "residents/:id",
        element: (
          <RoleBasedRoute requiredModule="residents">
            <DetailResidentPage />
          </RoleBasedRoute>
        ),
      },

      // Services
      {
        path: "services",
        element: (
          <RoleBasedRoute requiredModule="services">
            <Services />
          </RoleBasedRoute>
        ),
      },
      {
        path: "services/:id",
        element: (
          <RoleBasedRoute requiredModule="services">
            <DetailServicePage />
          </RoleBasedRoute>
        ),
      },

      // Reports
      {
        path: "reports",
        element: (
          <RoleBasedRoute requiredModule="reports">
            <Report />
          </RoleBasedRoute>
        ),
      },

      // Blocks
      {
        path: "blocks",
        element: (
          <RoleBasedRoute requiredModule="blocks">
            <BlocksPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "blocks/:id",
        element: (
          <RoleBasedRoute requiredModule="blocks">
            <DetailBlockPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "blocks/create",
        element: (
          <RoleBasedRoute requiredModule="blocks">
            <CreateBlockPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "blocks/update/:id",
        element: (
          <RoleBasedRoute requiredModule="blocks">
            <UpdateBlockPage />
          </RoleBasedRoute>
        ),
      },

      // Apartments
      {
        path: "apartments",
        element: (
          <RoleBasedRoute requiredModule="apartments">
            <ApartmentsPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "apartments/:id",
        element: (
          <RoleBasedRoute requiredModule="apartments">
            <DetailApartmentPage />
          </RoleBasedRoute>
        ),
      },

      // Votings
      {
        path: "votings",
        element: (
          <RoleBasedRoute requiredModule="votings">
            <VotingsPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "votings/create",
        element: (
          <RoleBasedRoute requiredModule="votings">
            <CreateVotingPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "votings/update/:id",
        element: (
          <RoleBasedRoute requiredModule="votings">
            <UpdateVotingPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "votings/:id",
        element: (
          <RoleBasedRoute requiredModule="votings">
            <DetailVotingPage />
          </RoleBasedRoute>
        ),
      },

      // Invoices
      {
        path: "invoices",
        element: (
          <RoleBasedRoute requiredModule="invoices">
            <InvoicesPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "invoices/:id",
        element: (
          <RoleBasedRoute requiredModule="invoices">
            <DetailInvoicePage />
          </RoleBasedRoute>
        ),
      },

      // Fees
      {
        path: "fees",
        element: (
          <RoleBasedRoute requiredModule="fees">
            <FeesPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "fees/:id",
        element: (
          <RoleBasedRoute requiredModule="fees">
            <DetailFeePage />
          </RoleBasedRoute>
        ),
      },

      // Technicians
      {
        path: "technicians",
        element: (
          <RoleBasedRoute requiredModule="technicians">
            <TechniciansPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "technicians/:id",
        element: (
          <RoleBasedRoute requiredModule="technicians">
            <DetailTechnicianPage />
          </RoleBasedRoute>
        ),
      },

      // Issues/Requests
      {
        path: "issues",
        element: (
          <RoleBasedRoute requiredModule="issues">
            <IssuesPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "issues/:id",
        element: (
          <RoleBasedRoute requiredModule="issues">
            <DetailIssuePage />
          </RoleBasedRoute>
        ),
      },

      // Maintenances
      {
        path: "maintenances",
        element: (
          <RoleBasedRoute requiredModule="maintenances">
            <MaintenancesPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "maintenances/:id",
        element: (
          <RoleBasedRoute requiredModule="maintenances">
            <DetailMaintenancePage />
          </RoleBasedRoute>
        ),
      },

      // Profile - Dành cho tất cả user đã login (MODULE_MAPPING trả về null nên luôn được thông qua)
      {
        path: "profile",
        element: (
          <RoleBasedRoute requiredModule="profile">
            <ProfilePage />
          </RoleBasedRoute>
        ),
      },

      // Accounts
      {
        path: "accounts",
        element: (
          <RoleBasedRoute requiredModule="accounts">
            <AccountsPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "accounts/:accountId",
        element: (
          <RoleBasedRoute requiredModule="accounts">
            <DetailAccountPage />
          </RoleBasedRoute>
        ),
      },
      
      // Permissions Management
      {
        path: "matrix",
        element: (
          <RoleBasedRoute requiredModule="matrix">
            <PermissionsPage />
          </RoleBasedRoute>
        ),
      },
      // Audit Log
      {
        path: "audit-logs",
        element: (
          <RoleBasedRoute requiredModule="audit-logs">
            <AuditLogsPage />
          </RoleBasedRoute>
        ),
      },

      // System Metrics
      {
        path: "metrics",
        element: (
          <RoleBasedRoute requiredModule="metrics">
            <MetricsDashboard />
          </RoleBasedRoute>
        ),
      },

      // System Health
      {
        path: "health",
        element: (
          <RoleBasedRoute requiredModule="health">
            <HealthDashboard />
          </RoleBasedRoute>
        ),
      },
    ],
  },
]);