import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PartnerService } from '../partner/partner.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

export interface PartnerPayload {
  sub: string;
  username: string;
}


@Injectable()
export class AuthService {
  constructor(
    private partnerService: PartnerService,
    private jwtService: JwtService
  ) {}

  async login(email:string, password: string) {
    const partner = await this.partnerService.findByEmail(email);

    const userAuthenticated = await bcrypt.compare(password, partner.password);

    if (!userAuthenticated) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const payload: PartnerPayload = {
      sub: partner.id, 
      username: partner.name
    };

    return {
      tokenAccess: await this.jwtService.signAsync(payload)
    };
  }

}
