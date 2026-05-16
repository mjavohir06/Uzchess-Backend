import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "../../entities/course.entity";
import { CoursePublicFilters } from "../../filters/course.public.filters";



@Injectable()
export class CoursePublicRepository extends BaseRepository<Course> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(Course)
        protected readonly repo: Repository<Course>
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

}