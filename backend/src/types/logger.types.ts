export interface LogEntry {
  message: string;
  level: string;
  timestamp?: string;
  splat?: unknown;
  stack?: string;
  [key: string]: unknown;
}
