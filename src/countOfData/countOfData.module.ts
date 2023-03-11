import { Module } from '@nestjs/common';
import { CountOfDataService } from './countOfData.service';
import { CountOfDataController } from './countOfData.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Resources } from 'src/models/resources.model';
import { Users } from 'src/models/users.model';
import { Support } from 'src/models/support.model';
import { LeaveUser } from 'src/models/leaveUser.model';

@Module({
  imports: [SequelizeModule.forFeature([Resources, Users, Support, LeaveUser])],
  controllers: [CountOfDataController],
  providers: [CountOfDataService],
})
export class CountOfDataModule {}
