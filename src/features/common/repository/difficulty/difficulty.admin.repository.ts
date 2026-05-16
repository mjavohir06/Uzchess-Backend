import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Difficulty } from "../../entities/difficulty.entity";



@Injectable()
export class DifficultyAdminRepository extends BaseRepository<Difficulty> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(Difficulty)
        protected readonly repo:Repository<Difficulty>
    ){
        super()
    }
    
}