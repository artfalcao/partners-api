import { 
  IsString, 
  IsOptional, 
  IsUrl, 
  } from 'class-validator';

export class UpdatePartnerDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsUrl()
  @IsOptional()
  repositoryGit: string;

  @IsUrl()
  @IsOptional()
  urlDoc: string;
}