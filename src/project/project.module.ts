import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
import { JwtStrategy } from 'src/services/auth/strategy/jwt.strategy';
import { ProjectService } from './project.service';
import { Project } from 'src/models/project.model';
import { ProjectAssignTo } from 'src/models/projectAssignTo.model';
import { ProjectController } from './project.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Project, ProjectAssignTo]),
    JwtModule.register({
      secret: 'JWTSecretKey',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, JwtGuard, JwtStrategy],
})
export class ProjectModule {}
