import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const promisifiedScript = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(user: Partial<User>) {

    const users = await this.usersService.find(user.email);

    if (users.length) {
      throw new BadRequestException('The email is already in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await promisifiedScript(user.password, salt, 32)) as Buffer;

    const hashedSaltedPass = salt + '.' + hash.toString('hex');

    user.password = hashedSaltedPass;

    const newUser = await this.usersService.create(user);

    return newUser;
  }

  async signin(email: string, password: string) {

    const [user] = await this.usersService.find(email);
    
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await promisifiedScript(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    return user;
  }
}
