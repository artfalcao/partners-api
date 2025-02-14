import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDTO } from './dto/Login.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() {email, password}: LoginDTO) {
    return await this.authService.login(email, password);
  }

}