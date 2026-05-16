import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Language } from "../../entities/language.entity";




@Injectable()
export class LanguagePublicRepository extends BaseRepository<Language> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(Language)
        protected readonly repo:Repository<Language>
    ){
        super()
    }
    
}