FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY backend/shared/package*.json ./backend/shared/
COPY backend/services/rfp/package*.json ./backend/services/rfp/

RUN npm ci --workspace=@procurement/shared
RUN npm ci --workspace=@procurement/rfp-service

COPY backend/shared ./backend/shared
COPY backend/services/rfp ./backend/services/rfp

WORKDIR /app/backend/shared
RUN npm run build

WORKDIR /app/backend/services/rfp
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY backend/shared/package*.json ./backend/shared/
COPY backend/services/rfp/package*.json ./backend/services/rfp/

RUN npm ci --workspace=@procurement/shared --only=production
RUN npm ci --workspace=@procurement/rfp-service --only=production

COPY --from=builder /app/backend/shared/dist ./backend/shared/dist
COPY --from=builder /app/backend/services/rfp/dist ./backend/services/rfp/dist

WORKDIR /app/backend/services/rfp

EXPOSE 3002

CMD ["node", "dist/main.js"]
