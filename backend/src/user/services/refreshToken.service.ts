import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as grpc from '@grpc/grpc-js';
import { ClientProxy } from '@nestjs/microservices';
import { RefreshToken } from '@prisma/client';
import {
  hashData,
  handleError,
  COMMUNICATION_SERVICE,
  compareHashData,
} from '@app/common';

import { RefreshTokenRepository } from '../repositories/refreshToken.repository';
import { CreateRefreshTokenDto, UpdateRefreshTokenDto } from '../dto';

const { ALREADY_EXISTS, UNAUTHENTICATED } = grpc.status;

@Injectable()
export class RefreshTokenService {
  constructor(
    protected readonly refreshTokenRepository: RefreshTokenRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}
  async find(id: string): Promise<RefreshToken> {
    try {
      return await this.refreshTokenRepository.find({
        where: { id },
        include: {
          user: {
            include: {
              profile: true,
              roles: true,
              wallets: true,
            },
          },
        },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<RefreshToken[]> {
    try {
      return await this.refreshTokenRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }

  async create(
    createRefreshTokenData: CreateRefreshTokenDto,
  ): Promise<RefreshToken> {
    const { userId, refreshToken } = createRefreshTokenData;
    const hashedRefreshToken = await hashData(refreshToken, 10);
    try {
      // if (await this.checkRefreshToken(refreshToken)) {
      //   throw new RpcException({
      //     code: ALREADY_EXISTS,
      //      message: 'RefreshToken with credentials already exist.',
      //   });
      // }

      const RefreshTokenData = {
        refreshToken: hashedRefreshToken,
        user: {
          connect: {
            id: userId,
          },
        },
      };
      // delete RefreshTokenData.confirmPassword;

      const newRefreshToken = await this.refreshTokenRepository.create({
        data: RefreshTokenData,
        include: { user: true },
      });
      this.eventEmitter.emit('RefreshToken-created', newRefreshToken);
      return newRefreshToken;
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string, data: UpdateRefreshTokenDto) {
    try {
      return await this.refreshTokenRepository.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, data: UpdateRefreshTokenDto) {
    try {
      return await this.refreshTokenRepository.upsert({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string): Promise<RefreshToken> {
    try {
      return await this.refreshTokenRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async removeMany(query: any): Promise<RefreshToken[]> {
    try {
      return await this.refreshTokenRepository.deleteMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async checkRefreshToken(refreshToken: string): Promise<boolean> {
    // Fetch tokens from the database
    const existingRefreshTokens = await this.refreshTokenRepository.findMany({
      select: {
        refreshToken: true,
      },
    });
    // Compare each token with the hashed input
    for (const token of existingRefreshTokens) {
      const match = await compareHashData(refreshToken, token.refreshToken);
      console.log(match);
      if (match) {
        return true;
      }
    }

    return false;
  }

  // @OnEvent('RefreshToken-created')
  // async sendVerificationEmail(payload: RefreshToken) {
  //   // @ts-ignore
  //   const res = await this.mailClient.emit('sendMail', {
  //     data: {
  //       to: 'ndollawa@yahoo.com',
  //       from: 'test@mail.com',
  //       subject: 'Hello and Welcome',
  //     },
  //     mailOption: { type: 'Plain' },
  //   });
  //   console.log(res);
  // }
}
