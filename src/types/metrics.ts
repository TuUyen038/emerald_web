export interface MetricSnapshot {
  metricName: string;
  value: number;
  labels: Record<string, any> | null;
  createdAt: string;
  windowSeconds?: number;
}

export interface TimeSeriesData {
  [metricName: string]: Array<{
    timestamp: string;
    value: number;
    labels?: any;
  }>;
}

export interface LatestMetrics {
  avg_response_time?: MetricSnapshot;
  p95_response_time?: MetricSnapshot;
  error_rate?: MetricSnapshot;
  total_requests?: MetricSnapshot;
  top_endpoints?: MetricSnapshot;
}
