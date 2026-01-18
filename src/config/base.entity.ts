import { CreateDateColumn, PrimaryGeneratedColumn, BaseEntity as TypeORMBaseEntity, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity extends TypeORMBaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

}