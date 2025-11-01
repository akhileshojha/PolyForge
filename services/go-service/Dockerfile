FROM golang:1.23.0-alpine AS builder
WORKDIR /src
COPY . .
# build for linux/arm64 as requested
RUN GOOS=linux GOARCH=arm64 go build -o /bin/go-service ./cmd

FROM alpine:3.18
COPY --from=builder /bin/go-service /bin/go-service
EXPOSE 3001
CMD ["/bin/go-service"]
