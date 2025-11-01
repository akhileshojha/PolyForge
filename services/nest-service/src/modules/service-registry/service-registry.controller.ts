// src/modules/service-registry/service-registry.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServiceRegistryService } from './service-registry.service';
import { Service } from './entities/service.entity';

@Controller('services')
export class ServiceRegistryController {
  constructor(private readonly registryService: ServiceRegistryService) {}

  @Post()
  create(@Body() body: Partial<Service>) {
    return this.registryService.create(body);
  }

  @Get()
  findAll() {
    return this.registryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registryService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Service>) {
    return this.registryService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registryService.remove(id);
  }
}