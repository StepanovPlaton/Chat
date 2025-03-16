import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DatabaseConfigKey = 'database';
export type IDatabaseConfigKey = typeof DatabaseConfigKey;

export default registerAs(
  DatabaseConfigKey,
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +(process.env.DATABASE_PORT ?? 5432),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    synchronize: process.env.NODE_ENV !== 'production',
    autoLoadEntities: true,
  }),
);
