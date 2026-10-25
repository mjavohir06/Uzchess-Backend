import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FindOptionsWhere, ILike, IsNull, Not, Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "../../entities/book.entity";
import { CoursePublicFilters } from "@/features/courses/filters/course.public.filters";



@Injectable()
export class BookPublicRepository extends BaseRepository<Book> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(Book)
        protected readonly repo: Repository<Book>
    ) {
        super()
    }

    async countBy(filters: CoursePublicFilters) {
        let whereOptions: FindOptionsWhere<Book> = {};
        if (filters.search) {
            whereOptions.title = ILike(`%${filters.search}%`);
        }
        return await this.repo.countBy(whereOptions)
    }

    async findpage(filters: CoursePublicFilters, skip: number, take: number) {
        let whereOptions: FindOptionsWhere<Book> = {};
        if (filters.search) {
            whereOptions.title = ILike(`%${filters.search}%`);
        }
        return await this.repo.find({
            relations: ['author', 'category', 'language', 'difficulty'],
            where: whereOptions, skip: skip, take: take,
        });
    }

    async findOne(options: FindOptionsWhere<Book>) {
        return await this.repo.findOne({
            relations: ['author', 'category', 'language', 'difficulty'],
            where: options,
        });
    }

    async getTop(soni:number){
        return await this.repo.find({
        order: { rating: "DESC" },
        take: soni,
        where: { rating: Not(IsNull()) }
    })
    }

}