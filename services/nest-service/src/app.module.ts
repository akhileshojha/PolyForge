import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceRegistryModule } from './modules/service-registry/service-registry.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://mongo:27017/polyforge'),
    ServiceRegistryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
