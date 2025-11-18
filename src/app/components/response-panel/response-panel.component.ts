import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../interfaces/http-response';

@Component({
  selector: 'app-response-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response-panel.component.html',
  styleUrls: ['./response-panel.component.css']
})
export class ResponsePanelComponent {
  @Input() response: ApiResponse | null = null;

  // Función de flecha (buena práctica)
  formatJson = (data: any): string => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  // Función de flecha (buena práctica)
  copyToClipboard = (): void => {
    if (this.response) {
      const text = this.formatJson(this.response.body);
      navigator.clipboard.writeText(text).then(() => {
        alert('Copiado al portapapeles');
      });
    }
  };

  // Función de flecha (buena práctica)
  downloadResponse = (): void => {
    if (this.response) {
      const text = this.formatJson(this.response.body);
      const blob = new Blob([text], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `response-${Date.now()}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  // Función de flecha (buena práctica)
  isSuccessStatus = (): boolean => {
    return this.response ? this.response.status >= 200 && this.response.status < 300 : false;
  };
}