import {Injectable, NotFoundException} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';
import {NewsCreateDtoAdmin} from '../dtos/news/admin/news.create.dto.admin';
import {News} from '../entities/news.entity';
import {NewsUpdateDtoAdmin} from '../dtos/news/admin/news.update.dto.admin';
import {NewsListDtoAdmin} from '../dtos/news/admin/news.list.dto.admin';
import {NewsDetailDtoAdmin} from '../dtos/news/admin/news.detail.dto.admin';
import { NewsAdminRepository } from '../repository/news.admin.repository';
import { NewsFilters } from '../filters/news.filters';

@Injectable()
export class NewsServiceAdmin {

  constructor(private readonly repo:NewsAdminRepository){}

  async create(payload: NewsCreateDtoAdmin, image: Express.Multer.File): Promise<News> {
    let newNews = {...payload, image: image.path} as News;
    await this.repo.save(newNews);
    return newNews;
  }

  async update(id: number, payload: NewsUpdateDtoAdmin): Promise<News> {
    let news = await this.repo.findOneBy({id});
    if (!news) {
      throw new NotFoundException('Does not exist');
    }

    Object.assign(
      news,
      Object.fromEntries(Object.entries(payload).filter(([key, value]) => value != null))
    )
    await this.repo.save(news);
    return news;
  }

  async findAll(filters:NewsFilters) {
    let news = await this.repo.getAll(filters);
    return news;
  }

  async findOne(id: number): Promise<NewsDetailDtoAdmin> {
    let news = await this.repo.findOneBy({id});
    let data = plainToInstance(NewsDetailDtoAdmin, news, {excludeExtraneousValues: true});
    return data;
  }

  async delete(id: number): Promise<undefined> {
    let news = await this.repo.findOneBy({id});
    if (!news) {
      throw new NotFoundException('Does not exist');
    }

    await this.repo.remove(news);
  }
}