# Go + Nest Compose (local)

This package contains:
- a Go (Gin) microservice (services/go-service) that serves /health and /openapi.yaml
- a Docker Compose file that expects a sibling 'nest-service' directory (your existing NestJS service)
- an OpenTelemetry Collector (stdout exporter) configured for local development

## Run locally

1. Place your existing `nest-service/` folder next to this folder (same parent).
2. Build and start:
   docker compose up --build

3. Verify:
   - NestJS docs: http://localhost:3000/docs
   - NestJS health: http://localhost:3000/health
   - Go health: http://localhost:3001/health
   - Go openapi: http://localhost:3001/openapi.yaml

