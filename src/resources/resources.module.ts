import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { DamagedResources } from 'src/models/damagedResources.model';
import { Resources } from 'src/models/resources.model';
import { ResourcesDetails } from 'src/models/resourcesDetails.model';
import { Users } from 'src/models/users.model';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { JwtStrategy } from 'src/services/auth/strategy/jwt.strategy';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Resources,
      ResourcesDetails,
      Users,
      DamagedResources,
    ]),
    JwtModule.register({
      secret: process.env.JWTSecretKey,
      signOptions: { expiresIn: process.env.EXPIRED_TIME },
    }),
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService, JwtGuard, JwtStrategy],
})
export class ResourcesModule {}
