import { IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  login!: string;

  @IsString()
  @Length(6, 6)
  @ApiProperty()
  code!: string;
}
