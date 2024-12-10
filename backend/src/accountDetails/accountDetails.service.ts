import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as grpc from '@grpc/grpc-js';
import { AccountDetails, ListingStatus } from '@prisma/client';
import { handleError } from '@app/common';
import { AccountDetailsRepository } from './accountDetails.repository';
import { CreateAccountDetailsDto, UpdateAccountDetailsDto } from './dto';
import { CreateListingDto } from 'src/listing/dto';

const { ALREADY_EXISTS } = grpc.status;

@Injectable()
export class AccountDetailsService {
  constructor(
    protected readonly accountDetailsRepository: AccountDetailsRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async find(query: any): Promise<AccountDetails> {
    try {
      return await this.accountDetailsRepository.find({
        where: query,
        include: {
          listing: {
            include: { seller: true },
          },
        },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<AccountDetails[]> {
    try {
      return await this.accountDetailsRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }

  async create(
    createAccountDetailsData: CreateAccountDetailsDto & CreateListingDto,
  ): Promise<AccountDetails> {
    const { username, url } = createAccountDetailsData;

    try {
      const existingAccountDetails = await this.accountDetailsRepository.exists(
        {
          where: { AND: [{ url }, { username }] },
        },
      );

      if (existingAccountDetails) {
        throw new ConflictException({
          code: ALREADY_EXISTS,
          message: 'AccountDetails with credentials already exists.',
        });
      }

      const accountDetailsData = {
        ...createAccountDetailsData,
        listing: {
          create: {
            sellerId: '',
            price: '3000',
            listingStatus: ListingStatus.LISTED,
          },
        },
      };

      const newAccountDetails = await this.accountDetailsRepository.create({
        data: accountDetailsData,
      });

      this.eventEmitter.emit('AccountDetails-created', newAccountDetails);
      return newAccountDetails;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, data: UpdateAccountDetailsDto) {
    Logger.debug(data);
    try {
      return await this.accountDetailsRepository.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, data: UpdateAccountDetailsDto) {
    Logger.debug(data);
    try {
      return await this.accountDetailsRepository.upsert({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string): Promise<AccountDetails> {
    try {
      return await this.accountDetailsRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  // @OnEvent('AccountDetails-created')
  // sendVerificationEmail(payload: AccountDetails) {
  //   console.log(payload);
  //   return this.mailClient.emit('sendMail', payload);
  // }
}
