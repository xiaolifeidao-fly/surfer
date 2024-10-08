// app.module.ts

import { Module } from '@nestjs/common';
import {ConfigService,ConfigModule} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config'; // 导入数据库配置
import { CustomNamingStrategy } from './orm/orm.config';
import { ClipModule } from './clip/clip.module';
// import { PaginatedRepositoryModule } from './orm/repository.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig], // 加载数据库配置文件
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 导入包含 ConfigService 的模块
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', // 或者其他数据库类型
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        autoLoadEntities: true,
        synchronize: false,
        namingStrategy: new CustomNamingStrategy(), // Use custom naming strategy
      }),
      inject: [ConfigService], // 注入 ConfigService 以获取配置信息
    }),
    ClipModule
  ],
})
export class AppModule {}