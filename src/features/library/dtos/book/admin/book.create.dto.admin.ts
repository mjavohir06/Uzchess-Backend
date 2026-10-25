// BookCreateDto
import { IsString, IsNotEmpty, IsInt, IsOptional, IsNumber, MaxLength, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class BookCreateDto {
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @ApiProperty({ type: "number" })
    authorId!: number

    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @ApiProperty({ type: "number" })
    categoryId!: number

    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @ApiProperty({ type: "number" })
    languageId!: number

    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @ApiProperty({ type: "number" })
    difficultyId!: number

    @IsString()
    @IsNotEmpty()
    @MaxLength(128)
    @ApiProperty()
    title!: string

    @IsOptional()
    @ApiProperty({ type: "string", format: "binary", required: false })
    image!: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description!: string

    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    @ApiProperty({ type: "number", example: 29.99 })
    price!: number

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    @ApiProperty({ type: "number", required: false, example: 19.99 })
    newPrice?: number

    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @ApiProperty({ type: "number" })
    pages!: number

    @IsDateString()
    @ApiProperty({ example: "2024-01-01" })
    pubDate!: Date
}