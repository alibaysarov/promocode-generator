import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create';
import { UpdateUserDto } from './dto/update';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { UserAlreadyExistsException } from 'src/exceptions/user-already-exists.exception';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new UserAlreadyExistsException(dto.email);
    }
    return this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
      },
    });
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.getById(id);

    if (dto.email) {
      const existing = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (existing && existing.id !== id) {
        throw new UserAlreadyExistsException(dto.email);
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        email: dto.email,
        name: dto.name,
      },
    });
  }

  async delete(id: string): Promise<User> {
    await this.getById(id);
    return this.prisma.user.delete({ where: { id } });
  }
}
