import { Language } from '@/features/common/entities/language.entity';
import { plainToInstance } from 'class-transformer';
import { LanguageListPublicDto } from '@/features/common/dtos/language/public/language.list.public.dto';
import { Injectable } from '@nestjs/common';
import { LanguagePublicRepository } from '../../repository/language/language.public.repository';

@Injectable()
export class LanguagePublicService {

  constructor(private readonly repo:LanguagePublicRepository){}

  async getAll() {
    const languages = await this.repo.find();
    return plainToInstance(LanguageListPublicDto, languages);
  }
}