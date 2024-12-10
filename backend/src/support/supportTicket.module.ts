import { Module } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { SupportTicketService } from './supportTicket.service';
import { SupportTicketRepository } from './supportTicket.repository';
import { SupportTicketController } from './supportTicket.controller';

@Module({
  controllers: [SupportTicketController],
  providers: [SupportTicketService, SupportTicketRepository, PrismaService],
})
export class SupportTicketModule {}
