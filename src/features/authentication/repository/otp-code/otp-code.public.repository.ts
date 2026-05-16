import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { OtpCode } from "../../entities/otp-code.entity";



@Injectable()
export class OtpCodePublicRepository extends BaseRepository<OtpCode> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(OtpCode)
        protected readonly repo:Repository<OtpCode>
    ){
        super()
    }
    
}