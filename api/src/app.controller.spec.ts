import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
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
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should calculate the result', () => {
    const calculateDto = { num1: 5, num2: 3 };
    const operation: Operation = 'add';
    const result = { result: 8 };

    expect(appController.calculate(calculateDto, operation)).toEqual(result);
  });
});
