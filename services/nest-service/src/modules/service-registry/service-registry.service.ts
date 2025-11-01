// src/modules/service-registry/service-registry.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceRegistryService {
  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
  ) {}

  async create(data: Partial<Service>): Promise<Service> {
    const service = new this.serviceModel(data);
    return service.save();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) throw new NotFoundException(`Service with ID ${id} not found`);
    return service;
  }

  async update(id: string, updateData: Partial<Service>): Promise<Service> {
    const updated = await this.serviceModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Service with ID ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.serviceModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Service with ID ${id} not found`);
  }
}