package main

import (
	"context"
	"embed"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/stdout/stdouttrace"
	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.17.0"
	// "go.opentelemetry.io/otel/trace"
)

//go:embed openapi.yaml
var embeddedFiles embed.FS

func initTracer() func(context.Context) error {
	// Minimal stdout exporter for local dev
	exporter, err := stdouttrace.New(stdouttrace.WithPrettyPrint())
	if err != nil {
		log.Fatalf("failed to create stdout exporter: %v", err)
	}
	tp := sdktrace.NewTracerProvider(
		sdktrace.WithBatcher(exporter),
		sdktrace.WithResource(resource.NewWithAttributes(
			semconv.SchemaURL,
			semconv.ServiceNameKey.String("go-service"),
		)),
	)
	otel.SetTracerProvider(tp)
	return tp.Shutdown
}

func main() {
	shutdown := initTracer()
	defer func() {
		if err := shutdown(context.Background()); err != nil {
			log.Printf("error shutting down tracer: %v", err)
		}
	}()

	r := gin.New()

	// simple tracing middleware
	r.Use(func(c *gin.Context) {
		tracer := otel.Tracer("go-service")
		ctx, span := tracer.Start(c.Request.Context(), c.Request.Method+" "+c.Request.URL.Path)
		defer span.End()
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// serve embedded openapi.yaml at /openapi.yaml
	r.GET("/openapi.yaml", func(c *gin.Context) {
		f, err := embeddedFiles.Open("openapi.yaml")
		if err != nil {
			c.String(http.StatusInternalServerError, "spec not found")
			return
		}
		defer f.Close()
		b, _ := io.ReadAll(f)
		c.Data(http.StatusOK, "application/x-yaml", b)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("failed to run server: %v", err)
	}
}
