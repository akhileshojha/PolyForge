import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TelemetryMiddleware } from './common/telemetry.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new TelemetryMiddleware().use);
  const config = new DocumentBuilder()
    .setTitle('Template Service')
    .setDescription('NestJS Service API with OpenAPI + Telemetry')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
  console.log('Nest service running on http://localhost:3000');
  console.log('Swagger docs available at http://localhost:3000/docs');
}
bootstrap();