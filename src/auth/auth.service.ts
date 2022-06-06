import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../orm/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  private select: { [key: string]: boolean } = { id: true, email: true };

  constructor(private prismaService: PrismaService) {}

  async signUp(user: AuthDto): Promise<{ id: string; email: string }> {
    let entity;
    try {
      const hashedPassword = await argon.hash(user.password);
      entity = await this.prismaService.user.create({
        data: { ...user, password: hashedPassword },
        select: { ...this.select },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002' // this code is for duplication of uniq field.
      ) {
        throw new ForbiddenException('Email already exists');
      }
    }
    return entity;
  }

  async signIn(user: AuthDto): Promise<{ id: string; email: string }> {
    const entity = await this.prismaService.user.findUnique({
      where: { email: user.email },
    });
    // verify entity exist and password match.
    if (!entity || !(await argon.verify(entity.password, user.password))) {
      throw new ForbiddenException('Invalid password');
    }
    // for now, we simply delete password. find a better solution later
    delete entity.password;
    return entity;
  }
}
