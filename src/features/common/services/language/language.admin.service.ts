import { Language } from '@/features/common/entities/language.entity';
import { plainToInstance } from 'class-transformer';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LanguageCreateAdminDto } from '@/features/common/dtos/language/admin/language.create.admin.dto';
import { LanguageListAdminDto } from '@/features/common/dtos/language/admin/language.list.admin.dto';
import { LanguageUpdateAdminDto } from '@/features/common/dtos/language/admin/language.update.admin.dto';
import { LanguageAdminRepository } from '../../repository/language/language.admin.repository';

@Injectable()
export class LanguageAdminService {

  constructor(
    private readonly repo:LanguageAdminRepository
  ){}

  async create(payload: LanguageCreateAdminDto) {
    const alreadyExists =await this.repo.query(payload)
    
    if (alreadyExists) {
      throw new BadRequestException('Language with given title or code already exists');
    }

    const newLanguage = payload as Language;
    await this.repo.save(newLanguage);
    return newLanguage;
  }

  async updateOne(id: number, payload: LanguageUpdateAdminDto) {
    const language = await this.repo.findOneBy({ id });
    if (!language) {
      throw new NotFoundException('Language with given id not found');
    }

    if (payload.title) {
      const alreadyExists = await this.repo.countBy({ title: payload.title });
      if (alreadyExists) {
        throw new BadRequestException('Language with given title already exists');
      }
    }

    if (payload.code) {
      const alreadyExists = await this.repo.countBy({ code: payload.code });
      if (alreadyExists) {
        throw new BadRequestException('Language with given code already exists');
      }
    }

    Object.assign(
      language,
      Object.fromEntries(Object.entries(payload).filter(([key, value]) => value !== undefined)),
    );

    await this.repo.save(language);
    return language;
  }

  async getAll() {
    const languages = await this.repo.find();
    return plainToInstance(LanguageListAdminDto, languages);
  }

  async deleteOne(id: number) {
    const language = await this.repo.findOneBy({ id });
    if (!language) {
      throw new NotFoundException('Language with given id not found');
    }
    try {
      await this.repo.remove(language);
    } catch (exc) {
      throw new BadRequestException(`Language couldn't be deleted: ${exc}`);
    }
  }
}