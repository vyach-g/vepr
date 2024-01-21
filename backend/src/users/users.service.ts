import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserId } from './entities/user.entity';

export const HASH_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);

    const hashedPassword = await bcrypt.hash(createUserDto.password, HASH_ROUNDS);

    try {
      const tempUser = await this.prisma.user.create({ data: { ...createUserDto, password: hashedPassword } });
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

  async findOne(id: UserId) {
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

  async findOneByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to find users');
    }
  }

  async update(id: UserId, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          name: updateUserDto.name,
          email: updateUserDto.email,
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to update user');
    }
  }

  async updatePassword(id: UserId, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);
      return await this.prisma.user.update({ where: { id }, data: { password: hashedPassword } });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to update user password');
    }
  }

  async remove(id: UserId) {
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
