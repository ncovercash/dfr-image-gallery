FROM node:20-alpine AS build

  WORKDIR /app

  COPY package.json .
  COPY yarn.lock .

  RUN yarn install --frozen-lockfile

  COPY public public
  COPY src src
  COPY tsconfig.json tsconfig.json

  RUN yarn run build

FROM ghcr.io/ncovercash/docker-php-nginx:v1.0.2 AS final

  COPY --from=build /app/build /var/www/html/Gallery

  USER root

  RUN sed -i -E 's|try_files \$uri \$uri/.+|try_files \$uri \$uri/ /Gallery/index.html;|' /etc/nginx/conf.d/default.conf

  # We require UID 1000. Don't love this, but here we are.
  RUN adduser -D -u 1000 --ingroup www-data www-data

  # Make sure files/folders needed by the processes are accessable when they run under the nobody user
  RUN chown -R www-data.www-data /var/www/html /run /var/lib/nginx /var/log/nginx

  USER www-data

  EXPOSE 8080

  CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
