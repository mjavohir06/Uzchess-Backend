import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Language } from "../../entities/language.entity";
import { LanguageCreateAdminDto } from "../../dtos/language/admin/language.create.admin.dto";




@Injectable()
export class LanguageAdminRepository extends BaseRepository<Language> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(Language)
        protected readonly repo: Repository<Language>
    ) {
        super()
    }

    async query(payload: LanguageCreateAdminDto) {
        const t=await this.repo.findOneBy({ title: payload.title })
        const c=await this.repo.findOneBy({code:payload.code})
        return t||c
    }

}