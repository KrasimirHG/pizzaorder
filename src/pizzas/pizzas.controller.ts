import { Controller, Body, Get, Post, UseGuards } from '@nestjs/common';
import { CreatePizzaDto } from './dtos/create-pizza.dto';
import { AdminGuard } from '../guards/admin.guard';
import { PizzasService } from './pizzas.service';

@Controller('pizzas')
export class PizzasController {
  constructor(private pizzaService: PizzasService) {}
  @Get()
  fetchPizzas() {
    return this.pizzaService.find()
  }

  @UseGuards(AdminGuard)
  @Post('/add')
  addPizza(@Body() body: CreatePizzaDto) {
    return this.pizzaService.create(body);
  }
}
