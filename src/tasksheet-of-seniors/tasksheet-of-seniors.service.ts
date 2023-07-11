import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { TasksheetAssignTo } from 'src/models/tasksheetAssignTo.model';
import { TasksheetOfSenior } from 'src/models/tasksheetOfSenior.model';
import { HandleResponse } from 'src/services/handleResponse';
import { Messages } from 'src/utils/constants/message';
import { SeniorAddTasksheetDto } from './dto/seniorAddTasksheet.dto';

@Injectable()
export class TasksheetOfSeniorsService {
  constructor(
    @InjectModel(TasksheetOfSenior)
    private tasksheetOfSeniorModel: typeof TasksheetOfSenior,
    @InjectModel(TasksheetAssignTo)
    private tasksheetAssignToModel: typeof TasksheetAssignTo,
    @InjectConnection() private sequelize: Sequelize
  ) {}

  async seniorAddTasksheet(dto: SeniorAddTasksheetDto) {
    let error: any = null;
    let tasksheetOfSeniorDetails: any = {
      projectName: dto.projectName,
      taskName: dto.taskName,
      takeDetails: dto.takeDetails,
      startDate: dto.startDate,
      endDate: dto.endDate,
      estimateTime: dto.estimateTime,
      remainingTime: dto.remainingTime,
      addedBy: dto.addedBy,
    };

    const transaction = await this.sequelize.transaction();
    const seniorAddTasksheetDetails: any = await this.tasksheetOfSeniorModel
      .create(tasksheetOfSeniorDetails, {
        transaction: transaction,
      })
      .catch(async (err: any) => {
        await transaction.rollback();
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add tasksheet details.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        }
      );
    }

    if (
      seniorAddTasksheetDetails &&
      Object.keys(seniorAddTasksheetDetails).length > 0
    ) {
      let tasksheetAssignTo: any = dto.assignTo.map((item: any) => {
        return {
          tasksheetOfSeniorId: seniorAddTasksheetDetails.id,
          assignTo: item,
        };
      });

      await this.tasksheetAssignToModel
        .bulkCreate(tasksheetAssignTo, {
          transaction: transaction,
        })
        .catch(async (err: any) => {
          await transaction.rollback();
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} assign tasksheet.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          }
        );
      }
      await transaction.commit();
      return HandleResponse(
        HttpStatus.OK,
        `Senior add tasksheet details ${Messages.ADD_SUCCESS}`,
        undefined,
        undefined
      );
    }
  }
}
