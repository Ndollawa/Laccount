import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { handleError } from '@app/common';
import { Team } from '@prisma/client';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
  constructor(protected readonly teamRepository: TeamRepository) {}

  async find(id: any): Promise<Team> {
    try {
      return await this.teamRepository.find({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Team[]> {
    try {
      return await this.teamRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Team> {
    try {
      return await this.teamRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(createTeamData: CreateTeamDto): Promise<Team> {
    const { firstName, lastName } = createTeamData;

    try {
      const existingTeam = await this.teamRepository.exists({
        where: { AND: [{ firstName }, { lastName }] },
      });

      if (existingTeam) {
        throw new HttpException(
          'Team with credentials already exists.',
          HttpStatus.CONFLICT,
        );
      }

      const TeamData = {
        ...createTeamData,
      };

      const newTeam = await this.teamRepository.create({
        data: TeamData,
      });
      Logger.debug(newTeam);
      return newTeam;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updateTeamData: UpdateTeamDto) {
    try {
      return await this.teamRepository.update({
        where: { id },
        data: updateTeamData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateTeamData: UpdateTeamDto) {
    try {
      return await this.teamRepository.upsert({
        where: { id },
        data: updateTeamData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
