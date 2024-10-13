import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Headers,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/login.dto';
import { CalculateDto, Operation } from './calculator/calculator.dto';
import { CalculatorService } from './calculator/calculator.service';

@ApiBearerAuth()
@ApiTags('calculator')
@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private calculatorService: CalculatorService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 201,
    description: 'Logged in successfully, returns token',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
      },
    },
  })
  @Post('auth/login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiResponse({
    status: 200,
    description: 'User profile',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        username: { type: 'string', example: 'john' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('calculate')
  @ApiBody({
    description: 'The numbers to be used in the calculation',
    type: CalculateDto,
  })
  @ApiHeader({
    name: 'X-Operation',
    required: true,
    description: 'The operation to perform (add, subtract, multiply, divide)',
    enum: ['add', 'subtract', 'multiply', 'divide'],
    example: 'add',
  })
  @ApiResponse({
    status: 200,
    description: 'Calculation result',
    schema: {
      type: 'object',
      properties: {
        result: { type: 'number', example: 12 },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  calculate(
    @Body() calculateDto: CalculateDto,
    @Headers('X-Operation') operation: Operation,
  ) {
    const { value1, value2 } = calculateDto;

    return {
      result: this.calculatorService.calculate(value1, value2, operation),
    };
  }
}
