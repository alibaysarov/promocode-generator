import { Module } from '@nestjs/common';
import { ActivationService } from './activation.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ActivationService],
  exports: [ActivationService],
})
export class ActivationModule {}
