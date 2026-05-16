import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Report } from "./entities/report.entity";
import { ReportPublicService } from "./services/report/report.public.service";
import { ReportPublicController } from "./controller/report.public.controller";
import { User } from "../authentication/entities/user.entity";
import { BookReview } from "../library/entities/book-review.entity";
import { CourseReview } from "../courses/entities/course-review.entity";
import { ReportCategory } from "./entities/report-category.entity";
import { ReportPublicRepository } from "./repository/report/report.public.repository";
import { ReportAdminService } from "./services/report/report.admin.service";
import { ReportAdminController } from "./controller/report.admin.controller";
import { ReportAdminRepository } from "./repository/report/report.admin.repository";


@Module({
    imports:[
        TypeOrmModule.forFeature([Report,User,BookReview,CourseReview,ReportCategory]),
    ],
    providers:[
        ReportPublicService,
        ReportAdminService,

        //Repositories
        ReportPublicRepository,
        ReportAdminRepository
    ],
    controllers:[
        ReportPublicController,
        ReportAdminController
    ]

})

export class ReportModule{

}
