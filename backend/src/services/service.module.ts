import { Module } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { ServiceService } from './service.service';
import { ServiceRepository } from './service.repository';
import { ServiceController } from './service.controller';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository, PrismaService],
})
export class ServiceModule {}
