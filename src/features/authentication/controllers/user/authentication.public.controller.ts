import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { SignInDto } from '../../dtos/user/public/sign-in.dto';
import { AuthenticationPublicService } from '../../services/user/authentication.public.service';
import { SignUpDto } from '../../dtos/user/public/sign-up.dto';
import { ResendOtpDto } from '@/features/authentication/dtos/user';
import { VerifyOtpDto } from '@/features/authentication/dtos/user';
import { SetPasswordDto } from '@/features/authentication/dtos/user';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthenticationPublicController {
  constructor(private readonly authService: AuthenticationPublicService) { }

  private cookieSet(res: Response, token: string) {
    const cook=res.cookie("accessToken", token, {
      httpOnly: true,   
      secure:process.env.NODE_ENV === "production",     
      sameSite: "lax", 
      maxAge: 1000 * 60 * 60 * 24, 
    })
    
    return cook
  }

  @Post('sign-up')
  async signUp(@Body() payload: SignUpDto) {

    return await this.authService.signUp(payload);
  }

  @Post('sign-in')
  async signIn(@Res({ passthrough: true }) res: Response,@Req() req:Request, @Body() payload: SignInDto) {
    
    const result = await this.authService.signIn(payload);
    this.cookieSet(res, result.accessToken)
    return result
  }

  @Post('verify-otp')
  async verifyOtp(@Body() payload: VerifyOtpDto) {
    return await this.authService.verifyOtp(payload);
  }

  @Post('resend-otp')
  async resendOtp(@Body() payload: ResendOtpDto) {
    return await this.authService.resendOtp(payload);
  }

  @Post('set-password')
  async setPassword(@Res({passthrough:true}) res:Response,@Body() payload: SetPasswordDto) {
    const result=await this.authService.setPassword(payload);
    this.cookieSet(res,result.accessToken)
    return result
  }
}
