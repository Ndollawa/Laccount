import { Injectable } from '@nestjs/common';
import { RepositoryInterface, FF } from '../interfaces/repository.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export abstract class PrismaBaseRepository<M, C, R, U, D>
  implements RepositoryInterface<M>
{
  constructor(private readonly prismaModel: any) {}

  async create(createArgs: C): Promise<M> {
    return await this.prismaModel.create(createArgs);
  }

  async createMany(createArgs: C[]): Promise<M[]> {
    return await this.prismaModel.createMany(createArgs);
  }

  async find(queryFilterArgs: R): Promise<M | null> {
    return await this.prismaModel.findUnique(queryFilterArgs);
  }

  async findMany(queryFilterArgs: R): Promise<M[]> {
    return await this.prismaModel.findMany(queryFilterArgs);
  }

  async findUniqueOrThrow(queryFilterArgs: R): Promise<M> {
    return await this.prismaModel.findUniqueOrThrow(queryFilterArgs);
  }

  async exists(queryFilterArgs: R): Promise<boolean> {
    const count = await this.prismaModel.count(queryFilterArgs);
    return count > 0;
  }

  async findFirst(queryFilterArgs: R): Promise<M | null> {
    return await this.prismaModel.findFirst(queryFilterArgs);
  }

  async findFirstOrThrow(queryFilterArgs: R): Promise<M> {
    return await this.prismaModel.findFirstOrThrow(queryFilterArgs);
  }

  async upsert(queryUpdateArgs: U): Promise<M> {
    return await this.prismaModel.upsert(queryUpdateArgs);
  }

  async update(queryUpdateArgs: U): Promise<M> {
    return await this.prismaModel.update(queryUpdateArgs);
  }

  async updateMany(queryUpdateArgs: U): Promise<any> {
    return await this.prismaModel.updateMany(queryUpdateArgs);
  }

  async delete(queryDeleteArgs: D): Promise<M> {
    return await this.prismaModel.delete(queryDeleteArgs);
  }

  async deleteMany(queryDeleteArgs: D): Promise<any> {
    return await this.prismaModel.deleteMany(queryDeleteArgs);
  }

  async aggregate(queryFilterArgs: R): Promise<any> {
    return await this.prismaModel.aggregate(queryFilterArgs);
  }

  async groupBy(queryFilterArgs: R): Promise<any> {
    return await this.prismaModel.groupBy(queryFilterArgs);
  }

  async count(queryFilterArgs: R): Promise<number> {
    return await this.prismaModel.count(queryFilterArgs);
  }
}
