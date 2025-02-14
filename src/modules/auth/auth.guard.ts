import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { PartnerPayload } from './auth.service';

export interface RequestWithPartner extends Request {
  partner: PartnerPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithPartner>();

    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException('Authentication error');
    }

    try {
      const payload: PartnerPayload = await this.jwtService.verifyAsync(token);
      req.partner = payload;

    } catch (error) {
      throw new UnauthorizedException('Invalid JWT');
    }

    return true;
  }

  private extractTokenFromHeader(req:Request): string | undefined {
    const [type, token] = req.headers.authorization.split(' ') ?? []
    return type == 'Bearer' ? token : undefined
  }

}

