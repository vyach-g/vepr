import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
// import { CreateNodeDto } from './dto/create-node.dto';
// import { UpdateNodeDto } from './dto/update-node.dto';

@Injectable()
export class NodesService {
  create(createNodeDto: Prisma.NodeCreateInput) {
    console.log(createNodeDto);
    return 'This action adds a new node';
  }

  findAll() {
    return `This action returns all nodes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} node`;
  }

  update(id: number, updateNodeDto: Prisma.NodeUpdateInput) {
    console.log(updateNodeDto);
    return `This action updates a #${id} node`;
  }

  remove(id: number) {
    return `This action removes a #${id} node`;
  }
}
