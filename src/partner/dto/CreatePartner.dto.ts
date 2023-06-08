import { 
  IsEmail, 
  IsNotEmpty, 
  MinLength, 
  IsString, 
  ValidateNested, 
  ArrayMinSize, 
  IsArray } from 'class-validator';
import { PartnerEntity } from '../partner.entity';
import { Type } from 'class-transformer';

export class ClientPartnerDTO {
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Client Name cannot be empty' })
  name: string;

  partner: PartnerEntity;
}

export class ProjectsPartnerDTO {
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Product Name cannot be empty' })
  name: string;

  partner: PartnerEntity;
}

export class CreatePartnerDTO {
  @IsNotEmpty({ message: 'Partner name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Partner email cannot be empty' })
  @IsEmail(undefined, { message: 'Invalid email' })
  email: string;

  @MinLength(6, { message: 'The password must be at least 6 characters long' })
  password: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ClientPartnerDTO)
  clients: ClientPartnerDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProjectsPartnerDTO)
  projects: ProjectsPartnerDTO[];
}