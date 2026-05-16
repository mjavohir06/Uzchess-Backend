import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BookCategoryCreateCommand } from "../../commands/book-category/book-category-create.command";
import { BookCategoryRepository } from "../../repository/book-category/book-category.repository";
import { BookCategory } from "../../entities/book-category.entity";
import { BadRequestException } from "@nestjs/common";


@CommandHandler(BookCategoryCreateCommand)

export class BookCategoryCreateHandler implements ICommandHandler<BookCategoryCreateCommand> {
    constructor(private readonly repo: BookCategoryRepository) { }

    async execute(command: BookCategoryCreateCommand) {
        let alreadyExists = await this.repo.countBy({ title: command.payload.title });
        if (alreadyExists) {
            throw new BadRequestException('Already exists');
        }

        let newBookCategory = command.payload as BookCategory;


        return await this.repo.save(newBookCategory)
    }
}