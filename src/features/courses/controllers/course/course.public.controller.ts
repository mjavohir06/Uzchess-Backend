import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CoursePublicService } from '@/features/courses/services/course/course.public.service';
import { CourseListPublicDto } from '@/features/courses/dtos/course/public/course.list.public.dto';
import { CourseDetailPublicDto } from '@/features/courses/dtos/course/public/course.detail.public.dto';
import { PaginatedResultDto } from '@/features/common/dtos/paginated-result.dto';
import { CoursePublicFilters } from '@/features/courses/filters/course.public.filters';
import { Course } from '../../entities/course.entity';
import { Roles } from '@/core/decorators/roles.decorator';
import { Role } from '@/core/enums/role.enum';
import type { Request } from 'express';
import { CourseReviewCreateDto } from '../../dtos/coure-review/course-review.create.dto';
import { CourseTopListPublicDto } from '../../dtos/course/public/course.toplist.dto';
import getFullPath from '@/core/utils/get-full-path';


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
  async getOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }

  @Get("top/:soni")
  @ApiOkResponse({ type: CourseTopListPublicDto, isArray: true })
  async getTop(@Req() req: Request, @Param("soni") soni: number) {
    const result = await this.service.getTop(soni)
    result.forEach((e) => {
      e.image = getFullPath(req, e.image)
    })
    return result
  }

  @Roles(Role.Admin, Role.SuperAdmin, Role.User)
  @Post("review/:id")
  async postReview(@Param("id") id: number, @Req() req: Request, @Body() payload: CourseReviewCreateDto) {
    const user = req.user
    if (!user) throw new UnauthorizedException()

    return await this.service.postReview(id, user.id, payload)
  }

}