import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SessionsService } from '../sessions/sessions.service';
import { UsersService } from 'src/users/users.service';

export const SESSION_COOKIE_NAME = 'Session';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const sessionToken = req.cookies[SESSION_COOKIE_NAME]; // Replace with your actual session cookie name
    if (!sessionToken) {
      req.user = null;
      return next();
    }

    const session = await this.sessionsService.findOneByToken(sessionToken);
    if (!session) {
      req.user = null;
      return next();
    }

    const user = await this.usersService.findOne(session.userId);
    if (!user) {
      req.user = null;
      return next();
    }

    req.user = user;

    next();
  }
}
