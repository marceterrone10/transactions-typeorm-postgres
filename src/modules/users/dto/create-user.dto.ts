import { BaseDto } from "src/config/base.dto";

export class CreateUserDto extends BaseDto {

    name: string;

    balance: number;
}
