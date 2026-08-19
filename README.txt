EL SABOR DE NUESTRA TIERRA - PWA

Archivos:
- index.html: estructura de la aplicación
- style.css: diseño responsive para PC, tablet y celular
- app.js: interactividad, cuestionario e instalación PWA
- manifest.json: configuración de aplicación instalable
- sw.js: Service Worker y caché offline
- img/: logo proporcionado y recursos gráficos

PARA PROBARLA:
1. Descomprime la carpeta.
2. Abre una terminal dentro de la carpeta.
3. Ejecuta un servidor local, por ejemplo:
   python -m http.server 8000
4. Entra en:
   http://localhost:8000
5. Desde Chrome/Edge podrás usar "Instalar app" cuando el navegador lo permita.

IMPORTANTE:
Una PWA necesita HTTPS o localhost para que el Service Worker funcione.
No es necesario instalar ninguna librería externa.
