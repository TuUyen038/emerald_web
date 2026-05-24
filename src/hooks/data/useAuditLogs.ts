import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import type { QueryAuditLogDto } from "@/types/audit";

export const useAuditLogs = (filters: QueryAuditLogDto) => {
  return useQuery({
    queryKey: ["audit-logs", filters],
    queryFn: () => adminService.getAuditLogs(filters),
  });
};

export const useExportAuditCsv = () => {
  return useMutation({
    mutationFn: adminService.exportAuditCsv,
  });
};
