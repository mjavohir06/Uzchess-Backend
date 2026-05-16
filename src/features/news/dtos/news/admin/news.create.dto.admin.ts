import {Allow, IsDateString, IsString, MaxLength} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class NewsCreateDtoAdmin {
  @IsString()
  @MaxLength(256)
  @ApiProperty()
  title!: string;

  @Allow()
  @ApiProperty({type: 'string', format: 'binary'})
  image!: string;

  @IsString()
  @ApiProperty()
  content!: string;

  @IsString()
  @ApiProperty()
  richText!:string

  @IsDateString()
  @ApiProperty({example: '2026-01-01T14:50:24.000Z'})
  date!: string;
}