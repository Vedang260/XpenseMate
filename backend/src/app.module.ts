import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/modules/users.module';
import { AuthModule } from './auth/modules/auth.module';
import { typeOrmConfig } from './config/database.config';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes({ path: '/users', method: RequestMethod.ALL });
  }
}
