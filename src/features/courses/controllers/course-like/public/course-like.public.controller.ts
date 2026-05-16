import type { Request } from 'express';
import { Controller, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CourseLikePublicService } from '@/features/courses/services/course-like/course-like.public.service';
import { Roles } from '@/core/decorators/roles.decorator';
import { Role } from '@/core/enums/role.enum';

@ApiTags('CourseLike - Public')
@ApiBearerAuth()
@Controller('public/course-like')
@Roles(Role.User)
export class CourseLikePublicController {
  constructor(private readonly service: CourseLikePublicService) {
  }

  @Post(':courseId')
  async toggleLike(@Req() request: Request, @Param('courseId', ParseIntPipe) id: number) {
    // @ts-ignore
    return await this.service.toggleLike(id, request.user.id);
  }
}