import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column()
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'userId' })
    user: User;
}
