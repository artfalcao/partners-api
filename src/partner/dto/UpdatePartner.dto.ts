import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

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
}