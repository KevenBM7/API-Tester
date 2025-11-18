import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RequestPanelComponent } from './components/request-panel/request-panel.component';
import { ResponsePanelComponent } from './components/response-panel/response-panel.component';
import { HistorySidebarComponent } from './components/history-sidebar/history-sidebar.component';
import { ApiResponse } from './interfaces/http-response';
import { HistoryItem } from './interfaces/history-item';
import { HttpHeader } from './interfaces/http-request';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RequestPanelComponent,
    ResponsePanelComponent,
    HistorySidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('requestPanel') requestPanel!: RequestPanelComponent;

  response: ApiResponse | null = null;
  isLoading = false;
  history: HistoryItem[] = [];

  private currentUrl = '';
  private currentMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET';
  private currentHeaders: HttpHeader[] = [];
  private currentBody = '';

  ngAfterViewInit(): void {
  }

  updateCurrentRequest = (data: { url: string; method: string; headers: HttpHeader[]; body: string }): void => {
    this.currentUrl = data.url;
    this.currentMethod = data.method as any;
    this.currentHeaders = data.headers;
    this.currentBody = data.body;
  };

  handleResponse = async (responsePromise: Promise<ApiResponse>) => {
    this.isLoading = true;
    this.response = null;
    
    try {
      const result = await responsePromise;
      this.response = result;
      this.addToHistory(result);
    } catch (error) {
      console.error('Error al procesar respuesta:', error);
    } finally {
      this.isLoading = false;
    }
  };

  addToHistory = (response: ApiResponse): void => {
    const historyItem: HistoryItem = {
      id: `${Date.now()}-${Math.random()}`,
      url: this.currentUrl,
      method: this.currentMethod,
      timestamp: new Date(),
      status: response.status,
      responseTime: response.responseTime
    };

    this.history = [historyItem, ...this.history];

    if (this.history.length > 50) {
      this.history = this.history.slice(0, 50);
    }
  };

  loadFromHistory = (item: HistoryItem): void => {
    if (this.requestPanel) {
      const defaultHeaders: HttpHeader[] = [
        { key: 'Content-Type', value: 'application/json', enabled: true }
      ];
      
      this.requestPanel.loadRequestData(
        item.url,
        item.method,
        defaultHeaders,
        ''
      );

      this.currentUrl = item.url;
      this.currentMethod = item.method;
      this.currentHeaders = defaultHeaders;
      this.currentBody = '';
    }
  };

  clearHistory = (): void => {
    this.history = [];
  };
}