import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './services/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy';

@Module({
  // @todo here we should probably set up the secret key for the JWT in order to have refresh token.
  imports: [ConfigModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy],
})
export class AuthModule {}
