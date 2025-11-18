export interface HttpHeader {
  key: string;
  value: string;
  enabled: boolean;
}

export interface ApiRequest {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: HttpHeader[];
  body?: string;
}