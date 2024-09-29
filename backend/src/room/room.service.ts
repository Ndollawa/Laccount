import { Injectable, Logger } from '@nestjs/common';
import { Room } from '@prisma/client';
import { handleError } from '@app/common';
import { CreateRoomDto, UpdateRoomDto } from './dto';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService {
  constructor(protected readonly roomRepository: RoomRepository) {}

  async find(id: string): Promise<Room> {
    try {
      return await this.roomRepository.find({
        where: { id },
        // include: { author: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Room[]> {
    try {
      return await this.roomRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Room> {
    try {
      return await this.roomRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(createRoomData: CreateRoomDto): Promise<Room> {
    // const { authorId } = createRoomData;

    try {
      // const existingRoom = await this.roomRepository.exists({
      //   where: { roomId },
      // });

      // if (existingRoom) {
      //   throw new HttpException(
      //     'Room with credentials already exists.',
      //     HttpStatus.CONFLICT,
      //   );
      // }

      const roomData = {
        ...createRoomData,
      };

      const newRoom = await this.roomRepository.create({
        data: roomData,
      });
      Logger.debug(newRoom);
      return newRoom;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updateRoomData: UpdateRoomDto) {
    try {
      return await this.roomRepository.update({
        where: { id },
        data: updateRoomData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateRoomData: UpdateRoomDto) {
    Logger.debug(updateRoomData);

    try {
      return await this.roomRepository.upsert({
        where: { id },
        data: updateRoomData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
