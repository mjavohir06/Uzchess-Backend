import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString, MaxLength } from 'class-validator';

export class DifficultyCreateAdminDto {
  @IsString()
  @MaxLength(32)
  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  icon!: string;
}
