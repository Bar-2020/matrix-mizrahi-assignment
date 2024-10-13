import { Injectable, BadRequestException } from '@nestjs/common';
import { Operation } from './calculator.dto';

// Define the enum for operations
const OperationEnum = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
};

@Injectable()
export class CalculatorService {
  calculate(value1: number, value2: number, operation: Operation): number {
    const num1 = Number(value1);
    const num2 = Number(value2);
    const symbol = OperationEnum[operation.toUpperCase()];

    if (isNaN(num1) || isNaN(num2)) {
      throw new BadRequestException('Invalid number input');
    }

    if (!symbol) {
      throw new BadRequestException('Invalid operation');
    }

    if (symbol === '/' && num2 === 0) {
      throw new BadRequestException('Division by zero is not allowed');
    }

    // Perform the calculation using eval
    return eval(`${num1} ${symbol} ${num2}`);
  }
}
