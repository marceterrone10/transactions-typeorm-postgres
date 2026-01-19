import { DataSource, EntityTarget, ObjectLiteral, QueryRunner, Repository } from "typeorm";

/**
 * Ejecuta una operación dentro de una transacción.
 * Maneja automáticamente connect, commit, rollback y release.
 */
export async function runInTransaction<R>(
    dataSource: DataSource,
    operation: (queryRunner: QueryRunner) => Promise<R>,
): Promise<R> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const result = await operation(queryRunner);
        await queryRunner.commitTransaction();
        return result;
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
}

/**
 * Helper para obtener el repositorio de una entidad dentro de una transacción
 */
export function getTransactionalRepo<E extends ObjectLiteral>(
    queryRunner: QueryRunner,
    entity: EntityTarget<E>,
): Repository<E> {
    return queryRunner.manager.getRepository(entity);
}


