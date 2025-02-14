import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PartnerModule } from '../partner/partner.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PartnerModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '48h' },
        }
      },
      inject: [ConfigService],
      global: true,
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}