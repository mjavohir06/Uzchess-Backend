import { Module } from '@nestjs/common';
import { AuthorAdminController } from '@/features/common/controllers/author/author.admin.controller';
import { AuthorAdminService } from '@/features/common/services/author/author.admin.service';
import { DifficultyAdminService } from '@/features/common/services/difficulty/difficulty.admin.service';
import { DifficultyAdminController } from '@/features/common/controllers/difficulty/difficulty.admin.controller';
import { LanguageAdminService } from '@/features/common/services/language/language.admin.service';
import { LanguagePublicService } from '@/features/common/services/language/language.public.service';
import { LanguageAdminController } from '@/features/common/controllers/language/language.admin.controller';
import { LanguagePublicController } from '@/features/common/controllers/language/language.public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Difficulty } from './entities/difficulty.entity';
import { Language } from './entities/language.entity';
import { Author } from './entities/author.entity';
import { AuthorAdminRepository } from './repository/author/author.admin.repository';
import { DifficultyAdminRepository } from './repository/difficulty/difficulty.admin.repository';
import { LanguageAdminRepository } from './repository/language/language.admin.repository';
import { LanguagePublicRepository } from './repository/language/language.public.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Difficulty,Language,Author])],
  providers: [
    AuthorAdminService,
    DifficultyAdminService,
    LanguageAdminService,
    LanguagePublicService,

    // Repository
    AuthorAdminRepository,
    DifficultyAdminRepository,
    LanguageAdminRepository,
    LanguagePublicRepository
  ],
  controllers: [
    AuthorAdminController,
    DifficultyAdminController,
    LanguageAdminController,
    LanguagePublicController,
  ],
})
export class CommonModule {
}