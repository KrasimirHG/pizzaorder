import { Controller, Body, Post, Patch, UseGuards } from '@nestjs/common';
import {CreateOrderDto} from './dtos/create-order.dto';
import { ChangeOrderStatusDto } from './dtos/change-order-status.dto';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { OrdersService } from './orders.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { IUser } from '../interfaces';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @UseGuards(AuthGuard)
    @Post('/create')
    makeOrder(@CurrentUser() user: IUser, @Body() body: CreateOrderDto) {
        return this.ordersService.makeOrder({...body, user})
    }

    @UseGuards(AdminGuard)
    @Patch('/edit')
    changeOrderStatus(@Body() body: ChangeOrderStatusDto) {
        return this.ordersService.changeOrderStatus(body.id, body.status)
    }

}
