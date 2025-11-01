import { Injectable, NestMiddleware } from '@nestjs/common';
import { trace } from '@opentelemetry/api';

@Injectable()
export class TelemetryMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const tracer = trace.getTracer('nest-service');
    tracer.startActiveSpan(`HTTP ${req.method} ${req.url}`, span => {
      res.on('finish', () => {
        span.setAttribute('http.status_code', res.statusCode);
        span.end();
      });
      next();
    });
  }
}
