import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() user: AuthDto) {
    const token = await this.authService.signIn(user);
    return {
      token,
    };
  }

  @Post('sign-up')
  async signUp(@Body() user: AuthDto) {
    return await this.authService.signUp(user);
  }
}
