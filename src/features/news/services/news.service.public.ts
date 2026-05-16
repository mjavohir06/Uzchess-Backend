import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { NewsListDtoPublic } from '../dtos/news/public/news.list.dto.public';
import { NewsDetailDtoPublic } from '../dtos/news/public/news.detail.dto.public';
import { NewsFilters } from '@/features/news/filters/news.filters';
import { ConfigService } from '@nestjs/config';
import { NewsPublicRepository } from '../repository/news.public.repository';


@Injectable()
export class NewsServicePublic {
  constructor(private readonly config: ConfigService,
    private readonly repo:NewsPublicRepository
  ) {
  }

  async getAll(filters: NewsFilters) {
    
    let news = await this.repo.getAll(filters);
    news.data = plainToInstance(NewsListDtoPublic, news.data, { excludeExtraneousValues: true });
    return news ;
  }

  async getOne(id: number) {
    let news = await this.repo.findOneBy({ id });
    if (!news) {
      throw new NotFoundException();
    }
    
    const views=await this.repo.getViews(id)

    const othernews=await this.repo.getOne(id,3)
    
    let data = plainToInstance(NewsDetailDtoPublic, news, { excludeExtraneousValues: true });
    return {...data,views:views,othernews};
  }
}