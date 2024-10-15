import { Injectable } from '@nestjs/common';

import { hardcodedUsers } from './hardcoded-users';

export type User = {
  userId: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = hardcodedUsers;

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
