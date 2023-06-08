import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UpdatePartnerDTO } from './dto/UpdatePartner.dto';
import { CreatePartnerDTO } from './dto/CreatePartner.dto';
import { ListPartnerDTO } from './dto/ListPartner.dto';
import { PartnerEntity } from './partner.entity';
import { PartnerService } from './partner.service';

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
  async createPartner(@Body() partnerData: CreatePartnerDTO) {
    const partnerEntity = new PartnerEntity();
    partnerEntity.name = partnerData.name;
    partnerEntity.email = partnerData.email;
    partnerEntity.password = partnerData.password;
    partnerEntity.clients = partnerData.clients;
    partnerEntity.projects = partnerData.projects
    partnerEntity.id = uuid();

    const partnerCreated = await this.partnerService.createPartner(partnerEntity);

    return {
      partner: partnerCreated,
      message: 'Partner created with success',
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
      message: 'Partner updated with success',
    };
  }

  @Delete('/:id')
  async removePartner(@Param('id') id: string) {
    await this.partnerService.deletePartner(id);

    return {
      message: 'Partner removed with success'
    };
  }

}