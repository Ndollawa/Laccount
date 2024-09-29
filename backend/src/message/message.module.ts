import { Module } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { MessageService } from './message.service';
import { MessageRepository } from './message.repository';
import { MessageController } from './message.controller';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, PrismaService],
})
export class MessageModule {}
