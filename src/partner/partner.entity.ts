import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { PartnerClientsEntity } from './partner-clients.entity';
import { PartnerProjectsEntity } from './partner-projects.entity'

@Entity({ name: 'partners' })
export class PartnerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', length: 100, nullable: false })
  email: string;

  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @OneToMany(() => PartnerClientsEntity, (partnerClientsEntity) =>
      partnerClientsEntity.partner, { cascade: true, eager: true })
  clients: PartnerClientsEntity[];

  @OneToMany(() => PartnerProjectsEntity, (partnerProjectsEntity) =>
      partnerProjectsEntity.partner, { cascade: true, eager: true })
  projects: PartnerProjectsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}