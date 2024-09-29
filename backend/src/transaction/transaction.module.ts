import { Module } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import { TransactionController } from './transaction.controller';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository, PrismaService],
})
export class TransactionModule {}
