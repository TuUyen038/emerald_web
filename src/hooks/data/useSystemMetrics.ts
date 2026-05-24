import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import type { TimeSeriesData, LatestMetrics } from "@/types/metrics";

export const useSystemMetrics = (hours: number = 24) => {
  return useQuery({
    queryKey: ["metrics", "timeseries", hours],
    queryFn: () => adminService.getMetricsTimeSeries(hours),
    refetchInterval: 30000, // Đồng bộ với cron 30s
  });
};

export const useLatestMetrics = () => {
  return useQuery({
    queryKey: ["metrics", "latest"],
    queryFn: () => adminService.getMetricsLatest(),
    refetchInterval: 30000,
  });
};
