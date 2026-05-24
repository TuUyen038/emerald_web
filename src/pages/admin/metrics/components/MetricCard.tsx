import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MetricSnapshot } from "@/types/metrics";

interface MetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  color?: "green" | "red" | "blue" | "amber";
}

export default function MetricCard({ title, value, unit = "", color = "blue" }: MetricCardProps) {
  const colorMap = {
    green: "text-green-600",
    red: "text-red-600",
    blue: "text-blue-600",
    amber: "text-amber-600",
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-semibold ${colorMap[color]}`}>
          {typeof value === "number" ? value.toLocaleString() : value}
          {unit && <span className="text-xl font-normal ml-1">{unit}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
