import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from 'src/models/admin.model';
import { Users } from 'src/models/users.model';
import { Designation } from 'src/models/designation.model';
import { City } from 'src/models/city.model';
import { State } from 'src/models/state.model';
import { Country } from 'src/models/country.model';
import { ListOfDataController } from './listOfData.controller';
import { ListOfDataService } from './listOfData.service';
import { Resources } from 'src/models/resources.model';
import { Qualification } from 'src/models/qualification.model';
import { Support } from 'src/models/support.model';
import { ResourcesDetails } from 'src/models/resourcesDetails.model';
import { SupportIssues } from 'src/models/supportIssue.model';
import { TasksheetOfSenior } from 'src/models/tasksheetOfSenior.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Users,
      Admin,
      Designation,
      City,
      State,
      Country,
      Resources,
      Qualification,
      Support,
      ResourcesDetails,
      SupportIssues,
      TasksheetOfSenior,
    ]),
  ],
  controllers: [ListOfDataController],
  providers: [ListOfDataService],
})
export class ListOfDataModule {}
