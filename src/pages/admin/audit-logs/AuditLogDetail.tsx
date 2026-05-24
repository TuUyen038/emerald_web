import { formatDate } from "@/utils/date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuditLog } from "@/types/audit";

interface AuditLogDetailProps {
  log: AuditLog;
}

export default function AuditLogDetail({ log }: AuditLogDetailProps) {
  return (
    <div className="px-4 pb-4">
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-sm">Chi tiết Payload</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-white p-4 rounded border text-xs overflow-auto max-h-96 font-mono text-gray-800">
            {JSON.stringify(log.payload || {}, null, 2)}
          </pre>

          {log.errorMessage && (
            <div className="mt-4">
              <p className="text-red-600 text-sm font-medium">Error Message:</p>
              <p className="text-red-700 bg-red-50 p-3 rounded border border-red-100 text-sm">
                {log.errorMessage}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <span className="text-gray-500">User ID:</span>{" "}
              <span className="font-medium">{log.userId || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">IP Address:</span>{" "}
              <span className="font-medium">{log.ipAddress || "—"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
