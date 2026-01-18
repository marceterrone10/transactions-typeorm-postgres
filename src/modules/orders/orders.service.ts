import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private dataSource: DataSource
  ) { }

  async createOrderWithQueryRunner(createOrderDto: CreateOrderDto): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();

    // Conectar y comenzar la transacción
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, { where: { id: createOrderDto.userId } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (Number(user.balance) < Number(createOrderDto.amount)) {
        throw new BadRequestException('Insufficient balance');
      }

      // Crear orden
      const order = queryRunner.manager.create(Order, {
        userId: user.id,
        amount: createOrderDto.amount,
        description: createOrderDto.description,
      });
      await queryRunner.manager.save(order);

      // Actualizar balance del usuario
      user.balance = Number(user.balance) - createOrderDto.amount;
      await queryRunner.manager.save(user);

      // Confirmar transacción
      await queryRunner.commitTransaction();

      return order;

    } catch (err) {
      // Si hay error, revertir transacción
      await queryRunner.rollbackTransaction();
      if (err instanceof BadRequestException) {
        throw err;
      }
      throw new InternalServerErrorException('Error creating order');
    } finally {
      // Liberar recursos
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
