import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { News } from "../entities/news.entity";



@Injectable()
export class NewsAdminRepository extends BaseRepository<News> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(News)
        protected readonly repo:Repository<News>
    ){
        super()
    }
    
}