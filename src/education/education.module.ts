import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Users } from 'src/models/users.model';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { JwtStrategy } from 'src/services/auth/strategy/jwt.strategy';
import { EducationDetails } from 'src/models/educationDetails.model';
import { Qualification } from 'src/models/qualification.model';

@Module({
  imports: [
    SequelizeModule.forFeature([EducationDetails, Users, Qualification]),
    JwtModule.register({
      secret: process.env.JWTSecretKey,
      signOptions: { expiresIn: process.env.EXPIRED_TIME },
    }),
  ],
  controllers: [EducationController],
  providers: [EducationService, JwtGuard, JwtStrategy],
})
export class EducationModule {}
