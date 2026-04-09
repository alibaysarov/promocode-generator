import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivationService {
  constructor(private readonly prisma: PrismaService) {}

  getByPromocodeId(promocodeId: string) {
    const activation = this.prisma.activation.findFirst({
      where: {
        promocodeId,
      },
    });
    return activation;
  }
}
