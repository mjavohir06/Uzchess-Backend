import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";



@Injectable()
export class UserAdminRepository extends BaseRepository<User> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(User)
        protected readonly repo:Repository<User>
    ){
        super()
    }
    
}