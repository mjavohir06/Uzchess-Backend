// BookPublicListDto
import { Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { DifficultyListPublicDto } from "@/features/common/dtos/difficulty/public/difficulty.list.public.dto";
import { LanguageListPublicDto } from "@/features/common/dtos/language/public/language.list.public.dto";
import { CourseCategoryListPublicDto } from "@/features/courses/dtos/course-category";
import { AuthorListPublicDto } from "@/features/common/dtos/author/public/author.list.public.dto";

export class BookPublicListDto {
    @Expose()
    @ApiProperty()
    id!: number

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
    title!: string

    @Expose()
    @ApiProperty({ nullable: true })
    image!: string

    @Expose()
    @ApiProperty()
    price!: number

    @Expose()
    @ApiProperty({ nullable: true })
    newPrice?: number

    @Expose()
    @ApiProperty()
    description!:string

    @Expose()
    @ApiProperty({ nullable: true })
    rating?: number

    @Expose()
    @ApiProperty()
    reviewsCount!: number

    @Expose()
    @ApiProperty()
    pages!: number

    @Expose()
    @ApiProperty()
    pubDate!: Date
}