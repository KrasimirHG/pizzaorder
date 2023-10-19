import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop()
  city: string;

  @Prop()
  address: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({ default: 'customer' })
  role: string;

  @Prop()
  createdOn: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
