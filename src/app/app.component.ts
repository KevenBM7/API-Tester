import { Component, ViewChild, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  @ViewChild('requestPanel') requestPanel!: RequestPanelComponent;

  response: ApiResponse | null = null;
  isLoading = false;
  history: HistoryItem[] = [];

  private readonly HISTORY_STORAGE_KEY = 'api-tester-history';

  ngOnInit(): void {
    this.loadHistoryFromStorage();
  }

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
    const requestData = this.requestPanel.getCurrentRequestData();
    const historyItem: HistoryItem = {
      id: `${Date.now()}-${Math.random()}`,
      url: requestData.url,
      method: requestData.method as any,
      headers: JSON.parse(JSON.stringify(requestData.headers)),
      body: requestData.body,
      timestamp: new Date(),
      status: response.status,
      responseTime: response.responseTime
    };

    this.history = [historyItem, ...this.history];

    if (this.history.length > 50) {
      this.history = this.history.slice(0, 50);
    }
    this.saveHistoryToStorage();
  };

  loadFromHistory = (item: HistoryItem): void => {
    if (this.requestPanel) {
      this.requestPanel.loadRequestData(
        item.url,
        item.method,
        item.headers,
        item.body
      );
    }
  };

  clearHistory = (): void => {
    this.history = [];
    this.saveHistoryToStorage();
  };

  private saveHistoryToStorage(): void {
    try {
      localStorage.setItem(this.HISTORY_STORAGE_KEY, JSON.stringify(this.history));
    } catch (e) {
      console.error('Error saving history to localStorage', e);
    }
  }

  private loadHistoryFromStorage(): void {
    const storedHistory = localStorage.getItem(this.HISTORY_STORAGE_KEY);
    if (storedHistory) {
      // Convertir el string de la fecha de vuelta a un objeto Date
      const parsedHistory: HistoryItem[] = JSON.parse(storedHistory); 
      this.history = parsedHistory.map(item => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
    }
  }
}