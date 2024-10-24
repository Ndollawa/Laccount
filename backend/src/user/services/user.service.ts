import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as grpc from '@grpc/grpc-js';
import { User, WalletType } from '@prisma/client';
import { hashData, handleError } from '@app/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserRolesEnum, UserRolesKeysEnum } from '../enums/user-roles';

const { ALREADY_EXISTS, UNAUTHENTICATED } = grpc.status;

@Injectable()
export class UserService {
  constructor(
    protected readonly userRepository: UserRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async find(query: any): Promise<User> {
    try {
      return await this.userRepository.find(query);
    } catch (error) {
      handleError(error);
    }
  }

  async findFirst(query: any): Promise<User> {
    try {
      return await this.userRepository.findFirst(query);
    } catch (error) {
      handleError(error);
    }
  }

  async exists(query: any): Promise<boolean> {
    try {
      return await this.userRepository.exists(query);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<User[]> {
    try {
      return await this.userRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }

  async create(query: any): Promise<User> {
    try {
      const newUser = await this.userRepository.create({
        data: query,
      });

      delete newUser.password;
      this.eventEmitter.emit('user-created', newUser);
      return newUser;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      return await this.userRepository.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, data: UpdateUserDto) {
    try {
      return await this.userRepository.upsert({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return await this.userRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
}
