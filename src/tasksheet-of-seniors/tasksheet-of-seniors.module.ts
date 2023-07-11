import { Module } from '@nestjs/common';
import { TasksheetOfSeniorsService } from './tasksheet-of-seniors.service';
import { TasksheetOfSeniorsController } from './tasksheet-of-seniors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksheetOfSenior } from 'src/models/tasksheetOfSenior.model';
import { TasksheetAssignTo } from 'src/models/tasksheetAssignTo.model';

@Module({
  imports: [SequelizeModule.forFeature([TasksheetOfSenior, TasksheetAssignTo])],
  controllers: [TasksheetOfSeniorsController],
  providers: [TasksheetOfSeniorsService],
})
export class TasksheetOfSeniorsModule {}
