import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ErrorRateChart({ data }: { data: any }) {
  const chartData = (data?.error_rate || []).map((d: any) => ({
    time: new Date(d.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    errorRate: parseFloat((d.value * 100).toFixed(2)),
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis unit="%" domain={[0, 100]} />
        <Tooltip formatter={(v?: number) => [`${v !== undefined ? v : 0}%`, "Error Rate"]} />
        <Area type="monotone" dataKey="errorRate" stroke="#ef4444" fill="#fee2e2" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
