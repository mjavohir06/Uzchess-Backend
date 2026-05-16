import { Module } from '@nestjs/common';
import { BookCategoryControllerAdmin } from './controllers/book-category/book-category.controller.admin';
import { BookCategoryServiceAdmin } from './services/book-category/book-category.service.admin';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategory } from './entities/book-category.entity';
import { BookCategoryRepository } from './repository/book-category/book-category.repository';

@Module({
  imports:[TypeOrmModule.forFeature([BookCategory])],
  controllers: [BookCategoryControllerAdmin],
  providers: [
    BookCategoryServiceAdmin,

    // repository
    BookCategoryRepository,
  ],
  exports: [BookCategoryServiceAdmin],
})
export class LibraryModule {}
