import { 
  IsNotEmpty, 
  IsUrl,
  IsString, 
} from 'class-validator';
import { GitRepoIsUnique } from '../validators/uniqueGitRepo.validator';

export class CreatePartnerDTO {
  @IsNotEmpty({ message: 'Campo nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Campo email é obrigatório' })
  email: string;

  @IsNotEmpty({ message: 'Campo passsword é obrigatório' })
  password: string;

  @IsNotEmpty({ message: 'Campo descrição é obrigatório' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Campo repositório do git é obrigatório' })
  @IsUrl()
  @GitRepoIsUnique({message: "Parceiro com git já existente"})
  repositoryGit: string;

  @IsNotEmpty({ message: 'Campo repositório do git é obrigatório' })
  @IsString()
  @IsUrl()
  urlDoc: string;
}