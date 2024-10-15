import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { hardcodedUsers } from './hardcoded-users';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find an existing user by username', async () => {
    const user = await service.findOne(hardcodedUsers[0].username);
    expect(user).toBeDefined();
    expect(user.username).toBe(hardcodedUsers[0].username);
  });

  it('should not find a non-existing user by username', async () => {
    const user = await service.findOne('nonexistent');
    expect(user).toBeUndefined();
  });
});
