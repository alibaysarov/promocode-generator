import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PromocodeCreateDto } from './dto/promocode/create';
import { PromocodeService } from './promocode.service';
import { ActivateDto } from './dto/promocode/activate';

@Controller('promocodes')
export class PromocodeController {
  constructor(private readonly promocodeService: PromocodeService) {}

  @Get()
  getAll() {
    return this.promocodeService.getAll();
  }

  @Post()
  create(@Body() dto: PromocodeCreateDto) {
    return this.promocodeService.create(dto);
  }

  @Post(':id/activations')
  activate(@Param('id') id: string, @Body() dto: ActivateDto) {
    return this.promocodeService.activate(id, dto);
  }
}
