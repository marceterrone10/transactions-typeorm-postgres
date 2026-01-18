import { BaseEntity } from "src/config/base.entity";
import { Order } from "src/modules/orders/entities/order.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @Column()
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    balance: number;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];

}
