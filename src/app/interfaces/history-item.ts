export interface HistoryItem {
  id: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  timestamp: Date;
  status?: number;
  responseTime?: number;
}