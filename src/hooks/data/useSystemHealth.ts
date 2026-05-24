import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import type { HealthCheck } from "@/types/health";

export const useSystemHealth = () => {
  return useQuery({
    queryKey: ["system-health"],
    queryFn: adminService.getSystemHealth,
    refetchInterval: 60000, // 60 giây
    staleTime: 30000,
  });
};
