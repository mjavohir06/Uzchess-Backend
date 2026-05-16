import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Author } from "../../entities/author.entity";



@Injectable()
export class AuthorAdminRepository extends BaseRepository<Author> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(Author)
        protected readonly repo:Repository<Author>
    ){
        super()
    }
    
}