import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UpdatePartnerDTO } from './dto/UpdatePartner.dto';
import { CreatePartnerDTO } from './dto/CreatePartner.dto';
import { PartnerEntity } from './partner.entity';
import { PartnerService } from './partner.service';
import { HashPasswordPipe } from 'src/pipes/hashPassword.pipe';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('/partners')
export class PartnerController {
  constructor(private partnerService: PartnerService) {}

  @Get()
  async listPartners() {
    const savedPartners = await this.partnerService.getPartners();

    return savedPartners;
  }

  @Get('/:id')
  async listPartner(@Param('id') id : string ) {
    const partner = await this.partnerService.getPartnerById(id);

    return partner;
  }

  @Post()
  async createPartner(
    @Body() { password, ...partnerData }: CreatePartnerDTO,
    @Body('password', HashPasswordPipe) hashedPassword: string,
  ) {
    const partnerEntity = new PartnerEntity();
    partnerEntity.name = partnerData.name;
    partnerEntity.email = partnerData.email;
    partnerEntity.password = hashedPassword;
    partnerEntity.description = partnerData.description;
    partnerEntity.repositoryGit = partnerData.repositoryGit;
    partnerEntity.urlDoc= partnerData.urlDoc;
    partnerEntity.id = uuid();

    const partnerCreated = await this.partnerService.createPartner(partnerEntity);

    return {
      partner: partnerCreated,
      message: 'Parceiro cadastrado com sucesso',
    };
  }

  @Put('/:id')
  async updatePartner(
    @Param('id') id: string,
    @Body() newData: UpdatePartnerDTO,
  ) {

    const partnerUpdated = await this.partnerService.updatePartner(
      id,
      newData,
    );

    return {
      partner: partnerUpdated,
      message: 'Dados atualizados com sucesso',
    };
  }

  @Delete('/:id')
  async removePartner(@Param('id') id: string) {
    await this.partnerService.deletePartner(id);

    return {
      message: 'Parceiro removido com sucesso'
    };
  }

}