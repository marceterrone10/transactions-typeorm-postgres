import { BaseDto } from "src/config/base.dto";

export class CreateOrderDto extends BaseDto {

    userId: number;

    amount: number;

    description: string;
}
