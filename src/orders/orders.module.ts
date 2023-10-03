import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { PizzasModule } from '../pizzas/pizzas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), PizzasModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
