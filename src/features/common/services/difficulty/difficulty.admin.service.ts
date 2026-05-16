import { DifficultyCreateAdminDto } from '@/features/common/dtos/difficulty/admin/difficulty.create.admin.dto';
import { Difficulty } from '@/features/common/entities/difficulty.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DifficultyListAdminDto } from '@/features/common/dtos/difficulty/admin/difficulty.list.admin.dto';
import { DifficultyUpdateAdminDto } from '@/features/common/dtos/difficulty/admin/difficulty.update.admin.dto';
import { ConfigService } from '@nestjs/config';
import { DifficultyAdminRepository } from '../../repository/difficulty/difficulty.admin.repository';


@Injectable()
export class DifficultyAdminService {
  // Dependency Injection
  constructor(private readonly config: ConfigService,
    private readonly repo:DifficultyAdminRepository
  ) {
  }


  async create(payload: DifficultyCreateAdminDto, icon: Express.Multer.File) {
    const alreadyExists = await this.repo.countBy({ title: payload.title });
    if (alreadyExists) {
      throw new BadRequestException('Difficulty with given title already exists');
    }

    const newDifficulty = { ...payload, icon: icon.path } as Difficulty;
    await this.repo.save(newDifficulty);
    return newDifficulty;
  }

  async getAll() {
    const rawDifficulties = await this.repo.find();
    for (let difficulty of rawDifficulties) {
      difficulty.icon = this.config.getOrThrow<string>('BASE_URL') + '/' + difficulty.icon;
    }
    return plainToInstance(DifficultyListAdminDto, rawDifficulties);
  }

  async getOne(id: number) {
    const rawDifficulty = await this.repo.findOneBy({ id });
    if (!rawDifficulty) {
      throw new NotFoundException('Difficulty with given id not found');
    }

    return plainToInstance(DifficultyListAdminDto, rawDifficulty);
  }

  async updateOne(id: number, payload: DifficultyUpdateAdminDto, icon?: Express.Multer.File) {
    const difficulty = await this.repo.findOneBy({ id });
    if (!difficulty) {
      throw new NotFoundException('Difficulty with given id not found');
    }
    if (payload.title) {
      const alreadyExists = await this.repo.countBy({ id: id, title: payload.title },{ILike:["title"],not:["id"]});
      if (alreadyExists) {
        throw new BadRequestException('Difficulty with given title already exists');
      }

      difficulty.title = payload.title;
    }

    if (icon) {
      // TODO: previous icon must be deleted before new one is saved
      difficulty.icon = icon.path;
    }

    await this.repo.save(difficulty);
    return difficulty;
  }

  async deleteOne(id: number) {
    const difficulty = await this.repo.findOneBy({ id });
    if (!difficulty) {
      throw new NotFoundException('Difficulty with given id not found');
    }

    // TODO: icon must also be removed

    await this.repo.remove(difficulty);
  }
}