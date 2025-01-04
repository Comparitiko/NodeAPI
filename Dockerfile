FROM node:22.12.0-alpine AS back-dev-deps
WORKDIR /app
COPY backend/package.json .
RUN npm install

FROM node:22.12.0-alpine AS back-dev
WORKDIR /app
COPY --from=back-dev-deps /app/node_modules ./node_modules
CMD ["npm", "run dev"]

FROM node:22.12.0-alpine AS back-prod-deps
WORKDIR /app
COPY backend/package.json .
RUN npm install --omit=dev

FROM node:22.12.0-alpine AS back-prod
WORKDIR /app
COPY --from=back-prod-deps /app/node_modules ./node_modules
COPY backend/src ./src
COPY .env ./.env
COPY backend/package.json ./package.json
CMD ["node", "./src/index.js"]

FROM node:22.12.0-alpine AS front-prod-deps
WORKDIR /app
COPY frontend/package.json .
RUN npm install --omit=dev

FROM node:22.12.0-alpine AS front-build
WORKDIR /app
COPY --from=front-prod-deps /app/node_modules ./node_modules
COPY ./frontend .
COPY .env ./.env
RUN npm run build

FROM nginx:1.27.1 AS front-prod
WORKDIR /var/www/html
RUN rm -rf ./* # Remove default nginx website
COPY --from=front-build /app/dist ./
COPY ./nginx/default.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]