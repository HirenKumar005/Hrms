import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/models/users.model';
import { CountOfDataService } from 'src/countOfData/countOfData.service';
import { Resources } from 'src/models/resources.model';
import { Support } from 'src/models/support.model';
import { ReportTo } from 'src/models/reportTo.model';
import { Designation } from 'src/models/designation.model';
import { LeaveUser } from 'src/models/leaveUser.model';
import { Recruitment } from 'src/models/recruitment.model';
import { ResourcesDetails } from 'src/models/resourcesDetails.model';
import { DamagedResources } from 'src/models/damagedResources.model';
import { FeedBack } from 'src/models/feedBack.model';
import { Course } from 'src/models/course.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Users,
      Resources,
      Support,
      ReportTo,
      Designation,
      LeaveUser,
      Recruitment,
      ResourcesDetails,
      DamagedResources,
      FeedBack,
      Course,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, CountOfDataService],
})
export class DashboardModule {}
