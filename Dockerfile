FROM node:22.12.0-alpine AS dev-deps
WORKDIR /app
COPY ./package.json .
RUN npm install

FROM node:22.12.0-alpine AS prod-deps
WORKDIR /app
COPY ./package.json .
RUN npm install --omit=dev

FROM node:22.12.0-alpine AS dev
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
CMD ["npm", "run dev"]

FROM node:22.12.0-alpine AS prod
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY ./src ./src
COPY ./.env ./.env
COPY ./package.json ./package.json
CMD ["node", "./src/index.js"]

FROM php:8.4-fpm AS php-fpm

RUN apt-get update && apt-get upgrade -y
RUN apt-get install unzip libssl-dev -y

RUN curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php

RUN cd ~

RUN HASH=`curl -sS https://composer.github.io/installer.sig`
RUN php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer

CMD ["php-fpm"]