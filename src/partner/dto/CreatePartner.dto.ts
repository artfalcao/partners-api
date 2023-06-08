import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePartnerDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  password: string;
}