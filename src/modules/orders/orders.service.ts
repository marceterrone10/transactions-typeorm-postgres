import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { BaseService } from 'src/config/base.service';
import { getTransactionalRepo, runInTransaction } from 'src/common/utils/transaction.util';

@Injectable()
export class OrdersService extends BaseService<Order> {

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    dataSource: DataSource,
  ) {
    super(dataSource, orderRepository);
  }

  async createOrderWithTransaction(createOrderDto: CreateOrderDto): Promise<Order> {
    return runInTransaction(this.dataSource, async (queryRunner) => {
      // Obtener repositorios transaccionales
      const userRepo = getTransactionalRepo(queryRunner, User);
      const orderRepo = getTransactionalRepo(queryRunner, Order);

      // Buscar usuario
      const user = await userRepo.findOne({ where: { id: createOrderDto.userId } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (Number(user.balance) < Number(createOrderDto.amount)) {
        throw new BadRequestException('Insufficient balance');
      }

      // Crear orden
      const order = orderRepo.create({
        userId: user.id,
        amount: createOrderDto.amount,
        description: createOrderDto.description,
      });
      await orderRepo.save(order);

      // Actualizar balance del usuario
      user.balance = Number(user.balance) - createOrderDto.amount;
      await userRepo.save(user);

      return order;
    });
  }

  // findAll, findOne, update, remove ya están en BaseService
  // Sobreescribir los métodos si es necesario
}
