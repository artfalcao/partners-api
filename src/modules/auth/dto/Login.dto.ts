import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDTO {
 @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Campo passsword é obrigatório' })
  password: string;

}