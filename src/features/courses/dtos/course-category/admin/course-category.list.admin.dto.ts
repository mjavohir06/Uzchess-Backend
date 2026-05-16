import { BaseModelListDto } from '@/core/base-model.list.dto';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CourseCategoryListAdminDto extends BaseModelListDto {
  @Expose()
  @ApiProperty()
  title!: string;
}
