import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma.service';
import { UserId } from 'src/users/entities/user.entity';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(id: UserId) {
    const token = uuidv4();
    const session = await this.prisma.session.create({ data: { userId: id, token: token } });
    return session;
  }

  async removeById(id: UserId) {
    const session = await this.prisma.session.deleteMany({ where: { userId: id } });
    return session;
  }

  async removeByToken(token: string) {
    const session = await this.prisma.session.deleteMany({ where: { token: token } });
    return session;
  }

  async findOneByToken(token: string) {
    const session = await this.prisma.session.findFirst({ where: { token } });
    return session;
  }
}
