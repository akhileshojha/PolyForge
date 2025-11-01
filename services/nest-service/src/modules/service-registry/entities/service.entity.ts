import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Service extends Document {
  @Prop()
  name: string;

  @Prop()
  language: string;

  @Prop()
  version: string;

  @Prop()
  endpoint: string;

  @Prop()
  healthCheckUrl: string;

  @Prop([String])
  tags: string[];

  @Prop()
  status: string;

  @Prop()
  owner: string;

  @Prop()
  environment: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);