import { Injectable } from '@nestjs/common';
import { CreateUssDto } from './dto/create-uss.dto';
import { UpdateUssDto } from './dto/update-uss.dto';

@Injectable()
export class UssesService {
  create(createUssDto: CreateUssDto) {
    return 'This action adds a new uss';
  }

  findAll() {
    return `This action returns all usses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uss`;
  }

  update(id: number, updateUssDto: UpdateUssDto) {
    return `This action updates a #${id} uss`;
  }

  remove(id: number) {
    return `This action removes a #${id} uss`;
  }
}
