import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import {User} from '../user.entity';
import { JwtService } from '@nestjs/jwt';

declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService
    ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }  

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);
    if (token) {
      let payload;
      try {
        payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.config.get<string>('JWT_SECRET')
          }
        );
        const userId = payload?.sub;
        const user = await this.usersService.findById(userId);

        req.currentUser = user;
      } catch {}
    }
    next();
  }
}
