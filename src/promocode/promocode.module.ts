import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ActivationModule } from 'src/activation/activation.module';
import { PromocodeController } from './promocode.controller';
import { PromocodeService } from './promocode.service';

@Module({
    controllers: [PromocodeController],
    providers: [PromocodeService],
    imports: [PrismaModule, ActivationModule],
})
export class PromocodeModule {}
