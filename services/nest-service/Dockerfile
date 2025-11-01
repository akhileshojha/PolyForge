# --- Development Dockerfile for NestJS ---
FROM node:20-alpine
WORKDIR /app

# Copy only the essentials first
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source
COPY . .
RUN pnpm run build

# Expose app port
EXPOSE 3000

# Start in dev mode with live reload
CMD ["pnpm", "run", "start:dev"]
