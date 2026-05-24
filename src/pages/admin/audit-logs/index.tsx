import { useState } from "react";
import { Download, RefreshCw } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import CustomTable from "@/components/common/CustomTable";
import { auditLogColumns } from "./columns";
import { useAuditLogs, useExportAuditCsv } from "@/hooks/data/useAuditLogs";
import AuditLogDetail from "./AuditLogDetail";
import { Button } from "@/components/ui/button";

const AuditLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useAuditLogs({
    limit: 500,
    page: 1,
    path: searchTerm || undefined,
  });

  const exportMutation = useExportAuditCsv();

  const handleExport = () => {
    exportMutation.mutate(
      { path: searchTerm || undefined },
      {
        onSuccess: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `audit-log-${new Date().toISOString().split("T")[0]}.csv`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
      },
    );
  };

  const logs = data?.data || [];

  const handleRowClick = (row: any) => {
    setExpandedId(expandedId === row.id ? null : row.id);
  };

  return (
    <div className="p-1.5 pt-0 space-y-4">
      <PageHeader
        title="Audit Log"
        subtitle="Lịch sử hoạt động hệ thống (Append-only)"
        actions={
          <div className="flex gap-2">
            <Button onClick={() => refetch()} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Làm mới
            </Button>
            <Button onClick={handleExport} disabled={exportMutation.isPending} size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        }
      />

      <div className="bg-white p-4 rounded border border-gray-200">
        <SearchBar placeholder="Tìm theo email, path, IP..." onSearch={setSearchTerm} />
      </div>

      {isLoading ? (
        <div className="bg-white p-12 text-center text-gray-500 border rounded shadow-sm min-h-[400px]">
          Đang tải dữ liệu audit log...
        </div>
      ) : (
        <CustomTable
          data={logs}
          columns={auditLogColumns}
          defaultPageSize={100}
          showCheckbox={false}
          onRowClick={handleRowClick} // ← Đã thêm
        />
      )}

      {expandedId && (
        <div className="mt-4 px-1">
          {logs.find((log: any) => log.id === expandedId) && (
            <AuditLogDetail log={logs.find((log: any) => log.id === expandedId)!} />
          )}
        </div>
      )}
    </div>
  );
};

export default AuditLogsPage;
