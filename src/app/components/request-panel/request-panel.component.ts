import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiRequestService } from '../../services/api-request.service';
import { HttpHeader, ApiRequest } from '../../interfaces/http-request';
import { ApiResponse } from '../../interfaces/http-response';

@Component({
  selector: 'app-request-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-panel.component.html',
  styleUrls: ['./request-panel.component.css']
})
export class RequestPanelComponent {
  @Output() onSendRequest = new EventEmitter<Promise<ApiResponse>>();
  @Output() onRequestChange = new EventEmitter<{ url: string; method: string; headers: HttpHeader[]; body: string }>();
  
  @Input() isLoading = false;

  // Propiedades del formulario
  url = 'https://jsonplaceholder.typicode.com/users';
  selectedMethod: ApiRequest['method'] = 'GET';
  body = '';
  headers: HttpHeader[] = [
    { key: 'Content-Type', value: 'application/json', enabled: true }
  ];

  methods: Array<ApiRequest['method']> = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  constructor(private apiService: ApiRequestService) {}

  // ✨ Método público para cargar datos desde el padre
  loadRequestData(url: string, method: ApiRequest['method'], headers?: HttpHeader[], body?: string): void {
    this.url = url;
    this.selectedMethod = method;
    if (headers && headers.length > 0) {
      this.headers = [...headers];
    }
    if (body) {
      this.body = body;
    }
  }

  addHeader = (): void => {
    this.headers.push({ key: '', value: '', enabled: true });
  };

  removeHeader = (index: number): void => {
    this.headers.splice(index, 1);
  };

  getMethodColor = (method: string): string => {
    const colors: { [key: string]: string } = {
      'GET': 'method-get',
      'POST': 'method-post',
      'PUT': 'method-put',
      'DELETE': 'method-delete',
      'PATCH': 'method-patch'
    };
    return colors[method] || 'method-get';
  };

  showBodyInput = (): boolean => {
    return ['POST', 'PUT', 'PATCH'].includes(this.selectedMethod);
  };

  sendRequest = (): void => {
    if (!this.url.trim()) {
      alert('Por favor ingresa una URL válida');
      return;
    }

    //cambios antes de enviar
    this.onRequestChange.emit({
      url: this.url,
      method: this.selectedMethod,
      headers: this.headers,
      body: this.body
    });

    const request: ApiRequest = {
      url: this.url,
      method: this.selectedMethod,
      headers: this.headers,
      body: this.body || undefined
    };

    const responsePromise = this.apiService.sendRequest(request);
    this.onSendRequest.emit(responsePromise);
  };
}