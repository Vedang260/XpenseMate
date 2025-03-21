import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST ,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME ,
  password: process.env.DATABASE_PASSWORD ,
  database: process.env.DATABASE_NAME ,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
})); 