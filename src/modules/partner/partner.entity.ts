import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'parceiros' })
export class PartnerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', length: 100, nullable: false })
  email: string;

  @Exclude()
  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'repositoryGit', length: 255, nullable: false })
  repositoryGit: string;

  @Column({ name: 'urlDoc', length: 255, nullable: false })
  urlDoc: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}