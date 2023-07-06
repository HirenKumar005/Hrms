import { EmployeeService } from './employee.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BankDetails } from 'src/models/bankDetails.model';
import { EmployeeController } from './employee.controller';
import { Users } from 'src/models/users.model';
import { EmergencyContact } from 'src/models/emergencyContact.model';
import { EducationDetails } from 'src/models/educationDetails.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/services/auth/strategy/jwt.strategy';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { Documents } from 'src/models/documents.model';
import { Position } from 'src/models/position.model';
import { Designation } from 'src/models/designation.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Users,
      BankDetails,
      EducationDetails,
      EmergencyContact,
      Documents,
      Position,
      Designation,
    ]),
    JwtModule.register({
      secret: process.env.JWTSecretKey,
      signOptions: { expiresIn: process.env.EXPIRED_TIME },
    }),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, JwtGuard, JwtStrategy],
})
export class EmployeeModule {}
