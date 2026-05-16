import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FindOptionsWhere, ILike, Not, Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { News } from "../entities/news.entity";
import { NewsViews } from "../entities/news-views.entity";
import { NewsFilters } from "../filters/news.filters";



@Injectable()
export class NewsPublicRepository extends BaseRepository<News> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(News)
        protected readonly repo: Repository<News>,
        @InjectRepository(NewsViews)
        protected readonly viewNews: Repository<NewsViews>,
    ) {
        super()
    }

    async getAll(filters: NewsFilters) {
        let whereOptions: FindOptionsWhere<News> = {};
        if (filters.search) {
            whereOptions.title = ILike(`%${filters.search}%`);
        }


        return await super.getAll(filters, whereOptions,);
    }

    async getOne(id: number, take: number ) {

        return await this.repo.find({ where: { id: Not(id) }, take: take, order:{id:"DESC"} })
    }

    async getViews(id: number) {
        return await this.viewNews.countBy({ newsId: id })
    }

}