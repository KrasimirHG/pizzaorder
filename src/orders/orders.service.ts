import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { PizzasService } from '../pizzas/pizzas.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private repoOrder: Repository<Order>,
    private pizzasService: PizzasService
  ) {}

  async makeOrder(params: any) {
    const { orders, user } = params;
    const createdOn = new Date().toISOString();
    const pizzas = [];
    let orderPrice = 0;

    for (const order of orders) {
      const { pizzaId, quantity } = order;

      const pizza = await this.pizzasService.findById(pizzaId);

      if (!pizza) {
        throw new BadRequestException('Sorry we don\'t have such a pizza')
      }

      pizzas.push({...pizza, quantity});

      const price = pizza.price;
      orderPrice += price * (quantity || 1);
    }
    const orderObj = {
      createdOn,
      orderPrice,
      user,
      pizzas
    }
    const orderEntity = await this.repoOrder.create(orderObj);
    await this.repoOrder.save(orderEntity);

    const message = pizzas.map(pizza => `${pizza.name} x ${pizza.quantity}`).join(', ');
    console.log(message)

    return `Hello ${user.firstName}, your order is ${message}. It will cost you only ${orderPrice}EUR. Enjoy :)`;
  }
}
