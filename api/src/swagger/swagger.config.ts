import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Calculator API')
  .setDescription('An API to perform basic arithmetic operations.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
