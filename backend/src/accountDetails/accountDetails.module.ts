import { Module } from '@nestjs/common';
import { AccountDetailsService } from './accountDetails.service';
import { AccountDetailsRepository } from './accountDetails.repository';
import { AccountDetailsController } from './accountDetails.controller';

@Module({
  controllers: [AccountDetailsController],
  providers: [AccountDetailsRepository, AccountDetailsService],
})
export class AccountDetailsModule {}
