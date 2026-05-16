
import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, IsString } from 'class-validator';


export class ReportCreatePublicDto {
  @IsInt()
  @ApiProperty()
  id!: number;

  @IsString()
  @ApiProperty()
  title!: string;

}