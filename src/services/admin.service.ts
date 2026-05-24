import axiosInstance from "@/lib/axios";
import type { AuditLog, QueryAuditLogDto } from "@/types/audit";
import type { TimeSeriesData } from "@/types/metrics";
import type { HealthCheck } from "@/types/health";

export const adminService = {
  // UC33 - Audit Log
  getAuditLogs: async (params: QueryAuditLogDto = {}) => {
    const res = await axiosInstance.get("/admin/audit-logs", { params });
    return res.data;
  },

  exportAuditCsv: async (params: QueryAuditLogDto) => {
    const res = await axiosInstance.get("/admin/audit-logs/export", {
      params,
      responseType: "blob",
    });
    return res.data;
  },

  // UC34 - Metrics
  getMetricsTimeSeries: async (hours = 24) => {
    const res = await axiosInstance.get(`/admin/metrics?hours=${hours}`);
    return res.data as TimeSeriesData;
  },

  getMetricsLatest: async () => {
    const res = await axiosInstance.get("/admin/metrics/latest");
    return res.data;
  },

  // UC35 - Health
  getSystemHealth: async () => {
    const res = await axiosInstance.get("/health");
    return res.data as HealthCheck;
  },
};
