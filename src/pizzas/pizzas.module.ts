import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PizzasController } from './pizzas.controller';
import { PizzasService } from './pizzas.service';
import {Pizza, PizzaSchema} from './schemas/pizza.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Pizza.name, schema: PizzaSchema }])],
  controllers: [PizzasController],
  providers: [PizzasService],
  exports: [PizzasService]
})
export class PizzasModule {}
