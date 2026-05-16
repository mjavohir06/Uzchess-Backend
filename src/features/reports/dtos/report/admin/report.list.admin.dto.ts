import { ReportType } from '@/core/enums/report-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';


export class ReportListAdminDto {
    @IsInt()
    @ApiProperty()
    id!: number;

    @IsString()
    @ApiProperty()
    userId!: number;

    @IsInt()
    @ApiProperty()
    categoryId!: number;

    @ApiProperty()
    @IsEnum(ReportType)
    target!: ReportType;

    @ApiProperty()
    @IsInt()
    targetId!: number;

    @ApiProperty()
    @IsString()
    description?: string;

}