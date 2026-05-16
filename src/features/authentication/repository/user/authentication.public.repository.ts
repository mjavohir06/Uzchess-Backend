import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { OtpCode } from "../../entities/otp-code.entity";
import { OtpType } from "@/core/enums/otp-type.enum";



@Injectable()
export class UserPublicRepository extends BaseRepository<User> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(User)
        protected readonly repo: Repository<User>,
        @InjectRepository(OtpCode)
        protected readonly otp: Repository<OtpCode>,
    ) {
        super()
    }

    async otpFindOne(id: number) {
        return await OtpCode.findOne({
            where: { userId: id },
            order: { created: 'desc' },
        })
    }

    async otpFindOneBy(id:number,code:string){
        return await OtpCode.findOneBy({ userId: id, code: code, type: OtpType.Register });
    }

}