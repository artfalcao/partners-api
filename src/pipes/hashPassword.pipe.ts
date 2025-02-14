import { ConfigService } from '@nestjs/config';
import { Injectable, PipeTransform } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}

  async transform(password: any) {
    const sal = this.configService.get<string>('SAL_PASSWORD');

    const hashedPassword = await bcrypt.hash(password, sal!)

    return hashedPassword;
  }

}