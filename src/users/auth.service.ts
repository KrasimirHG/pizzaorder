import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from '../interfaces';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const promisifiedScript = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async signup(user: IUser) {

    const users = await this.usersService.find(user.email);
    //@ts-ignore
    if (users.length) {
      throw new BadRequestException('The email is already in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await promisifiedScript(user.password, salt, 32)) as Buffer;

    const hashedSaltedPass = salt + '.' + hash.toString('hex');

    user.password = hashedSaltedPass;

    const {_doc}: IUser = await this.usersService.create(user);
    const {_id, firstName, lastName, role} = _doc;
    
    const payload = { sub: _id.toString(), fullName: `${firstName} ${lastName}`, role};

    return {
      access_token: await this.jwtService.signAsync(payload),
      newUser: {id: _id.toString(), firstName, lastName, role}
    };
  }

  async signin(email: string, password: string) {

    const user = await this.usersService.find(email);
    
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const {_id, firstName, lastName, role, password: hsPassword} = user;

    const [salt, storedHash] = hsPassword.split('.');

    const hash = (await promisifiedScript(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    const payload = { sub: _id.toString(), fullName: `${firstName} ${lastName}`, role};

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {id: _id.toString(), firstName, lastName, role}
    };
  }
}
