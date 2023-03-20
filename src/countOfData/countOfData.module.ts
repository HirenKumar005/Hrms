import { Module } from '@nestjs/common';
import { CountOfDataService } from './countOfData.service';
import { CountOfDataController } from './countOfData.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Resources } from 'src/models/resources.model';
import { Users } from 'src/models/users.model';
import { Support } from 'src/models/support.model';
import { LeaveUser } from 'src/models/leaveUser.model';
import { Recruitment } from 'src/models/recruitment.model';
import { ResourcesDetails } from 'src/models/resourcesDetails.model';
import { DamagedResources } from 'src/models/damagedResources.model';
import { FeedBack } from 'src/models/feedBack.model';
import { Course } from 'src/models/course.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Resources,
      Users,
      Support,
      LeaveUser,
      Recruitment,
      ResourcesDetails,
      DamagedResources,
      FeedBack,
      Course,
    ]),
  ],
  controllers: [CountOfDataController],
  providers: [CountOfDataService],
})
export class CountOfDataModule {}
