import type { Request } from 'express';

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {  ApiConsumes, ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/core/decorators/roles.decorator';
import { Role } from '@/core/enums/role.enum';
import { CourseAdminService } from '@/features/courses/services/course/course.admin.service';
import { CourseCreateAdminDto } from '@/features/courses/dtos/course/admin/course.create.admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/configs/multer.configs';
import { CourseListAdminDto } from '@/features/courses/dtos/course/admin/course.list.admin.dto';
import { CoursePublicFilters } from '../../filters/course.public.filters';
import getFullPath from '@/core/utils/get-full-path';
import { PaginatedResultDto } from '@/features/common/dtos/paginated-result.dto';

@ApiTags('Course - Admin')
@ApiCookieAuth()
@Controller('admin/course')
@Roles(Role.Admin, Role.SuperAdmin)
export class CourseAdminController {
  constructor(private readonly service: CourseAdminService) {
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
  async create(@UploadedFile() image: Express.Multer.File, @Body() payload: CourseCreateAdminDto) {
    return await this.service.create(payload, image);
  }

  @Get()
  @ApiOkResponse({ type: () => PaginatedResultDto(CourseListAdminDto) })
  async getAll(@Req() request: Request,@Query() filter:CoursePublicFilters) {
    let userId = undefined;
    // @ts-ignore
    if (request.user) {
      // @ts-ignore
      userId = request.user.id;
    }
    const result=await this.service.getAll(filter,userId);

    result.data.forEach((e:CourseListAdminDto)=>{
      e.image=getFullPath(request,e.image)
      e.difficulty.icon=getFullPath(request,e.difficulty.icon)

    })

    return result
  }

  @Patch(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number) {

  }
}