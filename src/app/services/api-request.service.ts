import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { ApiRequest } from '../interfaces/http-request';
import { ApiResponse } from '../interfaces/http-response';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  
  constructor(private http: HttpClient) {}

  async sendRequest(request: ApiRequest): Promise<ApiResponse> {
    const startTime = Date.now();
    
    try {
      const enabledHeaders = request.headers
        .filter((header) => header.enabled && header.key.trim() !== '')
        .reduce((acc, header) => {
          acc[header.key] = header.value;
          return acc;
        }, {} as { [key: string]: string });

      const httpHeaders = new HttpHeaders(enabledHeaders);

      const options = {
        headers: httpHeaders,
        observe: 'response' as const
      };

      let response$: Observable<HttpResponse<any>>;

      switch (request.method) {
        case 'GET':
          response$ = this.http.get(request.url, options);
          break;
        case 'POST':
          response$ = this.http.post(request.url, request.body || null, options);
          break;
        case 'PUT':
          response$ = this.http.put(request.url, request.body || null, options);
          break;
        case 'DELETE':
          response$ = this.http.delete(request.url, options);
          break;
        case 'PATCH':
          response$ = this.http.patch(request.url, request.body || null, options);
          break;
        default:
          throw new Error('Método HTTP no soportado');
      }

      const httpResponse = await firstValueFrom(response$);
      const responseTime = Date.now() - startTime;

      return {
        status: httpResponse.status,
        statusText: httpResponse.statusText,
        responseTime,
        body: httpResponse.body
      };

    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      return {
        status: error.status || 0,
        statusText: error.statusText || 'Network Error',
        responseTime,
        body: {
          error: error.message || 'Error desconocido',
          details: error.error || null
        }
      };
    }
  }
}