import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CalculatorService } from './calculator/calculator.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { ExecutionContext } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Operation } from './calculator/calculator.dto';
import { hardcodedUsers } from './users/hardcoded-users';

describe('AppController', () => {
  let appController: AppController;
  let authService: AuthService;
  let calculatorService: CalculatorService;

  beforeEach(async () => {
    const mockJwtAuthGuard = {
      canActivate: (context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        request.user = {
          userId: hardcodedUsers[0].userId,
          username: hardcodedUsers[0].username,
        }; // Mock user
        return true;
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        AuthService,
        CalculatorService,
        JwtService,
        UsersService,
        {
          provide: APP_GUARD,
          useValue: mockJwtAuthGuard,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    authService = module.get<AuthService>(AuthService);
    calculatorService = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should login a user', async () => {
    const loginDto = {
      username: hardcodedUsers[0].username,
      password: hardcodedUsers[0].password,
    };
    const result = { access_token: 'signed-token' };
    jest.spyOn(authService, 'login').mockResolvedValue(result);

    expect(await appController.login({ user: loginDto })).toBe(result);
  });

  it('should return user profile', () => {
    const req = {
      user: {
        userId: hardcodedUsers[0].userId,
        username: hardcodedUsers[0].username,
      },
    };
    expect(appController.getProfile(req)).toBe(req.user);
  });

  it('should calculate the result', () => {
    const calculateDto = { value1: 5, value2: 3 };
    const operation: Operation = 'add';
    const result = { result: 8 };
    jest.spyOn(calculatorService, 'calculate').mockReturnValue(result.result);

    expect(appController.calculate(calculateDto, operation)).toEqual(result);
  });
});
