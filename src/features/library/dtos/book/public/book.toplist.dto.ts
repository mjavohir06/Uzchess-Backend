// BookPublicListDto
import { Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class BookPublicTopListDto {
    @Expose()
    @ApiProperty()
    id!: number

    @Expose()
    @ApiProperty()
    title!: string

    @Expose()
    @ApiProperty()
    description!:string

    @Expose()
    @ApiProperty({ nullable: true })
    image!: string
}