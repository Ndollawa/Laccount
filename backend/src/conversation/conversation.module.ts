import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationRepository } from './conversation.repository';
import { ConversationController } from './conversation.controller';

@Module({
  controllers: [ConversationController],
  providers: [ConversationService, ConversationRepository],
})
export class ConversationModule {}
