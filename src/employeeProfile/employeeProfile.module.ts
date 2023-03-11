import { Module } from '@nestjs/common';
import { EmployeeProfileService } from './employeeProfile.service';
import { EmployeeProfileController } from './employeeProfile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from 'src/models/admin.model';
import { Users } from 'src/models/users.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Users, Admin]),
    JwtModule.register({
      secret: process.env.JWTSecretKey,
      signOptions: { expiresIn: process.env.EXPIRED_TIME },
    }),
  ],
  controllers: [EmployeeProfileController],
  providers: [EmployeeProfileService],
})
export class EmployeeProfileModule {}
