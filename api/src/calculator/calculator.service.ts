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
  calculate(num1: number, num2: number, operation: Operation): number {
    if (!num1 || !num2) throw new BadRequestException('Missing number input');

    const parsedNum1 = Number(num1);
    const parsedNum2 = Number(num2);

    if (!operation) throw new BadRequestException('Math Operation is required');

    const symbol = OperationEnum[operation.toUpperCase()];

    if (isNaN(parsedNum1) || isNaN(parsedNum2)) {
      throw new BadRequestException('Invalid number input');
    }

    if (!symbol) {
      throw new BadRequestException('Invalid operation');
    }

    if (symbol === '/' && parsedNum2 === 0) {
      throw new BadRequestException('Division by zero is not allowed');
    }

    // Perform the calculation using eval
    return eval(`${parsedNum1} ${symbol} ${parsedNum2}`);
  }
}
