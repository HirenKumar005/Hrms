import { Module } from '@nestjs/common';
import { SupportService } from './support.service';
import { SupportController } from './support.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Support } from 'src/models/support.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/services/auth/strategy/jwt.strategy';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { Resources } from 'src/models/resources.model';
import { Users } from 'src/models/users.model';
import { SupportIssues } from 'src/models/supportIssue.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Support, Resources, Users, SupportIssues]),
    JwtModule.register({
      secret: process.env.JWTSecretKey,
      signOptions: { expiresIn: process.env.EXPIRED_TIME },
    }),
  ],
  controllers: [SupportController],
  providers: [SupportService, JwtGuard, JwtStrategy],
})
export class SupportModule {}
