import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'postgres',
      entities: [User],
      synchronize: true,
    }),
    UsersModule
  ],
})
export class AppModule {}