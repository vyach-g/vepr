import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { SessionsService } from 'src/sessions/sessions.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, SessionsService],
  exports: [UsersService],
})
export class UsersModule {}
