import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UssesService } from './usses.service';
import { CreateUssDto } from './dto/create-uss.dto';
import { UpdateUssDto } from './dto/update-uss.dto';

@Controller('usses')
export class UssesController {
  constructor(private readonly ussesService: UssesService) {}

  @Post()
  create(@Body() createUssDto: CreateUssDto) {
    return this.ussesService.create(createUssDto);
  }

  @Get()
  findAll() {
    return this.ussesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ussesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUssDto: UpdateUssDto) {
    return this.ussesService.update(+id, updateUssDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ussesService.remove(+id);
  }
}
