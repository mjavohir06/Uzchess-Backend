import { Injectable } from "@nestjs/common";
import { CourseCategory } from "../../entities/course-category.entity";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";



@Injectable()
export class CourseCategoryPublicRepository extends BaseRepository<CourseCategory> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(CourseCategory)
        protected readonly repo:Repository<CourseCategory>
    ){
        super()
    }
    
}