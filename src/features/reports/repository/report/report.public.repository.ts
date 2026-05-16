import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "../../entities/report.entity";
import { ReportCategory } from "../../entities/report-category.entity";
import { BookReview } from "@/features/library/entities/book-review.entity";
import { CourseReview } from "@/features/courses/entities/course-review.entity";
import { User } from "@/features/authentication/entities/user.entity";




@Injectable()
export class ReportPublicRepository extends BaseRepository<Report> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(Report)
        protected readonly repo:Repository<Report>,
        @InjectRepository(ReportCategory)
        protected readonly category:Repository<ReportCategory>,
        @InjectRepository(BookReview)
        protected readonly bookReview:Repository<BookReview>,
        @InjectRepository(CourseReview)
        protected readonly courseReview:Repository<CourseReview>,
        @InjectRepository(User)
        protected readonly user:Repository<User>,
    ){
        super()
    }

    async categoryGet(where:Record<string,any>){
        return this.category.findOneBy(where)
    }

    async allCategories(){
        return this.category.find()
    }

    async brGet(where:Record<string,any>){
        return this.bookReview.findOneBy(where)
    }

    async crGet(where:Record<string,any>){
        return this.courseReview.findOneBy(where)
    }

    async userGet(where:Record<string,any>){
        return this.user.findOneBy(where)
    }
    
}