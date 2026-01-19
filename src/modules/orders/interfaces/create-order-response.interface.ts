import { Order } from "../entities/order.entity";

export interface CreateOrderResponse {
    message: string;
    data?: Order;
}