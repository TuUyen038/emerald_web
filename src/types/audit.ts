export interface AuditLog {
  id: string;
  userId: string | null;
  userEmail: string | null;
  userRole: string | null;
  method: string;
  path: string;
  payload: Record<string, any> | null;
  ipAddress: string | null;
  status: "initiated" | "success" | "failed";
  errorMessage: string | null;
  createdAt: string;
}

export interface QueryAuditLogDto {
  userId?: string;
  userRole?: string;
  method?: string;
  path?: string;
  status?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}
