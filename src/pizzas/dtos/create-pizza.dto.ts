import {IsString, IsNumber, IsEnum} from 'class-validator';

enum pizzaSize {
    small = 'small',
    medium = 'medium',
    large = 'large'
}

export class CreatePizzaDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    @IsEnum(pizzaSize)
    size: string;

    @IsNumber()
    price: number;
}