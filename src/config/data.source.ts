import { DataSource, DataSourceOptions } from "typeorm";

const Config: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'marcelo',
    password: '123456',
    database: 'transaction',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*.ts'],
    synchronize: true,
};

const appDataSource = new DataSource(Config);

export default appDataSource;