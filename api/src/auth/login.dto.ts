import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { User } from '../users/users.service';

// I provided actual user credentials here for testing purposes.
export class LoginDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'john',
  })
  @IsString()
  @IsNotEmpty()
  username: Pick<User, 'username'>;

  @ApiProperty({
    description: 'Password in plain text',
    example: 'Password@123',
  })
  @IsString()
  @IsNotEmpty()
  password: Pick<User, 'password'>;
}
