import { AuthorCreateAdminDto } from '@/features/common/dtos/author/admin/author.create.admin.dto';
import { Author } from '@/features/common/entities/author.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthorListAdminDto } from '@/features/common/dtos/author/admin/author.list.admin.dto';
import { AuthorUpdateAdminDto } from '@/features/common/dtos/author/admin/author.update.admin.dto';
import { AuthorAdminRepository } from '../../repository/author/author.admin.repository';

@Injectable()
export class AuthorAdminService {

  constructor(private readonly repo:AuthorAdminRepository){}

  async create(payload: AuthorCreateAdminDto) {
    const author = payload as Author;
    await this.repo.save(author);
    return author;
  }

  async updateOne(id: number, payload: AuthorUpdateAdminDto) {
    /*
    payload ichida fullName kelishi aniq, chunki author ichida faqat bitta o'zgartirsa bo'ladigan field bor xolos
    */
    const author = await this.repo.findOneBy({ id });
    if (!author) {
      throw new NotFoundException('Author with given id not found');
    }

    author.fullName = payload.fullName;
    await this.repo.save(author);
    return author;
  }


  async getAll() {
    const authors = await this.repo.find();
    return plainToInstance(AuthorListAdminDto, authors);
  }

  async deleteOne(id: number) {
    const author = await this.repo.findOneBy({ id });
    if (!author) {
      throw new NotFoundException('Author with given id not found');
    }

    try {
      await this.repo.remove(author);
    } catch (exc) {
      throw new BadRequestException(`Author couldn't be deleted: ${exc}`);
    }
  }
}