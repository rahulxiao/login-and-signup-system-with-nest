import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CustomMailerModule } from './mailer/mailer.module';

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
    AuthModule,
    CustomMailerModule,
  ],
})
export class AppModule {}