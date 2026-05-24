import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/common/StatusBadge";
import type { HealthComponent } from "@/types/health";

interface HealthCardProps {
  name: string;
  status: HealthComponent;
}

export default function HealthCard({ name, status }: HealthCardProps) {
  const isUp = status.status === "up";

  return (
    <Card className="shadow-sm hover:shadow transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base capitalize">{name.replace(/-/g, " ")}</CardTitle>
          <StatusBadge label={isUp ? "Hoạt động" : "Có vấn đề"} type={isUp ? "success" : "error"} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 min-h-[44px]">
          {status.message ||
            (isUp ? "Tất cả các kiểm tra đều ổn định" : "Kiểm tra thất bại hoặc timeout")}
        </p>
      </CardContent>
    </Card>
  );
}
