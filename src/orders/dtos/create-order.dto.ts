import {IsArray, IsNumber, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderDto {
    @IsNumber()
    pizzaId: number;

    @IsNumber()
    quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => OrderDto)
  orders: OrderDto[]
}