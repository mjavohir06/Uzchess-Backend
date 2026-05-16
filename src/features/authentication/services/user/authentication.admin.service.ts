import { UserCreateAdminDto } from '@/features/authentication/dtos/user/admin/user.create.admin.dto';
import { User } from '@/features/authentication/entities/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import argon2 from 'argon2';
import { UserUpdateAdminDto } from '@/features/authentication/dtos/user/admin/user.update.admin.dto';
import { plainToInstance } from 'class-transformer';
import { UserListAdminDto } from '@/features/authentication/dtos/user/admin/user.list.admin.dto';
import { UserAdminRepository } from '../../repository/user/authentication.admin.repository';

export class AuthenticationAdminService {

  constructor(
    private readonly repo:UserAdminRepository
  ){}

  async create(payload: UserCreateAdminDto, profileImage?: Express.Multer.File) {
    const alreadyExists = await this.repo.countBy({ login: payload.login },{ILike:["login"]});
    if (alreadyExists) {
      throw new BadRequestException('User with given login already exists');
    }

    const newUser = payload as User;

    if (profileImage) {
      newUser.profileImage = profileImage.path;
    }

    if (payload.password) {
      newUser.password = await argon2.hash(payload.password);
    }
    await this.repo.save(newUser);
    return newUser;
  }

  async updateOne(id: number, payload: UserUpdateAdminDto, profileImage?: Express.Multer.File) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User with given id not found');
    }

    if (payload.login) {
      const alreadyExists = await this.repo.countBy({ id: user.id, login: payload.login },{not:["id"],ILike:["login"]});
      if (alreadyExists) {
        throw new BadRequestException('Login already exists');
      }
    }

    Object.assign(
      user, Object.fromEntries(Object.entries(payload).filter(([key, value]) => value !== undefined)),
    );

    if (payload.password) {
      user.password = await argon2.hash(payload.password);
    }

    if (profileImage) {
      // TODO: eski rasm mavjud bo'lsa, o'chirib tashlaydigan qilish kerak
      user.profileImage = profileImage.path;
    }

    await this.repo.save(user);
    return user;
  }

  async getAll() {
    const users = await this.repo.find();
    return plainToInstance(UserListAdminDto, users);
  }

  async deleteOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User with given id not found');
    }

    await this.repo.remove(user);
  }
}