import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePartnerDTO {
  @IsNotEmpty({ message: 'Partner name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Partner email cannot be empty' })
  @IsEmail(undefined, { message: 'Invalid email' })
  email: string;

  @MinLength(6, { message: 'The password must be at least 6 characters long' })
  password: string;
}