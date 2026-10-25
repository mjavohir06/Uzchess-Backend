import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FindOptionsWhere, ILike, IsNull, Not, Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "../../entities/course.entity";
import { CoursePublicFilters } from "../../filters/course.public.filters";
import { CourseReview } from "../../entities/course-review.entity";



@Injectable()
export class CoursePublicRepository extends BaseRepository<Course> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(Course)
        protected readonly repo: Repository<Course>,
        @InjectRepository(CourseReview)
        protected readonly review: Repository<CourseReview>,
    ) {
        super()
    }

    async countBy(filters: CoursePublicFilters) {
        let whereOptions: FindOptionsWhere<Course> = {};
        if (filters.search) {
            whereOptions.title = ILike(`%${filters.search}%`);
        }
        return await this.repo.countBy(whereOptions)
    }

    async findpage(filters: CoursePublicFilters, skip: number, take: number) {
        let whereOptions: FindOptionsWhere<Course> = {};
        if (filters.search) {
            whereOptions.title = ILike(`%${filters.search}%`);
        }
        return await Course.find({
            relations: ['author', 'category', 'language', 'difficulty'],
            where: whereOptions, skip: skip, take: take,
        });
    }

    async findOne(options: FindOptionsWhere<Course>) {
        return await this.repo.findOne({
            relations: ['author', 'category', 'language', 'difficulty'],
            where: options,
        });
    }
    async getTop(soni: number) {
        return await this.repo.find({
            order: { rating: "DESC" },
            take: soni,
            where: { rating: Not(IsNull()) }
        })
    }

    async findReviewOne(where:FindOptionsWhere<CourseReview>){
        return await this.review.findOneBy(where)
    }
    async findAllReview(){
        return this.review.find({select:["rating"]})
    }

    async saveReview(schema:CourseReview){
        return await this.review.save(schema)
    }

}