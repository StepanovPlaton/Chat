import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import config from '@/configuration/configuration';
import databaseConfig from '@/configuration/database';

import MessageModule from '@/modules/message';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, databaseConfig],
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    MessageModule,
  ],
})
export class AppModule {}
