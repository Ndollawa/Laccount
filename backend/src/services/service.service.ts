import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Service, ActiveStatus } from '@prisma/client';
import { handleError, deleteItem } from '@app/common';
import { CreateServiceDto, UpdateServiceDto } from './dto';
import { ServiceRepository } from './service.repository';
import { join } from 'path';

@Injectable()
export class ServiceService {
  constructor(protected readonly serviceRepository: ServiceRepository) {}

  async find(id: string): Promise<Service> {
    try {
      return await this.serviceRepository.find({
        where: { id },
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
        throw new ConflictException(`Service with ${title} already exists.`);
      }

      const data = !file
        ? createServiceData
        : { ...createServiceData, image: file.filename };

      const newService = await this.serviceRepository.create({
        data,
      });
      return newService;
    } catch (error) {
      handleError(error);
    }
  }

  async update(
    id: string,
    updateServiceData: UpdateServiceDto,
    file: Express.Multer.File,
  ) {
    const destination = join('../../', 'uploads/settings/services');
    const data = !file
      ? updateServiceData
      : { ...updateServiceData, image: file.filename };
    try {
      const rec = await this.serviceRepository.update({
        where: { id },
        data,
        select: { image: true },
      });

      Logger.debug(rec.image);
      await deleteItem(destination, rec.image);
      return { message: 'Record updated successfully.' };
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(
    id: string,
    updateServiceData: UpdateServiceDto,
    file: Express.Multer.File,
  ) {
    const destination = join('../../', 'uploads/settings/services');
    const data = !file
      ? updateServiceData
      : { ...updateServiceData, image: file.filename };

    try {
      const rec = await this.serviceRepository.upsert({
        where: { id },
        data: updateServiceData,
        select: { image: true },
      });
      await deleteItem(destination, rec.image);
      return { message: 'Success' };
    } catch (error) {
      handleError(error);
    }
  }
}
