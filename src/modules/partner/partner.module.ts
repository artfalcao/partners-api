import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { PartnerEntity } from './partner.entity';
import { UniqueGitRepoValidator } from './validators/uniqueGitRepo.validator';
import { AuthGuard } from '../auth/auth.guard';


@Module({
  imports: [TypeOrmModule.forFeature([PartnerEntity])],
  controllers: [PartnerController],
  providers: [PartnerService, UniqueGitRepoValidator, AuthGuard],
  exports: [PartnerService]
})
export class PartnerModule {}