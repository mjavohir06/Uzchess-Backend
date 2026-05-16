import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "../../entities/report.entity";
import { ReportCategory } from "../../entities/report-category.entity";
import { ReportCategoryCreateAdminDto } from "../../dtos/report-category/admin/report-category.create.admin.dto";
import { PaginationFilters } from "@/features/common/filters/pagination.filters";




@Injectable()
export class ReportAdminRepository extends BaseRepository<Report> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(Report)
        protected readonly repo: Repository<Report>,
        @InjectRepository(ReportCategory)
        protected readonly category: Repository<ReportCategory>,
        // @InjectRepository(BookReview)
        // protected readonly bookReview: Repository<BookReview>,
        // @InjectRepository(CourseReview)
        // protected readonly courseReview: Repository<CourseReview>,
        // @InjectRepository(User)
        // protected readonly user: Repository<User>,
    ) {
        super()
    }

    async createCategory(body:ReportCategoryCreateAdminDto){
        const exist=await this.category.findOneBy({title:body.title})
        if(exist) throw new BadRequestException("this title already exist")

        const data=body as ReportCategory
        return this.category.save(data)
    }

    async getAllReports(filter:PaginationFilters){
        return await super.getAll(filter)
    }

}