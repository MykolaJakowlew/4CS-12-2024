import { Injectable } from '@nestjs/common';
import { LoginDto, UserDto } from '../models';
import { Model } from 'mongoose';
import { UserDoc, Users } from '../schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserAlreadyExists } from '../shared';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<UserDoc>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(body: UserDto) {
    const isExists = await this.userModel.findOne({
      login: body.login,
    });

    if (isExists) {
      throw new UserAlreadyExists(
        `user with login ${body.login} already exists`,
      );
    }

    /**
     * Validation step
     */
    const doc = new this.userModel(body);

    /**
     * Save into DB
     */
    const user = await doc.save();

    return user;
  }

  async login(body: LoginDto): Promise<string | undefined> {
    const user = await this.userModel.findOne({
      login: body.login,
      password: body.password,
    });

    if (!user) {
      return undefined;
    }

    user.token = randomUUID();

    await user.save();

    return user.token;
  }

  async getAllUsers() {
    const users = await this.userModel.find(
      /**
       * Conditions for search
       */
      {},
      /**
       * What fields should be excluded from response
       */
      { token: 0, password: 0 },
    );

    return users;
  }
}
