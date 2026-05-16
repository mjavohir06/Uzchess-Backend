import {Module} from '@nestjs/common';
import {NewsServiceAdmin} from './services/news.service.admin';
import {NewsControllerAdmin} from './controllers/news.controller.admin';
import {NewsServicePublic} from './services/news.service.public';
import {NewsControllerPublic} from './controllers/news.controller.public';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { NewsAdminRepository } from './repository/news.admin.repository';
import { NewsPublicRepository } from './repository/news.public.repository';
import { NewsViews } from './entities/news-views.entity';

@Module({
  imports:[TypeOrmModule.forFeature([News,NewsViews])],
  providers: [
    NewsServiceAdmin, 
    NewsServicePublic,

    // Repositories
    NewsAdminRepository,
    NewsPublicRepository,
  ],
  controllers: [NewsControllerAdmin, NewsControllerPublic],
})
export class NewsModule {
}