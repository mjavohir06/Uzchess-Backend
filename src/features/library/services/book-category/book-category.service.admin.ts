import { BookCategoryCreateDtoAdmin } from '../../dtos/book-category/admin/book-category.create.dto.admin';
import { BookCategory } from '../../entities/book-category.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BookCategoryUpdateDtoAdmin } from '../../dtos/book-category/admin/book-category.update.dto.admin';
import { Not, QueryFailedError } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { BookCategoryListDtoAdmin } from '../../dtos/book-category/admin/book-category.list.dto.admin';
import { CommandBus } from '@nestjs/cqrs';
import { BookCategoryCreateCommand } from '../../commands/book-category/book-category-create.command';
import { BookCategoryRepository } from '../../repository/book-category/book-category.repository';

@Injectable()
export class BookCategoryServiceAdmin {

  constructor(private readonly commandBus: CommandBus,
    private readonly repo: BookCategoryRepository
  ) {

  }

  async create(payload: BookCategoryCreateDtoAdmin): Promise<BookCategory> {

    return await this.commandBus.execute(new BookCategoryCreateCommand(payload))
  }

  async update(id: number, payload: BookCategoryUpdateDtoAdmin): Promise<BookCategory> {
    let bookCategory = await this.repo.findOneBy({ id });
    if (!bookCategory) {
      throw new NotFoundException('Does not exist');
    }

    let alreadyExists = await this.repo.countBy({ id: Not(id), title: payload.title });
    if (alreadyExists) {
      throw new BadRequestException('Already exists');
    }

    bookCategory.title = payload.title;
    await this.repo.save(bookCategory);
    return bookCategory;
  }

  async findAll(): Promise<BookCategoryListDtoAdmin[]> {
    let bookCategories = await this.repo.find();
    let data = plainToInstance(BookCategoryListDtoAdmin, bookCategories, { excludeExtraneousValues: true });
    return data;
  }

  async delete(id: number): Promise<undefined> {
    let bookCategory = await this.repo.findOneBy({ id });
    if (!bookCategory) {
      throw new NotFoundException('Does not exist');
    }
    try {
      await this.repo.remove(bookCategory);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        // detail: 'Key (categoryId)=(1) is still referenced from table "books".'
        console.log(err.driverError.detail)

        // book id ni olish
        const match = err.driverError.detail?.match(/\((\d+)\)/)
        const bookId = match ? match[1] : null

        throw new BadRequestException(
          `Bu kategoriya ${bookId ? `(book id: ${bookId})` : "biror kitob"} ga ulangan, o'chirib bo'lmaydi!`
        )
      }
      throw new BadRequestException("O'chirib bo'lmadi!")
    }
  }
}
