import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DifficultyCreateAdminDto } from '@/features/common/dtos/difficulty/admin/difficulty.create.admin.dto';
import { ApiBearerAuth, ApiConsumes, ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/configs/multer.configs';
import { DifficultyAdminService } from '@/features/common/services/difficulty/difficulty.admin.service';
import { DifficultyUpdateAdminDto } from '@/features/common/dtos/difficulty/admin/difficulty.update.admin.dto';
import { DifficultyListAdminDto } from '@/features/common/dtos/difficulty/admin/difficulty.list.admin.dto';
import { Roles } from '@/core/decorators/roles.decorator';
import { Role } from '@/core/enums/role.enum';

@ApiTags('Difficulty - Admin')
@ApiCookieAuth()
@Controller('admin/difficulty')
@Roles(Role.Admin, Role.SuperAdmin)
export class DifficultyAdminController {
  constructor(private readonly service: DifficultyAdminService) {
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', {storage: storageOptions}))
  async create(@Body() payload: DifficultyCreateAdminDto, @UploadedFile() icon: Express.Multer.File) {
    return await this.service.create(payload, icon);
  }

  @Get()
  @ApiOkResponse({ type: [DifficultyListAdminDto]})
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: DifficultyListAdminDto })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { storage: storageOptions }))
  async updateOne(@Param('id') id: number, payload: DifficultyUpdateAdminDto, @UploadedFile() icon?: Express.Multer.File) {
    return await this.service.updateOne(id, payload, icon);
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.deleteOne(id);
  }

}