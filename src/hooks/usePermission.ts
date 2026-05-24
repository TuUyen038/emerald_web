// src/hooks/usePermission.ts
import {
  type PermissionAction,
  type PermissionModule,
  MODULE_MAPPING, // 👈 Import thêm bảng mapping từ file constants của bạn
  ACTION_MAP,     // 👈 Import thêm bảng đổi tên action ('view' -> 'canView')
} from "@/constants/permissions";
import { useAuth } from "@/contexts/AuthContext";

export const usePermission = () => {
  const { permissions, user } = useAuth(); // permissions này lấy từ Backend via Context

  /**
   * 🟢 HÀM SỬA 1: Logic cốt lõi đối chiếu với Ma trận động của Backend
   */
  const hasPermission = (module: PermissionModule, action: PermissionAction): boolean => {
    if (!user) return false;

    // 1. Lấy thông tin nhóm module Backend từ module phân rã của Frontend
    const beModule = MODULE_MAPPING[module];
    
    // Nếu map ra null -> Đây là trang cá nhân công khai (như profile) -> Cho phép làm luôn
    if (beModule === null) return true;

    // 2. Đặc quyền cho ADMIN đối với các module cấu hình hệ thống cao cấp
    if (user.role === "ADMIN" && beModule === "SYSTEM_ADMIN") return true;

    // 3. Nếu không có ma trận quyền trả về từ Backend -> Chặn luôn
    if (!permissions) return false;

    // Tìm ma trận tương ứng với Role của user
    const roleMatrix = permissions[user.role];
    if (!roleMatrix) return false;

    // Tìm cấu hình quyền của nhóm Module đó
    const moduleMatrix = roleMatrix[beModule];
    if (!moduleMatrix) return false;

    // Đổi tên action từ kiểu FE sang kiểu cột trong DB (ví dụ: 'view' -> 'canView')
    const beAction = ACTION_MAP[action];
    // Trả về giá trị true/false cấu hình trong DB
    return !!moduleMatrix[beAction];
  };

  /**
   * 🟢 HÀM SỬA 2: Kiểm tra user có bất kỳ quyền nào trên module 
   * (Rất hữu ích cho việc ẩn/hiện cha menu trên Sidebar nếu có menu con)
   */
  const hasAnyPermission = (module: PermissionModule): boolean => {
    if (!user) return false;

    const beModule = MODULE_MAPPING[module];
    if (beModule === null) return true;
    if (user.role === "ADMIN" && beModule === "SYSTEM_ADMIN") return true;
    if (!permissions) return false;

    const roleMatrix = permissions[user.role];
    if (!roleMatrix) return false;

    const moduleMatrix = roleMatrix[beModule];
    if (!moduleMatrix) return false;

    // Kiểm tra xem trong các ô quyền (canView, canCreate, canEdit...) có ô nào bằng true không
    return Object.values(moduleMatrix).some((val) => val === true);
  };

  /**
   * 🔵 CÁC HÀM TIỆN ÍCH DƯỚI ĐÂY GIỮ NGUYÊN HOÀN TOÀN (Vì đã chạy qua hasPermission)
   */

  const canView = (module: PermissionModule): boolean => {
    return hasPermission(module, "view");
  };

  const canCreate = (module: PermissionModule): boolean => {
    return hasPermission(module, "create");
  };

  const canUpdate = (module: PermissionModule): boolean => {
    return hasPermission(module, "update");
  };

  const canDelete = (module: PermissionModule): boolean => {
    return hasPermission(module, "delete");
  };

  const canManage = (module: PermissionModule): boolean => {
    return hasPermission(module, "manage");
  };

  return {
    hasPermission,
    canView,
    canCreate,
    canUpdate,
    canDelete,
    canManage,
    hasAnyPermission,
    userRole: user?.role,
  };
};