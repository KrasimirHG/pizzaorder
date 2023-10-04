import { IsNumber, IsEnum, IsString} from 'class-validator';

enum statuses {
    initiated = 'initiated',
    processing = 'processing',
    compleated = 'compleated'
}

export class ChangeOrderStatusDto {
    @IsNumber()
    id: number

    @IsEnum(statuses)
    @IsString()
    status: string
}