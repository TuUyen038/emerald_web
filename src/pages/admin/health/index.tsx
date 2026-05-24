import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import { useSystemHealth } from "@/hooks/data/useSystemHealth";
import HealthCard from "./HealthCard";
import { Button } from "@/components/ui/button";

const HealthDashboard = () => {
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  const { data: health, isLoading, refetch } = useSystemHealth();

  useEffect(() => {
    const interval = setInterval(() => refetch(), 60000); // 60s
    return () => clearInterval(interval);
  }, [refetch]);

  const isHealthy = health?.status === "ok";

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="System Health Dashboard"
        subtitle="Giám sát thời gian thực các thành phần hệ thống"
        actions={
          <Button
            onClick={() => {
              refetch();
              setLastChecked(new Date());
            }}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Làm mới ngay
          </Button>
        }
      />

      <div
        className={`p-4 rounded-lg border ${
          isHealthy ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
        }`}
      >
        <p className="text-lg font-semibold">
          {isHealthy ? "✅ All Systems Operational" : "⚠️ System Degraded"}
        </p>
        <p className="text-sm text-gray-600">Last checked: {lastChecked.toLocaleTimeString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(health?.info || {}).map(([name, info]) => (
          <HealthCard key={name} name={name} status={info} />
        ))}
      </div>
    </div>
  );
};

export default HealthDashboard;
