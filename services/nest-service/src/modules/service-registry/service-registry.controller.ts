import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ServiceRegistryService } from './service-registry.service';
import { CreateServiceDto } from './dto/service-registry.dto';

@ApiTags('services')
@Controller('services')
export class ServiceRegistryController {
  constructor(private readonly registryService: ServiceRegistryService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new microservice' })
  @ApiBody({ type: CreateServiceDto })
  @ApiResponse({ status: 201, description: 'Service registered successfully' })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.registryService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all registered services' })
  findAll() {
    return this.registryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of one service' })
  findOne(@Param('id') id: string) {
    return this.registryService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update service metadata' })
  update(@Param('id') id: string, @Body() body: CreateServiceDto) {
    return this.registryService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a service entry' })
  remove(@Param('id') id: string) {
    return this.registryService.remove(id);
  }
}