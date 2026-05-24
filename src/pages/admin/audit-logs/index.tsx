import { useState, useMemo } from "react";
import { Download, RefreshCw } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import CustomTable from "@/components/common/CustomTable";
import { auditLogColumns } from "./columns";
import { useAuditLogs, useExportAuditCsv } from "@/hooks/data/useAuditLogs";
import AuditLogDetail from "./AuditLogDetail";
import { Button } from "@/components/ui/button";

const AuditLogsPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    search: "",
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useAuditLogs({
    ...filters,
    path: filters.search || undefined,
  });

  const exportMutation = useExportAuditCsv();

  const handleExport = () => {
    exportMutation.mutate(filters, {
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
    });
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
        <SearchBar
          placeholder="Tìm theo email, path, IP..."
          onSearch={(term) => setFilters((prev) => ({ ...prev, search: term, page: 1 }))}
        />
      </div>

      <CustomTable
        data={data?.data || []}
        columns={auditLogColumns}
        defaultPageSize={20}
        // onRowClick={(row: any) =>
        //   setExpandedId(expandedId === row.id ? null : row.id)
        // }
        // expandedRow không có sẵn trong CustomTable hiện tại → dùng render tùy chỉnh hoặc mở rộng sau
      />

      {/* Fallback detail khi click row */}
      {expandedId && (
        <div className="mt-4">
          {data?.data?.find((log: any) => log.id === expandedId) && (
            <AuditLogDetail log={data.data.find((log: any) => log.id === expandedId)!} />
          )}
        </div>
      )}
    </div>
  );
};

export default AuditLogsPage;
