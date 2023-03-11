import { Module } from '@nestjs/common';
import { BankDetailsService } from './bankDetails.service';
import { BankDetailsController } from './bankDetails.controller';
import { BankDetails } from 'src/models/bankDetails.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Users } from 'src/models/users.model';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { JwtStrategy } from 'src/services/auth/strategy/jwt.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([BankDetails, Users]),
    JwtModule.register({
      secret: process.env.JWTSecretKey,
      signOptions: { expiresIn: process.env.EXPIRED_TIME },
    }),
  ],
  controllers: [BankDetailsController],
  providers: [BankDetailsService, JwtGuard, JwtStrategy],
})
export class BankDetailsModule {}
