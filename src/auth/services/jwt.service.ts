import { Injectable } from '@nestjs/common';
import { JwtService as CoreJwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  private readonly options: JwtSignOptions;

  constructor(private jwt: CoreJwtService, private config: ConfigService) {
    this.options = { ...this.config.get<Partial<JwtSignOptions>>('jwt') };
  }

  async sign(id: string, email: string): Promise<string> {
    return this.jwt.signAsync({ id, email }, this.options);
  }
}
