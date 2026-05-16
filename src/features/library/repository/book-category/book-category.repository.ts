import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { BookCategory } from "../../entities/book-category.entity";



@Injectable()
export class BookCategoryRepository extends BaseRepository<BookCategory> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(BookCategory)
        protected readonly repo:Repository<BookCategory>
    ){
        super()
    }
    
}