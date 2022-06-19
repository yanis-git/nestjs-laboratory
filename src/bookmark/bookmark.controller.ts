import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { CurrentUser } from '../auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  @Get()
  getAll(@CurrentUser() user: User) {
    return user;
  }
}
