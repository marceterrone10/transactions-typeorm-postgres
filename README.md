# NestJS - Transacciones con TypeORM

Ejemplo de cómo implementar transacciones de base de datos usando **NestJS** y **TypeORM** con PostgreSQL.

## Descripción

Este proyecto demuestra cómo usar `QueryRunner` de TypeORM para manejar transacciones que garantizan la integridad de los datos. El caso de uso es un sistema de órdenes donde:

1. Un usuario tiene un **balance** (saldo)
2. Al crear una orden, se **descuenta** el monto del balance del usuario
3. Ambas operaciones se ejecutan en una **transacción** (todo o nada)

## Instalación

```bash
# Instalar dependencias
npm install

# Levantar PostgreSQL con Docker
docker-compose up -d
```

## Ejecutar

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run start:prod
```

##  Base de datos

El proyecto usa PostgreSQL. Configuración en `docker-compose.yml`:

| Variable | Valor |
|----------|-------|
| Usuario | user |
| Password | password |
| Database | transaction |
| Puerto | 5432 |

##  Endpoints

### Users

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/users` | Crear usuario |
| GET | `/users` | Listar usuarios |
| GET | `/users/:id` | Obtener usuario |
| PATCH | `/users/:id` | Actualizar usuario |
| DELETE | `/users/:id` | Eliminar usuario |

### Orders

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/orders` | Crear orden (con transacción) |
| GET | `/orders` | Listar órdenes |
| GET | `/orders/:id` | Obtener orden |

##  Ejemplo de uso

### 1. Crear un usuario con balance

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan", "balance": 1000}'
```

### 2. Crear una orden

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "amount": 150, "description": "Compra de producto"}'
```

Si el usuario no tiene saldo suficiente, la transacción se revierte automáticamente.

##  Cómo funciona la transacción

```typescript
const queryRunner = this.dataSource.createQueryRunner();

await queryRunner.connect();
await queryRunner.startTransaction();

try {
  // 1. Buscar usuario
  // 2. Validar balance
  // 3. Crear orden
  // 4. Descontar balance
  
  await queryRunner.commitTransaction();  // Confirmar
} catch (err) {
  await queryRunner.rollbackTransaction(); // Revertir
} finally {
  await queryRunner.release(); // Liberar conexión
}
```
