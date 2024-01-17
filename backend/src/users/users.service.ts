import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserEnitity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);

    try {
      const tempUser = await this.prisma.user.create({ data: createUserDto });
      console.log(tempUser);
      return tempUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException(['email already exists']);
      }
      throw error;
    }
  }

  async findAll() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to find user');
    }
  }

  async findOne(id: UserEnitity['id']) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to find users');
    }
  }

  async update(id: UserEnitity['id'], updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to update user');
    }
  }

  async remove(id: UserEnitity['id']) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      console.log(error);
      throw new BadRequestException('Failed to delete user');
    }
  }
}
