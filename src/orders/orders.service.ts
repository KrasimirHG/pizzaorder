import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { PizzasService } from '../pizzas/pizzas.service';
import {IPizza} from '../interfaces';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private pizzasService: PizzasService,
  ) {}

  async makeOrder(params: any) {
    const { orders, user } = params;
    const createdOn = new Date().toISOString();
    const pizzas = [];
    let orderPrice = 0;

    for (const order of orders) {
      const { pizzaId, quantity } = order;

      const {_doc}: IPizza = await this.pizzasService.findById(pizzaId);

      if (!_doc) {
        throw new BadRequestException("Sorry we don't have such a pizza");
      }

      pizzas.push({ ..._doc, quantity });

      const price = _doc.price;
      orderPrice += price * (quantity || 1);
    }
    const orderObj = {
      createdOn,
      orderPrice,
      user,
      pizzas,
    };

    const newOrder = new this.orderModel(orderObj);

    newOrder.save();

    const message = pizzas
      .map((pizza) => `${pizza.name} x ${pizza.quantity}`)
      .join(', ');

    return `Hello ${user.firstName}, your order is ${message}. It will cost you only ${orderPrice}EUR. Enjoy :)`;
  }

  findById(id: number) {
    if (!id) {
      return null;
    }
    return this.orderModel.findById(id);
  }

  async changeOrderStatus(id: number, status: string) {
    let order = await this.findById(id);

    if (!order) {
      throw new BadRequestException("Sorry, can't find such an order");
    }
    //@ts-ignore
    order = { ...order, status };
    return order.save();
  }
}
