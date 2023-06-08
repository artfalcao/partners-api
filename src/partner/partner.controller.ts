import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreatePartnerDTO } from './dto/CreatePartner.dto';
import { ListPartnerDTO } from './dto/ListPartner.dto';
import { PartnerEntity } from './partner.entity';
import { PartnerService } from './partner.service';

@Controller('/partners')
export class PartnerController {
  constructor(private partnerService: PartnerService) {}

  @Get()
  async listPartners() {
    const savedPartners = await this.partnerService.listPartners();

    return savedPartners;
  }

  @Post()
  async createPartner(@Body() partnerData: CreatePartnerDTO) {
    const partnerEntity = new PartnerEntity();
    partnerEntity.email = partnerData.email;
    partnerEntity.password = partnerData.password;
    partnerEntity.name = partnerData.name;
    partnerEntity.id = uuid();

    this.partnerService.createPartner(partnerEntity);

    return {
      partner: new ListPartnerDTO(partnerEntity.id, partnerEntity.name, partnerEntity.email),
      messagem: 'Partner created with success',
    };
  }

}