import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsString()
  @MaxLength(64)
  @ApiProperty({example:"mamurovjavohirbek057@gmail.com"})
  login!: string;

  @IsString()
  @MaxLength(32)
  @ApiProperty({example:"javohir06"})
  password!: string;
}
