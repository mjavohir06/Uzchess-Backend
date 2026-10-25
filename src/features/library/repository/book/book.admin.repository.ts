import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ILike, ObjectLiteral, Repository } from "typeorm";
import { BaseRepository } from "@/core/repository/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Author } from "@/features/common/entities/author.entity";
import { Language } from "@/features/common/entities/language.entity";
import { Difficulty } from "@/features/common/entities/difficulty.entity";
import { title } from "process";
import { Book } from "../../entities/book.entity";
import { BookCategory } from "../../entities/book-category.entity";
import { CoursePublicFilters } from "@/features/courses/filters/course.public.filters";



@Injectable()
export class BookAdminRepository extends BaseRepository<Book> {
    constructor(
        protected readonly config: ConfigService,
        @InjectRepository(Book)
        protected readonly repo: Repository<Book>,
        @InjectRepository(Author)
        protected readonly author: Repository<Author>,
        @InjectRepository(BookCategory)
        protected readonly catagory: Repository<BookCategory>,
        @InjectRepository(Language)
        protected readonly language: Repository<Language>,
        @InjectRepository(Difficulty)
        protected readonly difficulty: Repository<Difficulty>,
    ) {
        super()
    }

    async bookCountBy(where: Record<string, any>) {
        return await this.repo.countBy(where)
    }

    async authorCountBy(where: Record<string, any>) {
        return await this.author.countBy(where)
    }

    async languageCountBy(where: Record<string, any>) {
        return await this.language.countBy(where)
    }

    async categoryCountBy(where: Record<string, any>) {
        return await this.catagory.countBy(where)
    }

    async difficultyCountBy(where: Record<string, any>) {
        return await this.difficulty.countBy(where)
    }

    async getAllCourse(filter: CoursePublicFilters, userId?: number) {
        if (!filter.page) filter.page = this.config.getOrThrow<number>("DEFAULT_PAGE")
        if (!filter.size) filter.size = this.config.getOrThrow<number>("DEFAULT_SIZE")
        const skip = (filter.page - 1) * filter.size

        const qb = this.repo.createQueryBuilder('courses')
            .leftJoinAndSelect('courses.likes', 'likes', 'likes.userId = :userId', { userId })
            .leftJoinAndSelect('courses.author', 'author')
            .leftJoinAndSelect('courses.category', 'category')
            .leftJoinAndSelect('courses.difficulty', 'difficulty')
            .leftJoinAndSelect('courses.language', 'language')
            .skip(skip)
            .take(filter.size)

        if (filter.search) {
            qb.where('courses.title ILIKE :title', { title: `%${filter.search}%` })
        }
        const data=await qb.getMany()
        let where={}
        if(filter.search) where={title:ILike(`%${filter.search}%`)}

        return super.paginate(data,filter,where)
    }
    

}