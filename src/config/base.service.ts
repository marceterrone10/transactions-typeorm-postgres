import { DataSource, EntityTarget, QueryRunner, Repository, ObjectLiteral, DeepPartial, FindOptionsWhere } from 'typeorm';

export abstract class BaseService<T extends ObjectLiteral> {

    constructor(
        protected readonly dataSource: DataSource,
        protected readonly repository: Repository<T>,
    ) { }
}

