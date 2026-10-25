import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@/features/authentication/entities/user.entity";
import { BookLike } from "../../entities/book-like.entity";
import { Book } from "../../entities/book.entity";




@Injectable()
export class BookLikePublicRepository extends BaseRepository<BookLike> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(BookLike)
        protected readonly repo:Repository<BookLike>,
        @InjectRepository(Book)
        protected readonly book:Repository<Book>,
        @InjectRepository(User)
        protected readonly user:Repository<User>
    ){
        super()
    }
    
    async courseFindOneBy(c:Record<string,string|number>){
        return await this.book.findOneBy(c)
    }
    async userFindOneBy(u:Record<string,string|number>){
        return await this.user.findOneBy(u)
    }
}