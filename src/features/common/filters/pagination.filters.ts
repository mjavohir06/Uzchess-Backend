import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class PaginationFilters {
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  @Transform(({ value }) => value ?? Number(process.env.DEFAULT_PAGE) ?? 1)
  page!: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  @Transform(({ value }) => value ?? Number(process.env.DEFAULT_SIZE) ?? 20)
  size!: number;
}