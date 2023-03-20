import { EmployeeModule } from './employee/employee.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Designation } from './models/designation.model';
import { Position } from './models/position.model';
import { Users } from './models/users.model';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { Course } from './models/course.model';
import { Topic } from './models/topic.model';
import { ItpModule } from './itp/itp.module';
import { BankDetails } from './models/bankDetails.model';
import { Admin } from './models/admin.model';
import { Country } from './models/country.model';
import { State } from './models/state.model';
import { City } from './models/city.model';
import { AdminProfileModule } from './adminProfile/adminProfile.module';
import { HrProfileModule } from './hrProfile/hrProfile.module';
import { EmployeeProfileModule } from './employeeProfile/employeeProfile.module';
import { DocumentModule } from './document/document.module';
import { Documents } from './models/documents.model';
import { EducationModule } from './education/education.module';
import { LeaveModule } from './leave/leave.module';
import { Leave } from './models/leave.model';
import { LeaveUser } from './models/leaveUser.model';
import { BankDetailsModule } from './bankDetails/bankDetails.module';
import { EmergencyContact } from './models/emergencyContact.model';
import { Qualification } from './models/qualification.model';
import { EducationDetails } from './models/educationDetails.model';
import { TaskSheet } from './models/taskSheet.model';
import { TasksheetModule } from './tasksheet/tasksheet.module';
import { ReportModule } from './report/report.module';
import { ResourcesModule } from './resources/resources.module';
import { Resources } from './models/resources.model';
import { ResourcesDetails } from './models/resourcesDetails.model';
import { ListOfDataModule } from './listOfData/listOfData.module';
import { Configuration } from './models/configuration.model';
import { FeedBack } from './models/feedBack.model';
import { Recruitment } from './models/recruitment.model';
import { SupportModule } from './support/support.module';
import { Support } from './models/support.model';
import { CountOfDataModule } from './countOfData/countOfData.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Address } from './models/address.model';
import { ConfigurationModule } from './configuration/configuration.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportTo } from './models/reportTo.model';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { DamagedResources } from './models/damagedResources.model';
import { UserCourse } from './models/userCourse.model';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'bnorca3wrur2z3r9ujv2-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uv0lgzccxmpx7yyt',
      password: 'wzBvDMhWupTWDJk1KvP3',
      database: 'bnorca3wrur2z3r9ujv2',
      autoLoadModels: true,
      synchronize: true,
      models: [
        Users,
        Designation,
        Position,
        Course,
        Topic,
        Admin,
        Country,
        State,
        City,
        BankDetails,
        Documents,
        EducationDetails,
        EmergencyContact,
        Qualification,
        TaskSheet,
        Configuration,
        FeedBack,
        Recruitment,
        Resources,
        Support,
        ResourcesDetails,
        Address,
        Leave,
        LeaveUser,
        ReportTo,
        DamagedResources,
        UserCourse
      ],
    }),
    MulterModule.register({
      dest: './public/uploads',
    }),
    AdminProfileModule,
    ItpModule,
    EmployeeModule,
    HrProfileModule,
    EmployeeProfileModule,
    BankDetailsModule,
    SupportModule,
    ReportModule,
    ResourcesModule,
    ListOfDataModule,
    EducationModule,
    DocumentModule,
    Documents,
    LeaveModule,
    ConfigurationModule,
    DashboardModule,
    RecruitmentModule,
    CountOfDataModule,
    TasksheetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
