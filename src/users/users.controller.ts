import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Session,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { SigninUserDto } from './dtos/signin-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { IUser } from '../interfaces';

@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  async createUser(@Body() body: IUser, @Session() session: any) {
    const {access_token, newUser} = await this.authService.signup(body);
    session.access_token = access_token;
    return newUser;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signin')
  async signin(@Body() body: SigninUserDto, @Session() session: any) {
    const {access_token, user} = await this.authService.signin(body.email, body.password);
    session.access_token = access_token;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.access_token = null;
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/profile/update')
  updateUser(@CurrentUser() user: IUser, @Body() body: UpdateUserDto) {
    return this.userService.update(user._id, body);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/profile/get')
  async getUser(@CurrentUser() user: IUser) {
    return this.userService.findById(user._id);
  }
}
