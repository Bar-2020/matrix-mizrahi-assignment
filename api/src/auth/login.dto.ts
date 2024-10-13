import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'john',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password in plain text',
    example: 'Password@123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
