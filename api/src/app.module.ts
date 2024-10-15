import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CalculatorModule } from './calculator/calculator.module';

@Module({
  imports: [AuthModule, UsersModule, CalculatorModule],
  controllers: [AppController],
})
export class AppModule {}
