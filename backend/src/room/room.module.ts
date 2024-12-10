import { Module } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { RoomService } from './room.service';
import { RoomRepository } from './room.repository';
import { RoomController } from './room.controller';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomRepository, PrismaService],
})
export class RoomModule {}
