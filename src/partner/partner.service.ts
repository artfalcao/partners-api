import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListPartnerDTO } from './dto/ListPartner.dto';
import { PartnerEntity } from './partner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(PartnerEntity)
    private readonly partnerRepository: Repository<PartnerEntity>,
  ) {}

  async listPartners() {
    const savedPartners = await this.partnerRepository.find();
    const partnersList = savedPartners.map(
      (partner) => new ListPartnerDTO(partner.id, partner.name, partner.email),
    );
    return partnersList;
  }

  async createPartner(PartnerEntity: PartnerEntity) {
    await this.partnerRepository.save(PartnerEntity);
  }

  

  
}
