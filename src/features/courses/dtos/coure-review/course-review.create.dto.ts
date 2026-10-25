import { Allow, IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CourseReviewCreateDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({ type: "number" })
  rating!: number;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  @ApiProperty()
  comment?: string;

  
}