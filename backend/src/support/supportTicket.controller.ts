import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupportTicketService } from './supportTicket.service';
import { CreateSupportTicketDto, UpdateSupportTicketDto } from './dto';

@Controller('supportTickets')
export class SupportTicketController {
  constructor(private readonly supportTicketService: SupportTicketService) {}

  @Post()
  create(@Body() createSupportTicketDto: CreateSupportTicketDto) {
    return this.supportTicketService.create(createSupportTicketDto);
  }

  @Get()
  findAll() {
    return this.supportTicketService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supportTicketService.find(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupportTicketDto: UpdateSupportTicketDto,
  ) {
    return this.supportTicketService.update(id, updateSupportTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportTicketService.remove(id);
  }
}
