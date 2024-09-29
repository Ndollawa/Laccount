import { Injectable, Logger } from '@nestjs/common';
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
  async create(createServiceData: CreateServiceDto): Promise<Service> {
    // const { authorId } = createServiceData;

    try {
      // const existingService = await this.serviceRepository.exists({
      //   where: { serviceId },
      // });

      // if (existingService) {
      //   throw new HttpException(
      //     'Service with credentials already exists.',
      //     HttpStatus.CONFLICT,
      //   );
      // }

      const serviceData = {
        ...createServiceData,
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

  async update(id: string, updateServiceData: UpdateServiceDto) {
    try {
      return await this.serviceRepository.update({
        where: { id },
        data: updateServiceData,
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
