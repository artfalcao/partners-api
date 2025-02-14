import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PartnerModule } from './modules/partner/partner.module';
import { PostgresConfigService } from './config/postgres.config.services';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    PartnerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    }
  ]
})
export class AppModule {}
