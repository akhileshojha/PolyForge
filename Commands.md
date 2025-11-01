# Enterprise Template Service

This repository contains two core microservices — a **NestJS service** and a **Go service** — instrumented for telemetry via **OpenTelemetry Collector**.  
All services are dockerized and can be run locally or deployed to a Linux/ARM64 target.

---

## 📁 Project Structure

/services
├─ nest-service/      # Node.js (NestJS + TypeScript + pnpm)
├─ go-service/        # Go microservice (linux/arm64 build target)
└─ docker-compose.yml # Unified stack with OpenTelemetry Collector

---

## 🧩 Prerequisites

- Node.js v20+  
- Go 1.23+  
- Docker & Docker Compose  
- `pnpm` (recommended over npm/yarn)

Install pnpm:
```bash
npm install -g pnpm


⸻

🚀 1. Running the NestJS Service Locally

Setup & Build

cd services/nest-service
pnpm install
pnpm run build

If you see a TypeScript config error, ensure tsconfig.json exists in this directory.

Start in Development Mode

pnpm run start:dev

Start in Production Mode

pnpm run start:prod

Default Port: 3000
Endpoints:
	•	Health check → GET /health
	•	Swagger Docs → GET /docs

Environment Variables (.env)

PORT=3000
OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317
SERVICE_NAME=nest-service


⸻

⚙️ 2. Running the Go Service Locally

Build for Linux/ARM64

cd services/go-service
GOOS=linux GOARCH=arm64 go build -o app main.go

Run Locally

go run main.go

Default Port: 8080

Environment Variables (.env)

PORT=8080
OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317
SERVICE_NAME=go-service


⸻

🐳 3. Running Everything via Docker

Build All Images

docker-compose build --no-cache

Start the Stack

docker-compose up

This spins up:
	•	nest-service (Node.js app)
	•	go-service (Go app)
	•	otel-collector (receives telemetry data)
	•	Any configured backend (e.g., Prometheus, Jaeger, Grafana)

Tear Down

docker-compose down -v


⸻

📡 4. OpenTelemetry Collector

The included otel-collector-config.yaml provides a minimal working configuration:

receivers:
  otlp:
    protocols:
      grpc:
      http:

exporters:
  logging:
    loglevel: debug

service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [logging]

Collector listens on 4317 (gRPC) and 4318 (HTTP).

⸻

🧠 5. Troubleshooting

Issue	Likely Cause	Fix
Could not find tsconfig.json	Running from wrong path	cd services/nest-service before build
port already in use	Conflicting service	Change port in .env
Telemetry not visible	Collector endpoint misconfigured	Check OTEL_EXPORTER_OTLP_ENDPOINT
Build fails on M1 Mac	Arch mismatch	Rebuild using GOARCH=arm64 or docker-compose build --platform linux/arm64


⸻

🧰 6. Useful Commands

Action	Command
Run tests (Nest)	pnpm test
Lint (Nest)	pnpm lint
Go mod tidy	go mod tidy
View running containers	docker ps
View logs	docker-compose logs -f


⸻

🏁 Next Steps
	•	Integrate Jaeger or Grafana Tempo for tracing visualization.
	•	Extend metrics pipeline to Prometheus + Grafana dashboards.
	•	Add CI/CD pipeline for automated ARM64 builds and push to container registry.

⸻

Maintainer: Akhilesh Kumar Ojha
Role: Consultant Engineering (Full Stack / Solution Architecture Track)
Tech Stack: NestJS · Go · Docker · OpenTelemetry

---
