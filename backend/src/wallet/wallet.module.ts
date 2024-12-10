import { Module } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { WalletService } from './wallet.service';
import { WalletRepository } from './wallet.repository';
import { WalletController } from './wallet.controller';
import { PaymentModule } from 'src/payment';

@Module({
  controllers: [PaymentModule, WalletController],
  providers: [WalletService, WalletRepository, PrismaService],
})
export class WalletModule {}
