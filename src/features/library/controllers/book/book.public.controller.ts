import { Controller, Get, Param, ParseIntPipe, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CourseDetailPublicDto } from '@/features/courses/dtos/course/public/course.detail.public.dto';
import { PaginatedResultDto } from '@/features/common/dtos/paginated-result.dto';
import { CoursePublicFilters } from '@/features/courses/filters/course.public.filters';
import { BookPublicService } from '../../services/book/book.public.service';
import { BookPublicListDto } from '../../dtos/book/public/book.list.dto';
import { Book } from '../../entities/book.entity';
import { BookPublicTopListDto } from '../../dtos/book/public/book.toplist.dto';
import getFullPath from '@/core/utils/get-full-path';
import type { Request } from 'express';


@ApiTags('Book - Public')
@Controller('public/book')
export class BookPublicController {
  constructor(private readonly service: BookPublicService) {
  }

  @Get()
  @ApiOkResponse({ type: PaginatedResultDto(BookPublicListDto) })
  async getAll( @Query() filters: CoursePublicFilters) {
    return await this.service.getAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({ type: BookPublicListDto })
  async getOne( @Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }

  @Get("top/:soni")
  @ApiOkResponse({ type: BookPublicTopListDto, isArray: true })
  async getTop(@Req() req: Request,@Param("soni") soni: number) {
    const result=await this.service.getTop(soni)
    result.forEach((e) => {
      e.image = getFullPath(req, e.image)

    })
    return result
  }

}