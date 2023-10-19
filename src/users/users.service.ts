import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { IUser } from '../interfaces';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: Partial<User>) {
    const createdOn = new Date().toISOString();

    const newUser = new this.userModel({ ...user, createdOn });

    newUser.save();

    return newUser;
  }

  findById(id: Types.ObjectId) {
    if (!id) {
      return null;
    }
    return this.userModel.findById(id).lean().exec();
  }

  async find(email: string): Promise<IUser> {
    const [user] =  await this.userModel.find({ email });
    // @ts-ignore
    return user?._doc;
  }

  async update(id: Types.ObjectId, attrs: Partial<User>) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    // @ts-ignore
    return user.save();
  }
}
