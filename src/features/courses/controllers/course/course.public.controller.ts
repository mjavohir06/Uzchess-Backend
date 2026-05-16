import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CoursePublicService } from '@/features/courses/services/course/course.public.service';
import { CourseListPublicDto } from '@/features/courses/dtos/course/public/course.list.public.dto';
import { CourseDetailPublicDto } from '@/features/courses/dtos/course/public/course.detail.public.dto';
import { PaginatedResultDto } from '@/features/common/dtos/paginated-result.dto';
import { CoursePublicFilters } from '@/features/courses/filters/course.public.filters';


@ApiTags('Course - Public')
@Controller('public/courses')
export class CoursePublicController {
  constructor(private readonly service: CoursePublicService) {
  }

  @Get()
  @ApiOkResponse({ type: PaginatedResultDto(CourseListPublicDto) })
  async getAll(@Query() filters: CoursePublicFilters) {
    return await this.service.getAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({ type: CourseDetailPublicDto })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }
}