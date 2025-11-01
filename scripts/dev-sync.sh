#!/bin/bash
set -e

# --- CONFIGURATION ---
NEST_SERVICE="nest-service"
GO_SERVICE="go-service"
COMPOSE_FILE="docker-compose.dev.yml"

# --- COLOR LOGGING ---
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
RESET="\033[0m"

log() {
  echo -e "${GREEN}[PolyForge]${RESET} $1"
}

warn() {
  echo -e "${YELLOW}[PolyForge]${RESET} ⚠️ $1"
}

error() {
  echo -e "${RED}[PolyForge ERROR]${RESET} ❌ $1"
}

# --- CHECK IF DOCKER IS RUNNING ---
if ! docker info >/dev/null 2>&1; then
  error "Docker daemon is not running. Please start Docker first."
  exit 1
fi

# --- HASH CURRENT STATE ---
HASH_FILE=".last_build_hash"
CURRENT_HASH=$(find ./services/nest-service ./services/go-service -name "Dockerfile*" -o -name "package.json" -o -name "pnpm-lock.yaml" -o -name "go.mod" | sort | xargs cat | sha256sum | awk '{print $1}')

# --- DECISION LOGIC ---
if [ -f "$HASH_FILE" ]; then
  PREV_HASH=$(cat "$HASH_FILE")
else
  PREV_HASH=""
fi

if [ "$CURRENT_HASH" != "$PREV_HASH" ]; then
  warn "Detected dependency or Dockerfile changes."
  log "Rebuilding images for updated services..."
  docker-compose -f $COMPOSE_FILE build --no-cache $NEST_SERVICE $GO_SERVICE
  echo "$CURRENT_HASH" > "$HASH_FILE"
else
  log "No dependency or Dockerfile changes detected — skipping rebuild."
fi

# --- CHECK RUNNING CONTAINERS ---
if docker ps --format '{{.Names}}' | grep -q "$NEST_SERVICE"; then
  log "Restarting existing containers..."
  docker-compose -f $COMPOSE_FILE up -d
else
  log "Starting fresh containers..."
  docker-compose -f $COMPOSE_FILE up -d
fi

log "✅ PolyForge stack is running!"