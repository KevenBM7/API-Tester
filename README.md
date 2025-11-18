# API Tester - Cliente REST

![Logo](https://raw.githubusercontent.com/user-attachments/assets/11a2f26c-851d-4467-932d-20999553754e)

Un cliente de API REST simple y ligero construido con Angular. Esta herramienta permite a los desarrolladores construir, enviar y probar peticiones HTTP directamente desde el navegador, de forma similar a herramientas como Postman o REQBIN.

## ✨ Características Principales

- **Constructor de Peticiones:** Crea peticiones HTTP complejas especificando:
  - Método HTTP (GET, POST, PUT, PATCH, DELETE).
  - URL del endpoint.
  - Cabeceras (Headers) personalizadas.
  - Cuerpo (Body) de la petición en formato JSON.
- **Visualizador de Respuestas:** Analiza la respuesta de la API con:
  - Código de estado (ej. `200 OK`, `404 Not Found`).
  - Tiempo de respuesta en milisegundos.
  - Cuerpo de la respuesta formateado y resaltado como JSON.
  - Opciones para copiar o descargar la respuesta.
- **Historial de Peticiones:**
  - Guarda automáticamente cada petición enviada en una barra lateral.
  - Vuelve a cargar cualquier petición anterior con un solo clic.
  - Limpia el historial cuando ya no es necesario.
- **Interfaz Reactiva:** La interfaz se actualiza en tiempo real, mostrando un estado de carga mientras se espera la respuesta y deshabilitando los controles para evitar peticiones duplicadas.

## 🛠️ Tecnologías Utilizadas

- **Framework:** Angular
- **Manejo de HTTP:** `HttpClient` de Angular
- **Estilos:** CSS puro con un diseño moderno y limpio.
- **Iconos:** Iconos SVG en línea para una carga rápida y una apariencia nítida.

## 🚀 Cómo Empezar

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### Prerrequisitos

Asegúrate de tener Node.js y el Angular CLI instalados.

### Instalación y Ejecución

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd api-tester
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    ng serve
    ```

4.  Abre tu navegador y ve a `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.