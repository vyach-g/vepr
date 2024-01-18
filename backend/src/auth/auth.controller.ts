import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: Response) {
    const userData = await this.authService.signIn(signInDto.email, signInDto.password);
    console.log(123, userData);
    // const userData = await
    response.cookie('sessionToken', 'userData.token', { httpOnly: true, secure: true, sameSite: 'none' });
    // response.cookie('exampleCook2ie', 'Hello, NestJS!', { maxAge: 900000, httpOnly: true });
    console.log(123, userData);
    return userData;
  }
}
