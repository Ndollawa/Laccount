import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { handleError, deleteItem } from '@app/common';
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
  async create(
    createTeamData: CreateTeamDto,
    file: Express.Multer.File,
  ): Promise<Team> {
    const { firstName, lastName, socialMedia } = createTeamData;

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

      const data = !file
        ? {
            ...createTeamData,
            socialMedia:
              typeof socialMedia === 'string'
                ? JSON.parse(socialMedia)
                : socialMedia,
          }
        : {
            ...createTeamData,
            socialMedia:
              typeof socialMedia === 'string'
                ? JSON.parse(socialMedia)
                : socialMedia,
            image: file.filename,
          };
      // return
      const newTeam = await this.teamRepository.create({
        data,
      });
      return newTeam;
    } catch (error) {
      handleError(error);
    }
  }

  async update(
    id: string,
    updateTeamData: UpdateTeamDto,
    file: Express.Multer.File,
  ) {
    try {
      const data = !file
        ? {
            ...updateTeamData,
            socialMedia:
              typeof updateTeamData.socialMedia === 'string'
                ? JSON.parse(updateTeamData.socialMedia)
                : updateTeamData.socialMedia,
          }
        : {
            ...updateTeamData,
            socialMedia:
              typeof updateTeamData.socialMedia === 'string'
                ? JSON.parse(updateTeamData.socialMedia)
                : updateTeamData.socialMedia,
            image: file.filename,
          };
      console.log(data, file);
      const rec = await this.teamRepository.update({
        where: { id },
        data,
        select:{image:true}
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateTeamData: UpdateTeamDto) {
    try {
      const rec = await this.teamRepository.upsert({
        where: { id },
        data: updateTeamData,
        select:{image: true}
      });
    } catch (error) {
      handleError(error);
    }
  }
}
