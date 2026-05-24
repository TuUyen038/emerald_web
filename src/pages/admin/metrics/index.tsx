import { useState, useMemo } from "react";
import { RefreshCw, TrendingUp } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import MetricCard from "./components/MetricCard";
import { ResponseTimeChart } from "./charts/ResponseTimeChart";
import { ErrorRateChart } from "./charts/ErrorRateChart";
import { RequestVolumeChart } from "./charts/RequestVolumeChart";
import TopEndpointsTable from "./components/TopEndpointsTable";

import { useSystemMetrics, useLatestMetrics } from "@/hooks/data/useSystemMetrics";

const MetricsDashboard = () => {
  const [hours, setHours] = useState(24);

  const { data: timeSeries, isLoading: loadingTS } = useSystemMetrics(hours);
  const { data: latest, isLoading: loadingLatest } = useLatestMetrics();

  const isLoading = loadingTS || loadingLatest;

  const topEndpoints = latest?.top_endpoints?.labels?.endpoints || [];

  return (
    <div className="p-1.5 pt-0 space-y-6">
      <PageHeader
        title="System Metrics Dashboard"
        subtitle="Giám sát hiệu năng hệ thống thời gian thực"
        actions={
          <Button onClick={() => window.location.reload()} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" /> Làm mới
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Avg Response Time"
          value={latest?.avg_response_time?.value ?? 0}
          unit="ms"
          color="blue"
        />
        <MetricCard
          title="P95 Response Time"
          value={latest?.p95_response_time?.value ?? 0}
          unit="ms"
          color="amber"
        />
        <MetricCard
          title="Error Rate"
          value={((latest?.error_rate?.value ?? 0) * 100).toFixed(1)}
          unit="%"
          color={(latest?.error_rate?.value ?? 0) > 0.05 ? "red" : "green"}
        />
        <MetricCard
          title="Requests (30s)"
          value={latest?.total_requests?.value ?? 0}
          color="green"
        />
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {[1, 6, 24, 72, 168].map((h) => (
          <Button
            key={h}
            variant={hours === h ? "default" : "outline"}
            size="sm"
            onClick={() => setHours(h)}
          >
            {h === 1 ? "1 giờ" : h === 168 ? "7 ngày" : `${h} giờ`}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded border shadow-sm">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" /> Thời gian phản hồi
          </h3>
          <ResponseTimeChart data={timeSeries} />
        </div>

        <div className="bg-white p-6 rounded border shadow-sm">
          <h3 className="font-semibold mb-4">Tỷ lệ lỗi</h3>
          <ErrorRateChart data={timeSeries} />
        </div>
      </div>

      <div className="bg-white p-6 rounded border shadow-sm">
        <h3 className="font-semibold mb-4">Lượng Request theo thời gian</h3>
        <RequestVolumeChart data={timeSeries} />
      </div>

      <div className="bg-white p-6 rounded border shadow-sm">
        <h3 className="font-semibold mb-4">Top Endpoints (30s gần nhất)</h3>
        <TopEndpointsTable endpoints={topEndpoints} />
      </div>
    </div>
  );
};

export default MetricsDashboard;
