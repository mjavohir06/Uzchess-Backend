import type { Request } from 'express';
import { Controller, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/core/decorators/roles.decorator';
import { Role } from '@/core/enums/role.enum';
import { BookLikePublicService } from '@/features/library/services/book-like/book-like.public.service';

@ApiTags('BookLike - Public')
@ApiBearerAuth()
@Controller('public/book-like')
@Roles(Role.User,Role.Admin,Role.SuperAdmin)
export class BookLikePublicController {
  constructor(private readonly service: BookLikePublicService) {
  }

  @Post(':bookId')
  async toggleLike(@Req() request: Request, @Param('bookId', ParseIntPipe) id: number) {
    console.log(request.user);
    // @ts-ignore
    
    return await this.service.toggleLike(id, request.user.id);
  }
}