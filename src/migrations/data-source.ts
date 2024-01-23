import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();
const configService = new ConfigService();
// import { Migrations1705755098825 } from './1705755098825-migrations';
// import { Migrations1705755513138 } from './1705755513138-migrations';

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  synchronize: false,
  logging: true,
  // entities: [],
  entities: ['src/**/*.entity{.ts,.ts}'],
  migrations: ['src/migrations/*-migrations.ts'],
  // migrations: [],
  // migrations: [Migrations1705755098825, Migrations1705755513138],
});
