import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from '../dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UserRepository } from '../../orm/repositories/user.repository';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(user: AuthDto): Promise<{ id: string; email: string }> {
    let entity;
    try {
      const hashedPassword = await argon.hash(user.password);
      entity = await this.userRepository.register(user.email, hashedPassword);
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

  async signIn(user: AuthDto): Promise<string> {
    const entity = await this.userRepository.findByEmail(user.email);
    // verify entity exist and password match.
    if (!entity || !(await argon.verify(entity.password, user.password))) {
      throw new ForbiddenException('Invalid password');
    }
    return await this.jwtService.sign(entity.id, entity.email);
  }
}
