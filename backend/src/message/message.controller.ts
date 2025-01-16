import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto, UpdateMessageDto } from './dto';
import { ConversationService } from 'src/conversation';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly conversationService: ConversationService,
  ) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    const { conversationId, senderId, receiverId } = createMessageDto;
    let query;
    //   if(conversationId){
    //     query = { data:createMessageDto };
    //     return this.messageService.create(query);
    //   }
    // //  const conversationExist = await this.conversationService.find({
    // //   where: {members:[$inc: {}]}

    // //   }
    // //  })
    //    if(!conversationExist){
    //     const newConversation = await this.conversationService.create({members:[senderId,receiverId]})
    //     query = { data:{...createMessageDto, connect:{
    //       conversation: {
    //         id : newConversation.id
    //       }
    //     } :con} };
    return this.messageService.create(query);
  }

  @Get()
  findAll() {
    return this.messageService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.find(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
