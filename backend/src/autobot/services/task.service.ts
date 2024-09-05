import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AutobotService } from './autobot.service';

@Injectable()
export class TasksService {
  constructor(private autobotService: AutobotService) {}

  @Cron('0 * * * *') // Runs every hour
  handleCron() {
    this.autobotService.generateAutobots();
  }
}
