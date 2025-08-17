import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'rahulxiao',
      database: 'login-signup',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AdminModule,
  ],
})
export class AppModule {}