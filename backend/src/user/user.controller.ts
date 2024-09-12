import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserService } from './services/user.service';
import { handleError } from '@app/common';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  async findAllUsers(): Promise<User[]> {
    try {
      const users = await this.userService.findAllUsers({
        where: {},
        include: { profile: true, roles: true },
      });
      return users;
    } catch (error) {
      handleError(error);
    }
  }

  @Get(':id')
  async findUser(@Param('id') id: string): Promise<User> {
    return await this.userService.findUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<User> {
    return await this.userService.removeUser(id);
  }

  // queryUsers(paginationDtoStream: PaginationDto):Promise<any> | Observable<any> {
  //   // return this.userService.queryUser(paginationDtoStream);
  //   return null
  // }

  // @OnEvent('user-created')
  // sendVerificationEmail(payload: User) {
  //   console.log(payload,"from controller");
  // }
}
