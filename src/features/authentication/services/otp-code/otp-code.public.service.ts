import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { OtpCode } from '../../entities/otp-code.entity';
import { OtpType } from '@/core/enums/otp-type.enum';
import { OtpCodePublicRepository } from '../../repository/otp-code/otp-code.public.repository';

@Injectable()
export class OtpCodePublicService {

  constructor(
    private readonly repo: OtpCodePublicRepository
  ) { }


  private generateOtp(): string {
    let otpCode = Math.floor(Math.random() * 1_000_000).toString(10);
    let code: any[] = [];
    for (let i = 0; i < 6 - otpCode.length; i++) {
      code.push(0);
    }

    code.push(otpCode);
    let kod:string=""
    for(let c of code) kod+=c

    return kod;
  }

  private async sendCodeToChanel(user:any, code:string) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: `User: ${user.login} Code <code>${code}</code>`,
            parse_mode: "HTML"
          })
        }
      )
      const data = res.json()
      return data

    } catch (err) {
      return null
    }
  }




  async sendOtp(user: User, type: OtpType) {
    await this.deleteOtps(user.id);

    let otpCode = {
      userId: user.id,
      code: this.generateOtp(),
      type: type,
    } as OtpCode;

    await this.sendCodeToChanel(user,otpCode.code)
    
    await this.repo.save(otpCode);
    // TODO: otpni haqiqiy send qilish shu yerda bo'ladi
  }

  async verifyOtp(userId: number, code: string) {
    let otpCode = await this.repo.findOneBy({ userId: userId });

    if (!otpCode || otpCode.code !== code) {
      throw new BadRequestException('Codes do not match');
    }

    let otpExpire = Number(process.env.OTP_EXPIRE) * 1000; // millisekundda
    let difference = Date.now() - Date.parse(otpCode.created);
    if (difference > otpExpire) {
      throw new BadRequestException('Code expired');
    }

    return true;
  }



  private async deleteOtps(userId: number) {
    let otpCodes = await this.repo.findBy({ userId });
    await this.repo.removesome(otpCodes);
  }
}
