import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { User, UsersService } from '../users/users.service';
import { hardcodedUsers } from '../users/hardcoded-users';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('signed-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null for a user with incorrect credentials', async () => {
    const mockUser: User = hardcodedUsers[0];
    jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser);

    const result = await service.validateUser(
      hardcodedUsers[0].username,
      hardcodedUsers[0].password + 'wrongpassword',
    );
    expect(result).toBeNull();
  });
});
