import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/core/decorators/roles.decorator';
import { Role } from '@/core/enums/role.enum';
import { LanguageCreateAdminDto } from '@/features/common/dtos/language/admin/language.create.admin.dto';
import { LanguageAdminService } from '@/features/common/services/language/language.admin.service';


@ApiTags('Language - Admin')
@ApiCookieAuth()
@Controller('admin/language')
@Roles(Role.Admin, Role.SuperAdmin)
export class LanguageAdminController {
  constructor(private readonly service: LanguageAdminService) {
  }

  @Post()
  async create(@Body() payload: LanguageCreateAdminDto) {
    return await this.service.create(payload);
  }

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Patch('id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() payload: LanguageCreateAdminDto) {
    return await this.service.updateOne(id, payload);
  }

  @Delete('id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.deleteOne(id);
  }
}