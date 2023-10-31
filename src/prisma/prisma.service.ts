import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // url: 'mysql://root:Aa09030621529%23@localhost:3306/FirstNest',
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
