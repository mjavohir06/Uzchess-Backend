import { Allow, IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CourseCreateAdminDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @ApiProperty({ type: "number" })
  authorId!: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @ApiProperty({ type: "number" })
  categoryId!: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @ApiProperty({ type: "number" })
  languageId!: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @ApiProperty({ type: "number" })
  difficultyId!: number;

  @IsString()
  @MaxLength(128)
  @ApiProperty()
  title!: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  image!: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @ApiProperty({ type: "number" })
  price!: number;

  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: "number", required: false })
  newPrice?: number;
}