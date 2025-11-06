FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/shared/package*.json ./backend/shared/
COPY backend/services/auth/package*.json ./backend/services/auth/

# Install dependencies
RUN npm ci --workspace=@procurement/shared
RUN npm ci --workspace=@procurement/auth-service

# Copy source
COPY backend/shared ./backend/shared
COPY backend/services/auth ./backend/services/auth

# Build shared package first
WORKDIR /app/backend/shared
RUN npm run build

# Build service
WORKDIR /app/backend/services/auth
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
COPY backend/shared/package*.json ./backend/shared/
COPY backend/services/auth/package*.json ./backend/services/auth/

RUN npm ci --workspace=@procurement/shared --only=production
RUN npm ci --workspace=@procurement/auth-service --only=production

# Copy built files
COPY --from=builder /app/backend/shared/dist ./backend/shared/dist
COPY --from=builder /app/backend/services/auth/dist ./backend/services/auth/dist

WORKDIR /app/backend/services/auth

EXPOSE 3001

CMD ["node", "dist/main.js"]
