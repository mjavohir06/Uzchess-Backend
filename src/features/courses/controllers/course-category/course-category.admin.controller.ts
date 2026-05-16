import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/core/decorators/roles.decorator';
import { Role } from '@/core/enums/role.enum';
import { CourseCategoryAdminService } from '@/features/courses/services/course-category/course-category.admin.service';
import {
  CourseCategoryCreateAdminDto,
  CourseCategoryListAdminDto,
  CourseCategoryUpdateAdminDto,
} from '@/features/courses/dtos/course-category';
import { PaginationFilters } from '@/features/common/filters/pagination.filters';
import { PaginatedResultDto } from '@/features/common/dtos/paginated-result.dto';

@ApiTags('CourseCategory - Admin')
@ApiCookieAuth()
@Controller('admin/course-category')
@Roles(Role.Admin, Role.SuperAdmin)
export class CourseCategoryAdminController {
  constructor(private service: CourseCategoryAdminService) {
  }

  @Post()
  async create(@Body() payload: CourseCategoryCreateAdminDto) {
    
    return await this.service.create(payload);
  }

  @Get()
  @ApiOkResponse({ type: () => PaginatedResultDto(CourseCategoryListAdminDto) })
  async getAll(@Query() filters: PaginationFilters) {
    return await this.service.getAll(filters);
  }

  @Patch(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() payload: CourseCategoryUpdateAdminDto) {
    return await this.service.updateOne(id, payload);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    return await this.service.deleteOne(id);
  }
}