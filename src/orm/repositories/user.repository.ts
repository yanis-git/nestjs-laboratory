import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

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
