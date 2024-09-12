import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as grpc from '@grpc/grpc-js';
import { User,WalletType } from '@prisma/client';
import { hashData, handleError } from '@app/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto';

const { ALREADY_EXISTS, UNAUTHENTICATED } = grpc.status;

@Injectable()
export class UserService {
  constructor(
    protected readonly userRepository: UserRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async findUser(query: any): Promise<User> {
    try {
      return await this.userRepository.find({
        where: query,
        include: { profile: true, roles: true, refreshTokens: true , wallet:true},
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAllUsers(query: any): Promise<User[]> {
    try {
      return await this.userRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }

  async createUser(createUserData: CreateUserDto): Promise<User> {
    const { firstName, lastName, username, email, password, confirmPassword } =
      createUserData;

    if (password !== confirmPassword) {
      throw new UnauthorizedException({
        code: UNAUTHENTICATED,
        message: 'Password mismatch',
      });
    }

    try {
      const existingUser = await this.userRepository.exists({
        where: { OR: [{ email }, { username }] },
      });

      if (existingUser) {
        throw new ConflictException({
          code: ALREADY_EXISTS,
          message: 'User with credentials already exists.',
        });
      }

      const hashedPassword = await hashData(password, 10);
      const userData = {
        username,
        email,
        password: hashedPassword,
        verificationStatus: false,
        roles: {
          create: {
            role: 'user',
            code: '3000',
          },
        },
        profile: {
          create: {
            firstName,
            lastName,
          },
        },
        wallet:{
          create:{
            balance:0,
            type: WalletType.CREDIT,
            currency:{
              name:'LA'
            }
          }
        }
      };

      const newUser = await this.userRepository.create({
        data: userData,
      });

      delete newUser.password;
      this.eventEmitter.emit('user-created', newUser);
      return newUser;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async updateUser(id: string, data: UpdateUserDto) {
    Logger.debug(data);
    try {
      return await this.userRepository.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsertUser(id: string, data: UpdateUserDto) {
    Logger.debug(data);
    try {
      return await this.userRepository.upsert({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async removeUser(id: string): Promise<User> {
    try {
      return await this.userRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }


}
