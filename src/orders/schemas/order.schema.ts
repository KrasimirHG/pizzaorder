import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Pizza } from 'src/pizzas/schemas/pizza.schema';
import { User } from 'src/users/schemas/user.schema';

export type OrderDocument = mongoose.HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  createdOn: string;

  @Prop({ default: 'initiated' })
  status: string;

  @Prop()
  orderPrice: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    type: [
      { quantity: { type: Number }, pizza: { type: mongoose.Schema.Types.ObjectId } },
    ],
  })
  pizzas: { quantity: number; pizza: Pizza }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
