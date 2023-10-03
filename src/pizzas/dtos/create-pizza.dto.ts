import {IsString, IsNumber, IsEnum} from 'class-validator';

enum pizzaSize {
    small,
    medium,
    large
}

export class CreatePizzaDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsEnum(pizzaSize)
    size: string;

    @IsNumber()
    price: number;
}