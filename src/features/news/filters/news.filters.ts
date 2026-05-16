import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationFilters } from '@/features/common/filters/pagination.filters';

export class NewsFilters extends PaginationFilters {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  search?: string;
}