import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

export class CalculateDto {
  @ApiProperty({ description: 'First number for calculation', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  num1: number;

  @ApiProperty({ description: 'Second number for calculation', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  num2: number;
}
