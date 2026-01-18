import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appDataSource from './config/data.source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './modules/orders/orders.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDataSource.options),

    OrdersModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
