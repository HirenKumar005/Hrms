import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/models/users.model';
import { CountOfDataService } from 'src/countOfData/countOfData.service';
import { CountOfDataController } from 'src/countOfData/countOfData.controller';
import { Resources } from 'src/models/resources.model';
import { Support } from 'src/models/support.model';
import { ReportTo } from 'src/models/reportTo.model';
import { Designation } from 'src/models/designation.model';
import { LeaveUser } from 'src/models/leaveUser.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Users,
      Resources,
      Support,
      ReportTo,
      Designation,
      LeaveUser,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, CountOfDataService],
})
export class DashboardModule {}
