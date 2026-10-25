// BookUpdateDto
import { IsString, IsInt, IsOptional, IsNumber, MaxLength, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class BookUpdateDto {
    @IsInt()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @ApiProperty({ required: false, type: "number" })
    authorId?: number

    @IsInt()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @ApiProperty({ required: false, type: "number" })
    categoryId?: number

    @IsInt()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @ApiProperty({ required: false, type: "number" })
    languageId?: number

    @IsInt()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @ApiProperty({ required: false, type: "number" })
    difficultyId?: number

    @IsString()
    @IsOptional()
    @MaxLength(128)
    @ApiProperty({ required: false })
    title?: string

    @IsOptional()
    @ApiProperty({ type: "string", format: "binary", required: false })
    image?: string

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    description?: string

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    @ApiProperty({ required: false, type: "number", example: 29.99 })
    price?: number

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => value ? parseFloat(value) : undefined)
    @ApiProperty({ required: false, type: "number", example: 19.99 })
    newPrice?: number

    @IsInt()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @ApiProperty({ required: false, type: "number" })
    pages?: number

    @IsDateString()
    @IsOptional()
    @ApiProperty({ required: false, example: "2024-01-01" })
    pubDate?: Date
}