
⸻

🧠 Verify Your Setup

1️⃣ Rebuild fresh

docker-compose -f docker-compose.dev.yml build --no-cache nest-service

2️⃣ Start stack

docker-compose -f docker-compose.dev.yml up

3️⃣ Expected output

[nodemon] starting `ts-node -r tsconfig-paths/register src/main.ts`
[NestFactory] Starting Nest application...
[NestApplication] Listening on port 3000

4️⃣ Test hot reload

Edit app.service.ts → save → container auto restarts:

[nodemon] restarting due to changes...


⸻

🧰 Pro Tip

If Docker on macOS feels sluggish on file changes, add this tweak under nest-service in your compose file:

    develop:
      watch:
        - path: ./services/nest-service
          target: /app
          action: sync

That uses Docker’s native sync for faster reloads.

⸻