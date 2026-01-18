import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
