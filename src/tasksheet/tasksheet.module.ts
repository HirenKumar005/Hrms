import { Module } from '@nestjs/common';
import { TasksheetService } from './tasksheet.service';
import { TasksheetController } from './tasksheet.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskSheet } from 'src/models/taskSheet.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/services/auth/strategy/jwt.strategy';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { ReportTo } from 'src/models/reportTo.model';
import { Users } from 'src/models/users.model';

@Module({
  imports: [
    SequelizeModule.forFeature([TaskSheet, ReportTo, Users]),
    JwtModule.register({
      secret: process.env.JWTSecretKey,
      signOptions: { expiresIn: process.env.EXPIRED_TIME },
    }),
  ],
  controllers: [TasksheetController],
  providers: [TasksheetService, JwtGuard, JwtStrategy],
})
export class TasksheetModule {}
