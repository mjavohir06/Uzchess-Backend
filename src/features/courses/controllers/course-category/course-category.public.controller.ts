import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CourseCategoryListPublicDto } from '@/features/courses/dtos/course-category';
import { CourseCategoryPublicService } from '../../services/course-category/course-category.public.service';
import { PaginationFilters } from '@/features/common/filters/pagination.filters';
import { PaginatedResultDto } from '@/features/common/dtos/paginated-result.dto';

@ApiTags('CourseCategory - Public')
@Controller('public/course-category')
export class CourseCategoryPublicController {
  constructor(private service: CourseCategoryPublicService) {
  }

  @Get()
  @ApiOkResponse({ type: () => PaginatedResultDto<CourseCategoryListPublicDto> })
  async getAll(@Query() filters:PaginationFilters) {
    return await this.service.getAll(filters);
  }
}