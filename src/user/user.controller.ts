import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
// import { GetUser } from 'src/auth/decorator';
import { GetUser } from '../../src/auth/decorator';
import { JwtGuard } from '../../src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    // getMe(@GetUser() user: User, @GetUser('email') email: string) {
    return user;
  }
}
