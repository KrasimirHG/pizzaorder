import {IsArray, IsNumber, IsString, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderDto {
    @IsString()
    pizzaId: string;

    @IsNumber()
    quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => OrderDto)
  orders: OrderDto[]
}