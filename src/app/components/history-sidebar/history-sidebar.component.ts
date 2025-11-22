import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryItem } from '../../interfaces/history-item';

@Component({
  selector: 'app-history-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-sidebar.component.html',
  styleUrls: ['./history-sidebar.component.css']
})
export class HistorySidebarComponent {
  @Input() history: HistoryItem[] = [];
  @Output() onSelectHistory = new EventEmitter<HistoryItem>();
  @Output() onClearHistory = new EventEmitter<void>();

  isCollapsed = false;

  toggleSidebar = (): void => {
    this.isCollapsed = !this.isCollapsed;
  };

  selectItem = (item: HistoryItem): void => {
    this.onSelectHistory.emit(item);
  };

  clearHistory = (): void => {
    if (confirm('¿Estás seguro de que deseas borrar todo el historial?')) {
      this.onClearHistory.emit();
    }
  };

  getMethodClass = (method: string): string => {
    return `method-badge method-${method.toLowerCase()}`;
  };

  formatTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  getShortUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + urlObj.pathname;
    } catch {
      return url;
    }
  };
}