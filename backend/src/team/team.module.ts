import { Module } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { TeamService } from './team.service';
import { TeamRepository } from './team.repository';
import { TeamController } from './team.controller';

@Module({
  controllers: [TeamController],
  providers: [TeamService, TeamRepository, PrismaService],
})
export class TeamModule {}
