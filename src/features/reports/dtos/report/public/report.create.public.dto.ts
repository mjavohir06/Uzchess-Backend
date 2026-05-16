import { ReportType } from '@/core/enums/report-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
// sharding
//
export class ReportCreatePublicDto {
  @IsInt()
  @ApiProperty()
  categoryId!: number;

  @IsEnum(ReportType)
  @ApiProperty()
  target!: ReportType;

  @IsInt()
  @ApiProperty()
  targetId!: number;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  @ApiProperty({ required: false })
  description?: string;
}