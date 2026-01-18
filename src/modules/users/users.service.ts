import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseService } from 'src/config/base.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
    dataSource: DataSource,
  ) {
    super(dataSource, userRepository);
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }

  // Todos los métodos CRUD (create, findAll, findOne, update, remove) 
  // ya están disponibles desde BaseService
}
