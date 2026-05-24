import { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { getPermissionMatrix, bulkUpdatePermissions } from "@/services/permission.service";
import { toast } from "sonner";

type PermissionMatrix = {
  [role: string]: {
    [module: string]: {
      canView: boolean;
      canCreate: boolean;
      canEdit: boolean;
      // canApprove: boolean;
      // canExport: boolean;
      canDelete: boolean;
    };
  };
};

const ACTIONS = [
  { key: "canView", label: "Xem" },
  { key: "canCreate", label: "Tạo" },
  { key: "canEdit", label: "Sửa" },
  { key: "canApprove", label: "Duyệt" },
  { key: "canExport", label: "Export" },
  { key: "canDelete", label: "Xóa" },
];

const ROLE_LABEL: Record<string, string> = {
  ADMIN: "SYSTEM ADMIN",
  OPERATIONS: "OPERATIONS",
  MANAGEMENT_BOARD: "MANAGEMENT_BOARD",
  RESIDENT: "RESIDENT",
};

const MODULE_LABEL: Record<string, string> = {
  RESIDENT_APARTMENT: "Toà nhà - Căn hộ - Cư dân",
  INVOICE_DEBT: "Hóa đơn - Chi phí - Thanh toán",
  AMENITY_BOOKING: "Tiện ích và Đặt chỗ",
  REPORTING: "Báo cáo thống kê",
  MAINTENANCE: "Phiếu bảo trì",
  FEEDBACK: "Ý kiến &Phản hồi",
  NOTIFICATIONS_VOTING: "Thông báo - Biểu quyết",
  ASSET_EQUIPMENT: "Tài sản & Thiết bị",
  SYSTEM_ADMIN: "Hệ thống",
};

const PermissionsPage = () => {
  const [matrix, setMatrix] = useState<PermissionMatrix>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatrix();
  }, []);

  const fetchMatrix = async () => {
    setLoading(true);
    const data = await getPermissionMatrix();
    setMatrix(data);
    setLoading(false);
  };

  const handleChange = (role: string, module: string, action: string, value: boolean) => {
    setMatrix((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [module]: {
          ...prev[role][module],
          [action]: value,
        },
      },
    }));
  };

  const handleSave = async () => {
  try {
    const payload: any[] = [];
    Object.entries(matrix).forEach(([role, modules]) => {
      Object.entries(modules).forEach(([module, actions]) => {
        payload.push({ role, module, ...actions });
      });
    });

    await bulkUpdatePermissions({ permissions: payload });
    toast.success("Lưu thành công!");
  } catch (error: any) {
    // 403 đã được interceptor hiện toast rồi, không cần xử lý thêm
    // 400 thì hiện message cụ thể
    if (error.response?.status === 400) {
      toast.error(error.response.data?.message?.join(", ") || "Dữ liệu không hợp lệ");
    }
  }
};

  const modules = Array.from(
    new Set(
      Object.values(matrix).flatMap((m) => Object.keys(m))
    )
  );

  if (loading) return <div className="p-6">Đang tải permissions...</div>;

  return (
    <div className="p-1.5 pt-0 space-y-4">
      <PageHeader
        title="Phân quyền hệ thống"
        subtitle="Quản lý quyền theo vai trò"
        actions={
          <Button onClick={handleSave}>
            Lưu thay đổi
          </Button>
        }
      />

      <div className="bg-white border rounded shadow-sm p-4 overflow-auto">
        {modules.map((module) => (
          <div key={module} className="mb-8">
            <h2 className="text-base font-semibold mb-3 text-main">
              {MODULE_LABEL[module] || module}
            </h2>

            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-left">Role</th>
                  {ACTIONS.map((a) => (
                    <th key={a.key} className="border p-2 text-center">
                      {a.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {Object.entries(matrix).map(([role, modulesObj]) => {
                  const actions = modulesObj[module];
                  if (!actions) return null;

                  return (
                    <tr key={role}>
                      <td className="border p-2 font-medium">
                        {ROLE_LABEL[role] || role}
                      </td>

                      {ACTIONS.map((a) => (
                        <td key={a.key} className="border text-center">
                          <input
                            type="checkbox"
                            checked={actions[a.key as keyof typeof actions]}
                            onChange={(e) =>
                              handleChange(role, module, a.key, e.target.checked)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionsPage;