# Imagen de producción (IAP, build pack dockerfile). Equivale al build pack
# "static" de antes, pero aplica los parches de Alpine: nginx:alpine puede
# publicarse con paquetes ya corregidos en los repositorios (brotli-libs, curl).
FROM nginx:alpine
RUN apk upgrade --no-cache
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html app.js data.js data-personas.js style.css /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
EXPOSE 80
