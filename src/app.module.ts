import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { User } from './users/user.entity';
import { Order } from './orders/order.entity';
import { Pizza } from './pizzas/pizza.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'pizza.sqlite',
      entities: [User, Order, Pizza],
      synchronize: true, // TODO remove it
    }),
    UsersModule,
    OrdersModule,
    PizzasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
