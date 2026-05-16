import { IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CourseUpdateAdminDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsOptional()
  @ApiProperty()
  authorId?: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsOptional()
  @ApiProperty()
  categoryId?: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsOptional()
  @ApiProperty()
  languageId?: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsOptional()
  @ApiProperty()
  difficultyId?: number;

  @IsString()
  @MaxLength(128)
  @IsOptional()
  @ApiProperty()
  title?: string;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  image?: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  price?: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  newPrice?: number;
}