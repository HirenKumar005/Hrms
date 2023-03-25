import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from 'src/models/address.model';
import { BankDetails } from 'src/models/bankDetails.model';
import { City } from 'src/models/city.model';
import { Country } from 'src/models/country.model';
import { Designation } from 'src/models/designation.model';
import { EducationDetails } from 'src/models/educationDetails.model';
import { EmergencyContact } from 'src/models/emergencyContact.model';
import { Position } from 'src/models/position.model';
import { Qualification } from 'src/models/qualification.model';
import { ReportTo } from 'src/models/reportTo.model';
import { State } from 'src/models/state.model';
import { Users } from 'src/models/users.model';
import { HrProfileController } from './hrProfile.controller';
import { HrProfileService } from './hrProfile.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Users,
      Address,
      City,
      State,
      Country,
      Designation,
      BankDetails,
      EducationDetails,
      EmergencyContact,
      Qualification,
      Position,
      ReportTo,
    ]),
    JwtModule.register({
      secret: process.env.JWTSecretKey,
      signOptions: { expiresIn: process.env.EXPIRED_TIME },
    }),
  ],
  controllers: [HrProfileController],
  providers: [HrProfileService],
})
export class HrProfileModule {}
