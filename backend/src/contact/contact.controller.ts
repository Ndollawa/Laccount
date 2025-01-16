import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Req() req, @Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto, req.user);
  }

  @Get()
  findAll() {
    return this.contactService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.find(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
    @Req() req,
  ) {
    return this.contactService.update(id, updateContactDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
