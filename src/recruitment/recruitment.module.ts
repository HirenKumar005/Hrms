import { Module } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { RecruitmentController } from './recruitment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recruitment } from 'src/models/recruitment.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { JwtStrategy } from 'src/services/auth/strategy/jwt.strategy';
import { FeedBack } from 'src/models/feedBack.model';
import { Users } from 'src/models/users.model';
import { Designation } from 'src/models/designation.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Recruitment, FeedBack, Users, Designation]),
    JwtModule.register({
      secret: 'JWTSecretKey',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [RecruitmentController],
  providers: [RecruitmentService, JwtGuard, JwtStrategy],
})
export class RecruitmentModule {}
