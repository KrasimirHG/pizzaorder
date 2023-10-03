import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from './pizza.entity';

@Injectable()
export class PizzasService {
  constructor(@InjectRepository(Pizza) private repo: Repository<Pizza>) {}

  create(pizza: Partial<Pizza>) {
    const newPizza = this.repo.create(pizza);

    return this.repo.save(newPizza);
  }

  find() {
    return this.repo.find();
  }

  findById(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }
}
