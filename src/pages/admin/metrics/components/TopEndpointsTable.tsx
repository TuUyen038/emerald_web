import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TopEndpointsTableProps {
  endpoints: Array<{ path: string; count: number }>;
}

export default function TopEndpointsTable({ endpoints }: TopEndpointsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Endpoint</TableHead>
          <TableHead className="text-right">Số lần gọi (30s)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {endpoints.length > 0 ? (
          endpoints.map((ep, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-mono text-sm">{ep.path}</TableCell>
              <TableCell className="text-right font-semibold">{ep.count}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2} className="text-center text-gray-500 py-8">
              Chưa có dữ liệu
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
