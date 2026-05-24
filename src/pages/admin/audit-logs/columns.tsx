import type { TableColumn } from "@/types";
import StatusBadge from "@components/common/StatusBadge";
import type { AuditLog } from "@/types/audit";
import { formatDate } from "@/utils/date";

export const auditLogColumns: TableColumn<AuditLog>[] = [
  {
    key: "createdAt",
    label: "Thời gian",
    sortable: true,
    width: "160px",
    render: (r) => formatDate(r.createdAt),
  },
  { key: "userEmail", label: "Người dùng", width: "180px" },
  { key: "userRole", label: "Vai trò", width: "100px" },
  { key: "method", label: "Method", width: "80px", align: "center" },
  { key: "path", label: "Đường dẫn", width: "280px" },
  {
    key: "status",
    label: "Trạng thái",
    width: "110px",
    align: "center",
    render: (row) => (
      <StatusBadge
        label={
          row.status === "success" ? "Thành công" : row.status === "failed" ? "Lỗi" : "Đang xử lý"
        }
        type={row.status === "success" ? "success" : row.status === "failed" ? "error" : "warning"}
      />
    ),
  },
  { key: "ipAddress", label: "IP", width: "120px" },
];
