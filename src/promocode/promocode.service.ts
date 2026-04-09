import { NotFoundException } from './../exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Promocode } from '@prisma/client';
import { PromocodeCreateDto } from './dto/promocode/create';
import { ActivationService } from 'src/activation/activation.service';
import { ActivationExistsException } from 'src/exceptions/activation-exists.exception';
import { ActivateDto } from './dto/promocode/activate';
import { PromocodeExpiredException } from 'src/exceptions/promocode-expired.exception';

@Injectable()
export class PromocodeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activationService: ActivationService,
  ) {}
  getAll(): Promise<Promocode[]> {
    return this.prisma.promocode.findMany();
  }

  async getById(id: string) {
    return await this.prisma.promocode.findFirst({
      where: {
        id,
      },
    });
  }

  create(dto: PromocodeCreateDto): Promise<Promocode> {
    try {
      const { code, discount, expiredAt } = dto;
      const createdAtString = new Date(expiredAt).toISOString();
      return this.prisma.promocode.create({
        data: {
          code: code,
          discount: discount,
          expiresAt: createdAtString,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async activate(promocodeId: string, activateDto: ActivateDto) {
    try {
      const { userId } = activateDto;
      const activation = await this.getActivation(promocodeId);
      if (activation !== null) {
        throw new ActivationExistsException(promocodeId);
      }

      const promocode = await this.getById(promocodeId);

      if (promocode === null) {
        throw new NotFoundException();
      }

      if (promocode.expiresAt.valueOf() < Date.now().valueOf()) {
        throw new PromocodeExpiredException();
      }

      const createdActivation = await this.prisma.activation.create({
        data: {
          promocodeId,

          userId,
        },
      });
      return createdActivation;
    } catch (err) {
      throw err;
    }
  }

  update(body) {}

  delete(id: string) {
    this.prisma.promocode.delete({
      where: {
        id,
      },
    });
  }

  private getActivation(promocodeId: string) {
    try {
      return this.activationService.getByPromocodeId(promocodeId);
    } catch (err) {
      throw err;
    }
  }
}
