import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { PartnerEntity } from './partner.entity';

@Entity({ name: 'partner_projects' })
export class PartnerProjectsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @ManyToOne(() => PartnerEntity, (partner) => partner.projects, { orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  partner: PartnerEntity;
}