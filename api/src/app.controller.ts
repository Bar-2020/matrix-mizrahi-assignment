import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Headers,
} from '@nestjs/common';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CalculateDto, Operation } from './calculator/calculator.dto';
import { CalculatorService } from './calculator/calculator.service';
import {
  CalculateEndpoint,
  LoginEndpoint,
  ProfileEndpoint,
} from './swagger/swagger.decorators';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private calculatorService: CalculatorService,
  ) {}

  @LoginEndpoint()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ProfileEndpoint()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @CalculateEndpoint()
  @UseGuards(JwtAuthGuard)
  @Post('calculate')
  calculate(
    @Body() { num1, num2 }: CalculateDto,
    @Headers('Calculator-Operation') operation: Operation,
  ) {
    return {
      result: this.calculatorService.calculate(num1, num2, operation),
    };
  }
}
