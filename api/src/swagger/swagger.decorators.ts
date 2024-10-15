import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CalculateDto } from '../calculator/calculator.dto';
import { LoginDto } from '../auth/login.dto';

export function ProfileEndpoint() {
  return applyDecorators(
    ApiTags('User'),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description: 'User profile retrieved successfully.',
      schema: {
        type: 'object',
        properties: {
          userId: { type: 'string', example: '1' },
          username: { type: 'string', example: 'john' },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized, bearer token missing or invalid.',
    }),
  );
}

export function CalculateEndpoint() {
  return applyDecorators(
    ApiTags('Calculator'),
    ApiBody({
      description: 'The numbers to be used in the calculation',
      type: CalculateDto,
    }),
    ApiBearerAuth(),
    ApiHeader({
      name: 'Calculator-Operation',
      required: true,
      description: 'The operation to perform (add, subtract, multiply, divide)',
      enum: ['add', 'subtract', 'multiply', 'divide'],
      example: 'add',
    }),
    ApiResponse({
      status: 200,
      description: 'Calculation successful, returns result',
      schema: {
        type: 'object',
        properties: {
          result: { type: 'number', example: 12 },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description:
        'Bad Request, one of the two number or math operation may be missing or invalid.',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized, bearer token missing or invalid.',
    }),
  );
}

export function LoginEndpoint() {
  return applyDecorators(
    ApiTags('User'),
    ApiBody({ type: LoginDto }),
    ApiResponse({
      status: 201,
      description: 'Logged in successfully, returns token',
      schema: {
        type: 'object',
        properties: {
          access_token: { type: 'string' },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized, invalid login credentials.',
    }),
    ApiResponse({
      status: 400,
      description:
        'Bad request, invalid login credentials. "username" or "password" is missing.',
    }),
  );
}
