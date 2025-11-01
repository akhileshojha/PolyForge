import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsUrl } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'auth-service', description: 'Unique service name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'nodejs', description: 'Service language' })
  @IsString()
  language: string;

  @ApiProperty({ example: '1.0.0', description: 'Version tag' })
  @IsString()
  version: string;

  @ApiProperty({ example: 'http://localhost:3000', description: 'Service endpoint' })
  @IsUrl()
  endpoint: string;

  @ApiProperty({ example: 'http://localhost:3000/health', description: 'Health check URL' })
  @IsUrl()
  healthCheckUrl: string;

  @ApiProperty({ example: ['auth', 'security'], description: 'Tags or capabilities' })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({ example: 'active', description: 'Service status' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ example: 'Akhilesh Ojha', description: 'Owner of the service' })
  @IsString()
  owner: string;

  @ApiProperty({ example: 'development', description: 'Environment (dev/staging/prod)' })
  @IsString()
  environment: string;
}