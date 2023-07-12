import { Module } from '@nestjs/common';
import { TasksheetOfSeniorsService } from './tasksheet-of-seniors.service';
import { TasksheetOfSeniorsController } from './tasksheet-of-seniors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskSheetOfSenior } from 'src/models/taskSheetOfSenior.model';
import { TasksheetAssignTo } from 'src/models/tasksheetAssignTo.model';

@Module({
  imports: [SequelizeModule.forFeature([TaskSheetOfSenior, TasksheetAssignTo])],
  controllers: [TasksheetOfSeniorsController],
  providers: [TasksheetOfSeniorsService],
})
export class TasksheetOfSeniorsModule {}
