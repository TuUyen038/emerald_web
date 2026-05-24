export interface HealthComponent {
  status: "up" | "down";
  message?: string;
}

export interface HealthCheck {
  status: "ok" | "error";
  info: Record<string, HealthComponent>;
  error: Record<string, any>;
  details?: any;
}
