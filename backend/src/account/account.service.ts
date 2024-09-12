import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as grpc from '@grpc/grpc-js';
import { Account,WalletType } from '@prisma/client';
import { hashData, handleError } from '@app/common';
import { AccountRepository } from './account.repository';
import { CreateAccountDto, UpdateAccountDto } from '../dto';
import { CreateListingDto } from 'src/listing/dto';

const { ALREADY_EXISTS, UNAUTHENTICATED } = grpc.status;

@Injectable()
export class AccountService {
  constructor(
    protected readonly AccountRepository: AccountRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async findAccount(query: any): Promise<Account> {
    try {
      return await this.AccountRepository.find({
        where: query,
        include: { seller: true, listing: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAllAccounts(query: any): Promise<Account[]> {
    try {
      return await this.AccountRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }

  async createAccount(createAccountData: CreateAccountDto & CreateListingDto): Promise<Account> {
    const { username, url } = createAccountData;

    try {
      const existingAccount = await this.AccountRepository.exists({
        where: { AND: [{ url }, { username }] },
      });

      if (existingAccount) {
        throw new ConflictException({
          code: ALREADY_EXISTS,
          message: 'Account with credentials already exists.',
        });
      }

      const AccountData = {
       ...createAccountData,
        listing: {
          create: {
            sellerId: '',
            price: '3000',
            listingStatus:
          },
        },
      
      };

      const newAccount = await this.AccountRepository.create({
        data: AccountData,
      });

      this.eventEmitter.emit('Account-created', newAccount);
      return newAccount;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async updateAccount(id: string, data: UpdateAccountDto) {
    Logger.debug(data);
    try {
      return await this.AccountRepository.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsertAccount(id: string, data: UpdateAccountDto) {
    Logger.debug(data);
    try {
      return await this.AccountRepository.upsert({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async removeAccount(id: string): Promise<Account> {
    try {
      return await this.AccountRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  // @OnEvent('Account-created')
  // sendVerificationEmail(payload: Account) {
  //   console.log(payload);
  //   return this.mailClient.emit('sendMail', payload);
  // }
}
