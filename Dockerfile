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