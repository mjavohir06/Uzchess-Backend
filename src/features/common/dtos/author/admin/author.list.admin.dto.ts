import { IsString, MaxLength } from 'class-validator';
import { BaseModelListDto } from '@/core/base-model.list.dto';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorListAdminDto extends BaseModelListDto {
  @Expose()
  @ApiProperty({example: 'Solih Coder'})
  fullName!: string;
}
