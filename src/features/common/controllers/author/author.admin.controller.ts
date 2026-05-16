import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AuthorCreateAdminDto } from '@/features/common/dtos/author/admin/author.create.admin.dto';
import { ApiBearerAuth, ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthorListAdminDto } from '@/features/common/dtos/author/admin/author.list.admin.dto';
import { AuthorAdminService } from '@/features/common/services/author/author.admin.service';
import { Roles } from '@/core/decorators/roles.decorator';
import { Role } from '@/core/enums/role.enum';
import { AuthorUpdateAdminDto } from '@/features/common/dtos/author/admin/author.update.admin.dto';

@ApiTags('Author - Admin')
@ApiCookieAuth()
@Controller('admin/author')
@Roles(Role.Admin, Role.SuperAdmin)
export class AuthorAdminController {
  constructor(private service: AuthorAdminService) {
  }

  @Post()
  async create(@Body() payload: AuthorCreateAdminDto) {
    return await this.service.create(payload);
  }

  @Get()
  @ApiOkResponse({ type: () => AuthorListAdminDto, isArray: true })
  async getAll() {
    return await this.service.getAll();
  }

  @Patch(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() payload: AuthorUpdateAdminDto) {
    return await this.service.updateOne(id, payload);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    return await this.service.deleteOne(id);
  }
}

// Pipe - quvur, truba
// Validatsiya yoki Transformatsiya