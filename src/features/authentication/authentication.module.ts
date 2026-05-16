import { Module } from '@nestjs/common';
import { AuthenticationPublicService } from './services/user/authentication.public.service';
import { OtpCodePublicService } from './services/otp-code/otp-code.public.service';
import { AuthenticationPublicController } from './controllers/user/authentication.public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpCode } from './entities/otp-code.entity';
import { OtpCodePublicRepository } from './repository/otp-code/otp-code.public.repository';
import { UserAdminRepository } from './repository/user/authentication.admin.repository';
import { User } from './entities/user.entity';
import { UserPublicRepository } from './repository/user/authentication.public.repository';


@Module({
  imports:[
    TypeOrmModule.forFeature([OtpCode,User])
  ],
  providers: [
    AuthenticationPublicService, 
    OtpCodePublicService,

    // Repositories
    OtpCodePublicRepository,
    UserAdminRepository,
    UserPublicRepository
  ],
  controllers: [
    AuthenticationPublicController

  ],
})
export class AuthenticationModule {
}
