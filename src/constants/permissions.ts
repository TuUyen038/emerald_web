import type { UserRole } from "@/types/auth";

export type PermissionModule =
  | "blocks"
  | "apartments"
  | "invoices"
  | "fees"
  | "residents"
  | "technicians"
  | "assets"
  | "services"
  | "issues"
  | "votings"
  | "maintenances"
  | "notifications"
  | "reports"
  | "accounts"
  | "profile"
  | "matrix"
  | "audit-logs"
  | "metrics"
  | "health";
export const ACTION_MAP = {
  view: "canView",
  create: "canCreate",
  update: "canEdit",
  delete: "canDelete",
  manage: "canEdit", // hoặc canApprove tùy bạn quy định chuyên sâu
} as const;

export type PermissionAction = keyof typeof ACTION_MAP;

// 3. Gom nhóm module FE vào SystemModule của BE
export const MODULE_MAPPING: Record<PermissionModule, string | null> = {
  // Nhóm Phân hệ Cư dân & Căn hộ
  blocks: "RESIDENT_APARTMENT",
  apartments: "RESIDENT_APARTMENT",
  residents: "RESIDENT_APARTMENT",

  // Nhóm Phân hệ Hóa đơn & Công nợ
  invoices: "INVOICE_DEBT",
  fees: "INVOICE_DEBT",

  // Nhóm Phân hệ Tài sản & Thiết bị
  assets: "ASSET_EQUIPMENT",

  // Nhóm Phân hệ Bảo trì & Kỹ thuật
  technicians: "MAINTENANCE",
  maintenances: "MAINTENANCE",

  // Nhóm Phân hệ Ý kiến & Phản hồi
  issues: "FEEDBACK",

  // Nhóm Phân hệ Đặt chỗ Tiện ích / Dịch vụ
  services: "AMENITY_BOOKING",

  // Nhóm Phân hệ Thông báo & Biểu quyết
  votings: "NOTIFICATIONS_VOTING",
  notifications: "NOTIFICATIONS_VOTING",

  // Nhóm Báo cáo
  reports: "REPORTING",

  // Hệ thống tối cao (Bypass qua Matrix, check cứng Role ADMIN ở BE)
  accounts: "SYSTEM_ADMIN",
  matrix: "SYSTEM_ADMIN",
  "audit-logs": "SYSTEM_ADMIN",
  metrics: "SYSTEM_ADMIN",
  health: "SYSTEM_ADMIN",

  // Trang cá nhân (Bypass hoàn toàn vì ai cũng có quyền)
  profile: null,
};

// Menu items giữ nguyên để render Sidebar không bị lỗi
export const MENU_ITEMS = [
  { id: "blocks", label: "Quản lý tòa nhà" },
  { id: "apartments", label: "Căn hộ" },
  { id: "invoices", label: "Công nợ" },
  { id: "fees", label: "Phí dịch vụ" },
  { id: "residents", label: "Cư dân" },
  { id: "technicians", label: "Kỹ thuật viên" },
  { id: "assets", label: "Tài sản, thiết bị" },
  { id: "services", label: "Dịch vụ" },
  { id: "issues", label: "Phản ánh, yêu cầu" },
  { id: "votings", label: "Biểu quyết" },
  { id: "maintenances", label: "Bảo trì" },
  { id: "notifications", label: "Thông báo" },
  { id: "reports", label: "Báo cáo thống kê" },
  { id: "accounts", label: "Tài khoản" },
  { id: "profile", label: "Tài khoản cá nhân" },
  { id: "audit-logs", label: "Audit Log" },
  { id: "matrix", label: "Quản lý quyền" },
  { id: "metrics", label: "System Metrics" },
  { id: "health", label: "System Health" },
] as const;