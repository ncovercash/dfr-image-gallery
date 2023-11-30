FROM node:20-alpine AS build

  WORKDIR /app

  COPY package.json .
  COPY yarn.lock .

  RUN yarn install --frozen-lockfile

  COPY public public
  COPY src src
  COPY tsconfig.json tsconfig.json

  RUN yarn run build

FROM trafex/php-nginx:latest AS final

  COPY --from=build /app/build /var/www/html/Gallery

  USER root

  RUN sed -i -E 's|try_files \$uri \$uri/.+|try_files \$uri \$uri/ /Gallery/index.html;|' /etc/nginx/conf.d/default.conf

  USER nobody
