import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() user: AuthDto) {
    return this.authService.signIn(user);
  }

  @Post('sign-up')
  async signUp(@Body() user: AuthDto) {
    return await this.authService.signUp(user);
  }
}
