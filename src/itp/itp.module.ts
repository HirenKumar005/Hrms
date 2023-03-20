import { Module } from '@nestjs/common';
import { ItpService } from './itp.service';
import { ItpController } from './itp.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from 'src/models/course.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { JwtStrategy } from 'src/services/auth/strategy/jwt.strategy';
import { Topic } from 'src/models/topic.model';
import { UserCourse } from 'src/models/userCourse.model';

@Module({
  imports: [SequelizeModule.forFeature([Course, Topic, UserCourse]),
  JwtModule.register({
    secret: process.env.JWTSecretKey,
    signOptions: { expiresIn: process.env.EXPIRED_TIME },
  }),
],
  controllers: [ItpController],
  providers: [ItpService, JwtGuard, JwtStrategy],
})
export class ItpModule {}
