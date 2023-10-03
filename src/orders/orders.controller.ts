import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import {CreateOrderDto} from './dtos/create-order.dto'
import { AuthGuard } from '../guards/auth.guard';
import { OrdersService } from './orders.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @UseGuards(AuthGuard)
    @Post()
    makeOrder(@CurrentUser() user: User, @Body() body: CreateOrderDto) {
        return this.ordersService.makeOrder({...body, user})
    }
}
