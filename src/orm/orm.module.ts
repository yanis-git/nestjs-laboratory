import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './repositories';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [PrismaService, UserRepository],
  exports: [UserRepository],
})
export class OrmModule {}
