import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('bookmarks')
export class BookmarkController {
  @Get()
  getAll() {
    return 'This action returns all bookmarks for current user';
  }
}
