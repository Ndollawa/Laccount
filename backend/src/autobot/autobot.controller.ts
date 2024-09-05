import {
  Controller,
  Get,
  //   Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AutobotService } from './services/autobot.service';
import { CreateAutobotDto } from './dto/create-autobot.dto';
import { UpdateAutobotDto } from './dto/update-autobot.dto';
@Controller('autobot')
export class AutobotController {
  constructor(private readonly autobotService: AutobotService) {}

  // @Post()
  // create(@Body() createAutobotDto: CreateAutobotDto) {
  //   return this.autobotService.create(createAutobotDto);
  // }

  @Get()
  findAll() {
    return this.autobotService.findAll({});
  }
  @Get('/generateAutobots')
  generateAutobots() {
    return this.autobotService.generateAutobots();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autobotService.find(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutobotDto: UpdateAutobotDto) {
    return this.autobotService.update(id, updateAutobotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autobotService.remove(id);
  }
}
