export interface ApiResponse {
  status: number;
  statusText: string;
  responseTime: number;
  body: any;
  headers?: { [key: string]: string };
}