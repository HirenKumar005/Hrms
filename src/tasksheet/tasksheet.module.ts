import { Module } from '@nestjs/common';
import { TaskSheetService } from './taskSheet.service';
import { TaskSheetController } from './taskSheet.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskSheet } from 'src/models/taskSheet.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/services/auth/strategy/jwt.strategy';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { ReportTo } from 'src/models/reportTo.model';
import { Users } from 'src/models/users.model';
import { TaskSheetOfSenior } from 'src/models/taskSheetOfSenior.model';

@Module({
  imports: [
    SequelizeModule.forFeature([TaskSheet, ReportTo, Users, TaskSheetOfSenior]),
    JwtModule.register({
      secret: process.env.JWTSecretKey,
      signOptions: { expiresIn: process.env.EXPIRED_TIME },
    }),
  ],
  controllers: [TaskSheetController],
  providers: [TaskSheetService, JwtGuard, JwtStrategy],
})
export class TaskSheetModule {}
