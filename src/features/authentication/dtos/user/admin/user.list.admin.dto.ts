import { BaseModelListDto } from '@/core/base-model.list.dto';
import { Role } from '@/core/enums/role.enum';
import { LoginType } from '@/core/enums/login-type.enum';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserListAdminDto extends BaseModelListDto {
  @Expose()
  @ApiProperty()
  role!: Role;

  @Expose()
  @ApiProperty()
  fullName!: string;


  @Expose()
  @ApiProperty()
  birthDate?: string;

  @Expose()
  @ApiProperty()
  profileImage?: string;

  @Expose()
  @ApiProperty()
  login!: string;

  @Expose()
  @ApiProperty()
  loginType!: LoginType;

  @Expose()
  @ApiProperty()
  isVerified!: boolean;

  @Expose()
  @ApiProperty()
  isActive!: boolean;
}