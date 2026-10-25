import { Module } from '@nestjs/common';
import { BookCategoryControllerAdmin } from './controllers/book-category/book-category.admin.controller';
import { BookCategoryServiceAdmin } from './services/book-category/book-category.service.admin';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategory } from './entities/book-category.entity';
import { BookCategoryRepository } from './repository/book-category/book-category.repository';
import { BookPublicRepository } from './repository/book/book.public.repository';
import { BookAdminRepository } from './repository/book/book.admin.repository';
import { BookPublicController } from './controllers/book/book.public.controller';
import { BookAdminController } from './controllers/book/book.admin.controller';
import { Book } from './entities/book.entity';
import { Author } from '../common/entities/author.entity';
import { Language } from '../common/entities/language.entity';
import { User } from '../authentication/entities/user.entity';
import { Difficulty } from '../common/entities/difficulty.entity';
import { BookPublicService } from './services/book/book.public.service';
import { BookAdminService } from './services/book/book.admin.service';
import { BookLikePublicRepository } from './repository/book-like/book-like.public.repository';
import { BookLikePublicService } from './services/book-like/book-like.public.service';
import { BookLikePublicController } from './controllers/book-like/book-like.public.controller';
import { BookLike } from './entities/book-like.entity';
import { BookCategoryCreateHandler } from './handlers/book- category/book-category-create.handler';

@Module({
  imports:[TypeOrmModule.forFeature([BookCategory,BookLike,Book,Author,Language,Difficulty,User])],
  controllers: [
    BookCategoryControllerAdmin,
    BookPublicController,
    BookAdminController,
    BookLikePublicController,
  ],
  providers: [
    BookCategoryServiceAdmin,
    BookPublicService,
    BookAdminService,
    BookLikePublicService,

    //handler
    BookCategoryCreateHandler,

    // repository
    BookCategoryRepository,
    BookPublicRepository,
    BookAdminRepository,
    BookLikePublicRepository
  ],
  exports: [BookCategoryServiceAdmin],
})
export class LibraryModule {}
