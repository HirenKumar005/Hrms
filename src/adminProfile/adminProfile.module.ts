import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { JwtStrategy } from 'src/services/auth/strategy/jwt.strategy';
import { Admin } from 'src/models/admin.model';
import { Users } from 'src/models/users.model';
import { AdminProfileController } from './adminProfile.controller';
import { AdminProfileService } from './adminProfile.service';
import { Designation } from 'src/models/designation.model';
import { City } from 'src/models/city.model';
import { State } from 'src/models/state.model';
import { Country } from 'src/models/country.model';
import { Leave } from 'src/models/leave.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Users,
      Admin,
      Designation,
      City,
      State,
      Country,
      Leave,
    ]),
    JwtModule.register({
      secret: 'JWTSecretKey',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AdminProfileController],
  providers: [AdminProfileService, JwtGuard, JwtStrategy],
})
export class AdminProfileModule {}
