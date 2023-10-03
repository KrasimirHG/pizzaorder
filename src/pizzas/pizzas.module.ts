import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzasController } from './pizzas.controller';
import { PizzasService } from './pizzas.service';
import { Pizza } from './pizza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pizza])],
  controllers: [PizzasController],
  providers: [PizzasService],
  exports: [PizzasService]
})
export class PizzasModule {}
