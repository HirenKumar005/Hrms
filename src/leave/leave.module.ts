import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Leave } from 'src/models/leave.model';
import { LeaveUser } from 'src/models/leaveUser.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { JwtStrategy } from 'src/services/auth/strategy/jwt.strategy';
import { Users } from 'src/models/users.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Leave, LeaveUser, Users]),
    JwtModule.register({
      secret: 'JWTSecretKey',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [LeaveController],
  providers: [LeaveService, JwtGuard, JwtStrategy],
})
export class LeaveModule {}
