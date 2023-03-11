import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { JwtStrategy } from 'src/services/auth/strategy/jwt.strategy';
import { TaskSheet } from 'src/models/taskSheet.model';
import { Users } from 'src/models/users.model';
import { ResourcesDetails } from 'src/models/resourcesDetails.model';
import { Resources } from 'src/models/resources.model';
import { Configuration } from 'src/models/configuration.model';
import { Recruitment } from 'src/models/recruitment.model';
import { FeedBack } from 'src/models/feedBack.model';
import { Designation } from 'src/models/designation.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      TaskSheet,
      Users,
      ResourcesDetails,
      Resources,
      Configuration,
      FeedBack,
      Recruitment,
      Designation,
    ]),
    JwtModule.register({
      secret: process.env.JWTSecretKey,
      signOptions: { expiresIn: process.env.EXPIRED_TIME },
    }),
  ],
  controllers: [ReportController],
  providers: [ReportService, JwtGuard, JwtStrategy],
})
export class ReportModule {}