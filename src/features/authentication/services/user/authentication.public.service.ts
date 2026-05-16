import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import argon2 from 'argon2';
import { OtpCodePublicService } from '@/features/authentication/services/otp-code/otp-code.public.service';
import { ResendOtpDto, SetPasswordDto, SignInDto, SignUpDto, VerifyOtpDto } from '@/features/authentication/dtos/user';
import { OtpType } from '@/core/enums/otp-type.enum';
import { UserPublicRepository } from '../../repository/user/authentication.public.repository';

@Injectable()
export class AuthenticationPublicService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly otpService: OtpCodePublicService,
    private readonly repo: UserPublicRepository
  ) {
  }

  async signUp(payload: SignUpDto) {
    let user = await this.repo.findOneBy({ login: payload.login }, { ILike: ["login"] });

    if (user && user.isActive && user.isVerified) {
      throw new BadRequestException('User with given login already exists');
    }

    if (user) {
      user.fullName = payload.fullName;
    } else {
      user = payload as User;
    }

    await this.repo.save(user);
    await this.otpService.sendOtp(user, OtpType.Register);
    return { message: "ok" }
  }

  async signIn({ login, password }: SignInDto) {
    let user = await this.repo.findOneBy({ login: login }, { ILike: ["login"] });
    if (!user || !user.password) {
      throw new UnauthorizedException();
    }

    if (!user.isActive || !user.isVerified) {
      throw new UnauthorizedException();
    }

    let passwordsMatch = await argon2.verify(user.password, password);
    if (!passwordsMatch) {
      throw new UnauthorizedException("parol xato");
    }

    let userPayload = {
      id: user.id,
      login: user.login,
      role: user.role,
    };

    let accessToken = this.jwtService.sign(userPayload,{expiresIn:"1d"});

    return { accessToken: accessToken };
  }

  async verifyOtp({ login, code }: VerifyOtpDto) {
    let user = await this.repo.findOneBy({ login: login }, { ILike: ["login"] });
    if (!user) {
      throw new BadRequestException('User with given login does not exist');
    }

    let otpValid = await this.otpService.verifyOtp(user.id, code);
    if (!otpValid) {
      throw new BadRequestException('Code invalid');
    }

    user.isVerified = true;
    await this.repo.save(user);
  }

  async setPassword(payload: SetPasswordDto) {
    let user = await this.repo.findOneBy({ login: payload.login }, { ILike: ["login"] });
    if (!user) {
      throw new NotFoundException('Does not exist');
    }

    let otpCode = await this.repo.otpFindOneBy(user.id, payload.code)
    if (!otpCode) {
      throw new BadRequestException('Code is wrong');
    }

    user.password = await argon2.hash(payload.password);
    user.isActive = true;
    let userPayload = {
      id: user.id,
      login: user.login,
      role: user.role,
    };

    await this.repo.save(user);
    
    let accessToken = this.jwtService.sign(userPayload,{expiresIn:"1d"});

    return { accessToken: accessToken };
  }

  async resendOtp({ login, loginType }: ResendOtpDto) {
    let user = await this.repo.findOneBy({ login: login, loginType }, { ILike: ["login"] });
    if (!user) {
      throw new NotFoundException('User with given login and loginType does not exist');
    }

    let otpExpire = Number(process.env.OTP_EXPIRE) * 1000;

    let lastOtp = await this.repo.otpFindOne(user.id);

    if (lastOtp) {
      let difference = Date.now() - Date.parse(lastOtp.created);
      if (difference < otpExpire) {
        throw new BadRequestException('Code not expired yet');
      }
    }

    await this.otpService.sendOtp(user, OtpType.Register);
  }
}
