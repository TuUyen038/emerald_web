import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePermission } from "@/hooks/usePermission";
import { type PermissionModule } from "@/constants/permissions";

type RoleBasedRouteProps = {
  children: ReactNode;
  requiredModule: PermissionModule; // 🟢 ĐỔI TỪ allowedRoles THÀNH requiredModule
  fallbackPath?: string;
};

/**
 * Component kiểm soát truy cập dựa trên Ma trận quyền động từ Backend
 */
const RoleBasedRoute = ({
  children,
  requiredModule,
  fallbackPath = "/unauthorized",
}: RoleBasedRouteProps) => {
  const { user, isLoading } = useAuth();
  const { canView } = usePermission();

  // 1. Nếu Context đang load dữ liệu Ma trận quyền từ API về -> Hiển thị Loading chặn luồng xử lý lệch pha
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500 font-inter">
        Đang kiểm tra quyền truy cập...
      </div>
    );
  }

  // 2. Nếu chưa đăng nhập -> Đá về trang login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Sử dụng hàm canView động đã kết nối với Backend để check quyền XEM của module này
  if (!canView(requiredModule)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;