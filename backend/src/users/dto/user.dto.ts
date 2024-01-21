import { User } from '@prisma/client';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto implements Partial<User> {
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  name: string;

  @IsString()
  @IsEmail()
  @MaxLength(64)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  name?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(64)
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password?: string;
}
