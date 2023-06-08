import { Type } from 'class-transformer';
import { 
  ArrayMinSize, 
  IsArray, 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  MinLength, 
  ValidateNested } from 'class-validator';
import { ClientPartnerDTO, ProjectsPartnerDTO } from './CreatePartner.dto';

export class UpdatePartnerDTO {
  @IsNotEmpty({ message: 'Partner name cannot be empty' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'Partner email cannot be empty' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'The password must be at least 6 characters long' })
  @IsOptional()
  password: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ClientPartnerDTO)
  @IsOptional()
  clients: ClientPartnerDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProjectsPartnerDTO)
  @IsOptional()
  projects: ProjectsPartnerDTO[];
}