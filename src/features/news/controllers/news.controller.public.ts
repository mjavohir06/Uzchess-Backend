import { Controller, Get, Param, ParseIntPipe, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NewsServicePublic } from '../services/news.service.public';
import { NewsDetailDtoPublic } from '../dtos/news/public/news.detail.dto.public';
import getFullPath from '@/core/utils/get-full-path';
import { NewsFilters } from '@/features/news/filters/news.filters';
import { PaginatedResultDto } from '@/features/common/dtos/paginated-result.dto';
import { NewsListDtoPublic } from '@/features/news/dtos/news/public/news.list.dto.public';


@ApiTags('News - Public')
@Controller('public/news')
export class NewsControllerPublic {
  constructor(private readonly service: NewsServicePublic) {
  }

  @Get()
  @ApiOkResponse({ type:()=> PaginatedResultDto(NewsListDtoPublic) })
  async getAll(@Req() req: Request, @Query() filters: NewsFilters) {
    const result = await this.service.getAll(filters);
    // @ts-ignore
    result.data.forEach((item) => (item.image = getFullPath(req, item.image)));
    
    return result;
  }

  @Get(':id')
  @ApiOkResponse({ type: NewsDetailDtoPublic })
  async getOne(@Req() req:Request,@Param('id', ParseIntPipe) id: number) {
    
    const result=await this.service.getOne(id);
    result.othernews.forEach(item=>(item.image=getFullPath(req,item.image)))
    result.image=getFullPath(req,result.image)
    return result
  }
}
