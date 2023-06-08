import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListPartnerDTO } from './dto/ListPartner.dto';
import { UpdatePartnerDTO } from './dto/UpdatePartner.dto';
import { PartnerEntity } from './partner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(PartnerEntity)
    private readonly partnerRepository: Repository<PartnerEntity>,
  ) {}

  async getPartners() : Promise<ListPartnerDTO[] | undefined> {
    const savedPartners = await this.partnerRepository.find();
    const partnersList = savedPartners.map(
      (partner) => new ListPartnerDTO(partner.id, partner.name, partner.email),
    );
    return partnersList;
  }

  async getPartnerById(id: string) : Promise<ListPartnerDTO | undefined> {
    const partner = await this.partnerRepository.findOne({ where: { id }});
    const partnerResp = new ListPartnerDTO(partner.id, partner.name, partner.email);

    return partnerResp;
  }

  async createPartner(PartnerEntity: PartnerEntity) {
    await this.partnerRepository.save(PartnerEntity);
  }

  async updatePartner(id: string, newData: UpdatePartnerDTO)  {
    await this.partnerRepository.update(id, newData);

    const partnerUpdated = this.getPartnerById(id);

    return partnerUpdated;
  }
  
  async deletePartner(id: string) {
    const partnerRemoved = await this.partnerRepository.delete(id);
    console.log(partnerRemoved);

    return partnerRemoved;
  }

  

  
}
