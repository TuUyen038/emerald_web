import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useMemo } from "react";

interface ResponseTimeChartProps {
  data: any;
}

export function ResponseTimeChart({ data }: ResponseTimeChartProps) {
  const chartData = useMemo(() => {
    const map: any = {};
    (data?.avg_response_time || []).forEach((d: any) => {
      map[d.timestamp] = {
        time: new Date(d.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avg: d.value,
      };
    });
    (data?.p95_response_time || []).forEach((d: any) => {
      if (map[d.timestamp]) map[d.timestamp].p95 = d.value;
      else
        map[d.timestamp] = {
          time: new Date(d.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          p95: d.value,
        };
    });
    return Object.values(map).sort((a: any, b: any) => a.time.localeCompare(b.time));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis unit="ms" />
        <Tooltip formatter={(v: number | undefined) => [`${v ?? 0}ms`, ""]} />
        <Legend />
        <Line
          type="monotone"
          dataKey="avg"
          stroke="#3b82f6"
          strokeWidth={2}
          name="Avg Response Time"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="p95"
          stroke="#f59e0b"
          strokeWidth={2}
          strokeDasharray="5 5"
          name="P95 Response Time"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
