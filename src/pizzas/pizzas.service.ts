import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pizza } from './schemas/pizza.schema';
@Injectable()
export class PizzasService {
  constructor(@InjectModel(Pizza.name) private pizzaModel: Model<Pizza>) {}

  create(pizza: Partial<Pizza>) {
    const newPizza = new this.pizzaModel(pizza);

    return newPizza.save();
  }

  find() {
    return this.pizzaModel.find().exec();
  }

  findById(id: string) {
    if (!id) {
      return null;
    }
    return this.pizzaModel.findById( id );
  }
}
