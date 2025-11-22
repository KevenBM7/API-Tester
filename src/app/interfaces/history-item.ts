import { HttpHeader } from "./http-request";

export interface HistoryItem {
  id: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: HttpHeader[];
  body: string;
  timestamp: Date;
  status?: number;
  responseTime?: number;
}