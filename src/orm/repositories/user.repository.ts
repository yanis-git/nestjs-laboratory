import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(
    email: string,
    select?: { [key: string]: boolean },
  ): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { email },
      ...(select ?? {}),
    });
  }

  async register(email: string, hashedPassword: string): Promise<User> {
    // @ts-ignore
    return await this.prisma.user.create({
      select: { id: true, email: true },
      data: { email, password: hashedPassword },
    });
  }
}
