import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageRepository } from './message.repository';
import { MessageController } from './message.controller';
import { ConversationModule } from 'src/conversation';

@Module({
  imports: [ConversationModule],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
})
export class MessageModule {}
