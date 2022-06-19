import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards';
import { CurrentUser } from '../auth/decorators';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  @Get()
  getAll(@CurrentUser() user: User) {
    return user;
  }
}
