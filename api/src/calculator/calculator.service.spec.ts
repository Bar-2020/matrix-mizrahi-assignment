import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';
import { BadRequestException } from '@nestjs/common';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add two numbers', () => {
    expect(service.calculate(1, 2, 'add')).toBe(3);
  });

  it('should add two floating point numbers', () => {
    const result = service.calculate(1.2, 2.7, 'add');
    expect(result).toBeCloseTo(3.9, 1);
  });

  it('should subtract two numbers', () => {
    expect(service.calculate(5, 3, 'subtract')).toBe(2);
  });

  it('should multiply two numbers', () => {
    expect(service.calculate(2, 3, 'multiply')).toBe(6);
  });

  it('should divide two numbers', () => {
    expect(service.calculate(6, 3, 'divide')).toBe(2);
  });

  it('should throw an error for division by zero', () => {
    expect(() => service.calculate(6, 0, 'divide')).toThrow(
      BadRequestException,
    );
  });

  it('should throw an error for invalid operation', () => {
    // @ts-expect-error testing wrong argument type
    expect(() => service.calculate(6, 3, 'invalid')).toThrow(
      BadRequestException,
    );
  });

  it('should throw an error for missing operation', () => {
    // @ts-expect-error testing missing parameter
    expect(() => service.calculate(6, 3)).toThrow(BadRequestException);
  });

  it('should throw an error for missing number', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Intentionally passing undefined to test error handling
    expect(() => service.calculate(undefined, 3, 'add')).toThrow(
      BadRequestException,
    );
  });

  it('should throw an error for invalid number input', () => {
    expect(() => service.calculate(NaN, 3, 'add')).toThrow(BadRequestException);
    expect(() => service.calculate(6, NaN, 'add')).toThrow(BadRequestException);
  });
});
