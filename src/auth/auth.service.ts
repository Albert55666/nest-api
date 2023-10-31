import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);

    //save the new user in the db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
        lastname: dto.lastname,
      },
      //! this is to select the fields you want to recieve from the users obj
      //   select: {
      //     email: true,
      //     id: true,
      //     lastname: true,
      //   },
    });

    delete user.hash;

    return user;
  }
  signIn() {
    return { msg: 'I am signed in' };
  }
}
