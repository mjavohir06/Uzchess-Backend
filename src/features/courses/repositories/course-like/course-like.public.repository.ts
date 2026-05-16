import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseLike } from "../../entities/course-like.entity";
import { Course } from "../../entities/course.entity";
import { User } from "@/features/authentication/entities/user.entity";



@Injectable()
export class CourseLikePublicRepository extends BaseRepository<CourseLike> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(CourseLike)
        protected readonly repo:Repository<CourseLike>,
        @InjectRepository(Course)
        protected readonly course:Repository<Course>,
        @InjectRepository(User)
        protected readonly user:Repository<User>
    ){
        super()
    }
    
    async courseFindOneBy(c:Record<string,string|number>){
        return await this.course.findOneBy(c)
    }
    async userFindOneBy(u:Record<string,string|number>){
        return await this.user.findOneBy(u)
    }
}