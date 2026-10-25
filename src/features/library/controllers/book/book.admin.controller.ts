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
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/configs/multer.configs';
import getFullPath from '@/core/utils/get-full-path';
import { PaginatedResultDto } from '@/features/common/dtos/paginated-result.dto';
import { CoursePublicFilters } from '@/features/courses/filters/course.public.filters';
import { BookAdminService } from '../../services/book/book.admin.service';
import { BookCreateDto } from '../../dtos/book/admin/book.create.dto.admin';
import { BookAdminListDto } from '../../dtos/book/admin/book.list.dto';
import { BookUpdateDto } from '../../dtos/book/admin/book.update.dto';

@ApiTags('Book - Admin')
@ApiCookieAuth()
@Controller('admin/book')
@Roles(Role.Admin, Role.SuperAdmin)
export class BookAdminController {
  constructor(private readonly service: BookAdminService) {
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
  async create(@UploadedFile() image: Express.Multer.File, @Body() payload: BookCreateDto) {
    return await this.service.create(payload, image);
  }

  @Get()
  @ApiOkResponse({ type: () => PaginatedResultDto(BookAdminListDto) })
  async getAll(@Req() request: Request,@Query() filter:CoursePublicFilters) {
    let userId = undefined;
    // @ts-ignore
    if (request.user) {
      // @ts-ignore
      userId = request.user.id;
    }
    const result=await this.service.getAll(filter,userId);

    result.data.forEach((e:BookAdminListDto)=>{
      e.image=getFullPath(request,e.image)
      e.difficulty.icon=getFullPath(request,e.difficulty.icon)

    })

    return result
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
  async updateOne(@Param('id', ParseIntPipe) id: number,@Body() payload:BookUpdateDto,@UploadedFile() image?: Express.Multer.File,) {
    return await this.service.updateOne(id,payload,image)
  }
}