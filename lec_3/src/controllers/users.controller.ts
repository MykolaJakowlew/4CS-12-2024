import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { LoginDto, UserDto } from '../models';
import { UserAlreadyExists } from '../shared';

@Controller({ path: '/users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  async createUser(@Body() body: UserDto) {
    try {
      const user = await this.usersService.createUser(body);
      return user;
    } catch (err) {
      if (err instanceof UserAlreadyExists) {
        throw new BadRequestException(err.message);
      }

      throw err;
    }
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    const token: string | undefined = await this.usersService.login(body);

    if (!token) {
      throw new BadRequestException(
        `User with login ${body.login} was not found`,
      );
    }
    return { token };
  }

  @Get('/')
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return users;
  }
}
