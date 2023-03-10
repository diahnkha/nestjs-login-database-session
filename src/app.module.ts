import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import entities from 'src';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: '1234',
        database: 'nest_db_tugas',
        entities: entities,
        synchronize: true
      }),
    }),
    AuthModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
