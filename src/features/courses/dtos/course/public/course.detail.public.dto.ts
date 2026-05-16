import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AuthorListPublicDto } from '@/features/common/dtos/author/public/author.list.public.dto';
import { DifficultyListPublicDto } from '@/features/common/dtos/difficulty/public/difficulty.list.public.dto';
import { LanguageListPublicDto } from '@/features/common/dtos/language/public/language.list.public.dto';
import { CourseCategoryListPublicDto } from '@/features/courses/dtos/course-category';

export class CourseDetailPublicDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @Type(() => AuthorListPublicDto)
  @ApiProperty()
  author!: AuthorListPublicDto;

  @Expose()
  @Type(() => CourseCategoryListPublicDto)
  @ApiProperty()
  category!: CourseCategoryListPublicDto;

  @Expose()
  @Type(() => LanguageListPublicDto)
  @ApiProperty()
  language!: LanguageListPublicDto;

  @Expose()
  @Type(() => DifficultyListPublicDto)
  @ApiProperty()
  difficulty!: DifficultyListPublicDto;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  image!: string;

  @Expose()
  @ApiProperty()
  price!: number;

  @Expose()
  @ApiProperty()
  newPrice?: number;

  @Expose()
  @ApiProperty()
  rating?: number;

  @Expose()
  @ApiProperty()
  reviewsCount!: number;

  @Expose()
  @ApiProperty()
  sectionsCount!: number;

  @Expose()
  @ApiProperty()
  lessonsCount!: number;
}