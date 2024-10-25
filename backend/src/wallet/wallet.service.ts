import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateWalletDto, UpdateWalletDto } from './dto';
import { handleError } from '@app/common';
import { Wallet } from '@prisma/client';
import { WalletRepository } from './wallet.repository';
import { PaymentGatewayService } from 'src/payment';
import { PrismaService } from '@app/prisma';

@Injectable()
export class WalletService {
  constructor(
    protected readonly walletRepository: WalletRepository,
    private readonly paymentGateway: PaymentGatewayService,
    private readonly prisma: PrismaService,
  ) {}

  async find(id: any): Promise<Wallet> {
    try {
      return await this.walletRepository.find({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Wallet[]> {
    try {
      return await this.walletRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Wallet> {
    try {
      return await this.walletRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(createWalletData: CreateWalletDto): Promise<Wallet> {
    const { userId } = createWalletData;

    try {
      const existingWallet = await this.walletRepository.exists({
        where: { userId },
      });

      if (existingWallet) {
        throw new HttpException(
          'Wallet with credentials already exists.',
          HttpStatus.CONFLICT,
        );
      }

      const WalletData = {
        ...createWalletData,
      };

      const newWallet = await this.walletRepository.create({
        data: WalletData,
      });
      return newWallet;
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string, updateWalletData: UpdateWalletDto) {
    try {
      return await this.walletRepository.update({
        where: { id },
        data: updateWalletData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateWalletData: UpdateWalletDto) {
    try {
      return await this.walletRepository.upsert({
        where: { id },
        data: updateWalletData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async topUpWallet(
    transactionId: string,
    amount: number,
    paymentMethod: string,
  ) {
    const paymentResult = await this.paymentGateway.processPayment(
      transactionId,
      amount,
      paymentMethod,
    );

    if (paymentResult.success) {
      // Update wallet balance in DB
      return this.walletRepository.update({
        where: { userId: paymentResult.userId },
        data: { balance: { increment: amount } },
      });
    }

    throw new Error('Payment failed');
  }

  async transferFunds(senderId: string, recipientId: string, amount: number) {
    // Logic for deducting from sender and crediting the recipient
    await this.prisma.$transaction([
      //   this.walletRepository.update({
      //     where: { userId: recipientId },
      //     data: { balance: { increment: amount } },
      //   }),
      //   this.walletRepository.update({
      //     where: { userId: senderId }, // Replace with actual sender ID from context
      //     data: { balance: { decrement: amount } },
      //   }),
    ]);
  }
}
