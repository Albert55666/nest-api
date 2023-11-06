import { Test } from '@nestjs/testing';
// import { AppModule } from 'src/app.module';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto, LoginDto } from 'src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333/');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      it('should sign up', () => {
        const dto: AuthDto = {
          email: 'albert@gmail.com',
          password: 'secret',
          lastname: 'albert',
          firstname: 'onyishi',
        };
        return pactum
          .spec()
          .post('auth/signup')
          .withBody(dto)
          .expectStatus(200);
      });
    });

    describe('Signin', () => {
      const dto: LoginDto = { email: 'albert@gmail.com', password: 'secret' };
      it('it should throw if', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should sign in', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody(dto)
          .expectStatus(201);
      });
    });
  });

  describe('User', () => {
    describe('Get Me', () => {});

    describe('Edit User', () => {});
  });

  describe('Bookmarks', () => {
    describe('Create bookmark', () => {});

    describe('Get bookmarks', () => {});

    describe('Get bookmark by id', () => {});

    describe('Edit bookmark', () => {});

    describe('Delete bookmark', () => {});
  });

  it.todo('Test is running');
});
