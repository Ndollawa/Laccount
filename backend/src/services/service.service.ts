import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Service, ActiveStatus } from '@prisma/client';
import { handleError } from '@app/common';
import { CreateServiceDto, UpdateServiceDto } from './dto';
import { ServiceRepository } from './service.repository';

@Injectable()
export class ServiceService {
  constructor(protected readonly serviceRepository: ServiceRepository) {}

  async find(id: string): Promise<Service> {
    try {
      return await this.serviceRepository.find({
        where: { id },
        // include: { author: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Service[]> {
    try {
      return await this.serviceRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Service> {
    try {
      return await this.serviceRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(
    createServiceData: CreateServiceDto,
    file: Express.Multer.File,
  ): Promise<Service> {
    const { title } = createServiceData;

    try {
      const existingService = await this.serviceRepository.exists({
        where: { title },
      });

      if (existingService) {
        throw new ConflictException('Service with credentials already exists.');
      }

      const serviceData = {
        ...createServiceData,
        image: file.filename,
      };

      const newService = await this.serviceRepository.create({
        data: serviceData,
      });
      Logger.debug(newService);
      return newService;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(
    id: string,
    updateServiceData: UpdateServiceDto,
    file: Express.Multer.File,
  ) {
    const data = file
    ? updateServiceData
      : { ...updateServiceData, image: file.filename }
    try {
      return await this.serviceRepository.update({
        where: { id },
        data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateServiceData: UpdateServiceDto) {
    Logger.debug(updateServiceData);

    try {
      return await this.serviceRepository.upsert({
        where: { id },
        data: updateServiceData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
