import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { handleError } from '@app/common';
import { Transaction, TransactionStatus } from '@prisma/client';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    protected readonly transactionRepository: TransactionRepository,
  ) {}

  async find(id: any): Promise<Transaction> {
    try {
      return await this.transactionRepository.find({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Transaction[]> {
    try {
      return await this.transactionRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Transaction> {
    try {
      return await this.transactionRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(
    createTransactionData: CreateTransactionDto,
  ): Promise<Transaction> {
    const {
      paymentMethod,
      status,
      amount,
      currency,
      purpose,
      sessionId,
      userId,
    } = createTransactionData;

    try {
      const existingTransaction = await this.transactionRepository.exists({
        where: { OR: [{ userId }, { sessionId }] },
      });

      if (existingTransaction) {
        throw new HttpException(
          'Transaction with credentials already exists.',
          HttpStatus.CONFLICT,
        );
      }

      const TransactionData = {
        ...createTransactionData,
      };

      const newTransaction = await this.transactionRepository.create({
        data: TransactionData,
      });
      Logger.debug(newTransaction);
      return newTransaction;
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string, updateTransactionData: UpdateTransactionDto) {
    try {
      return await this.transactionRepository.update({
        where: { id },
        data: updateTransactionData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateTransactionData: UpdateTransactionDto) {
    try {
      return await this.transactionRepository.upsert({
        where: { id },
        data: updateTransactionData,
      });
    } catch (error) {
      handleError(error);
    }
  }
  // Update transaction status (e.g., after webhook confirmation)
  async updateTransactionStatus(
    transactionId: string,
    status: TransactionStatus,
  ) {
    return this.transactionRepository.update({
      where: { id: transactionId },
      data: { status },
    });
  }
}
