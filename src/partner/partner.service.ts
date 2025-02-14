import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListPartnerDTO } from './dto/ListPartner.dto';
import { UpdatePartnerDTO } from './dto/UpdatePartner.dto';

import { PartnerEntity } from './partner.entity';



@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(PartnerEntity)
    private readonly partnerRepository: Repository<PartnerEntity>,
  ) {}

  
  async getPartners() : Promise<ListPartnerDTO[] | undefined> {
    const savedPartners = await this.partnerRepository.find();
    const partnersList = savedPartners.map(
      (partner) => new ListPartnerDTO(partner.id, partner.name, partner.description, partner.repositoryGit, partner.urlDoc),
    );
    return partnersList;
  }

  async getPartnerById(id: string) : Promise<ListPartnerDTO | undefined> {
    const partner = await this.partnerRepository.findOne({ where: { id }});
    const partnerResp = new ListPartnerDTO(partner.id, partner.name, partner.description, partner.repositoryGit, partner.urlDoc);

    return partnerResp;
  }

  async findByName(name: string) : Promise<ListPartnerDTO | undefined> {
    const partner = await this.partnerRepository.findOne({ where: { name } });
    const partnerResp = new ListPartnerDTO(partner.id, partner.name, partner.description, partner.repositoryGit, partner.urlDoc);

    return partnerResp;
  }

  async exitsWithGitRepo(gitRepo: string) : Promise<boolean> {
    const partner = await this.partnerRepository.findOne({ where: { repositoryGit: gitRepo } });
    const partnerResp = new ListPartnerDTO(partner.id, partner.name, partner.description, partner.repositoryGit, partner.urlDoc);

    return partner ? true : false
  }

  async createPartner(partnerToCreate: PartnerEntity) {
    await this.partnerRepository.save(partnerToCreate);
    const partnerCreated = await this.getPartnerById(partnerToCreate.id);

    return partnerCreated;
  }

  async updatePartner(id: string, newData: UpdatePartnerDTO)  {
    await this.partnerRepository.update(id, newData);

    const partnerUpdated = this.getPartnerById(id);

    return partnerUpdated;
  }
  
  async deletePartner(id: string) {
    await this.partnerRepository.delete(id);
  }
}
