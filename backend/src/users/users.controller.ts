import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
// import { UserEnitity } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from './entities/user.entity';
import { Roles } from 'src/roles/roles.decorator';
import { UserRole } from 'src/roles/roles.types';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles([UserRole.Admin])
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @Roles([UserRole.Admin])
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles([UserRole.Admin])
  findOne(@Param('id', ParseIntPipe) id: UserId) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles([UserRole.Admin])
  update(@Param('id', ParseIntPipe) id: UserId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles([UserRole.Admin])
  remove(@Param('id', ParseIntPipe) id: UserId) {
    return this.usersService.remove(id);
  }
}
