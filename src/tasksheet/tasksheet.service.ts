import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskSheet } from 'src/models/taskSheet.model';
import { HandleResponse } from 'src/services/handleResponse';
import { AddTaskSheet } from './dto/addTaskSheet.dto';
import { Messages } from 'src/utils/constants/message';
import { ReportTo } from 'src/models/reportTo.model';
import { Users } from 'src/models/users.model';
import { ApprovalTimesheetDto } from './dto/approvalTasksheet.dto';
import { EditTaskSheetDto } from './dto/editTaskSheet.dto';
import { TaskSheetOfSenior } from 'src/models/taskSheetOfSenior.model';

@Injectable()
export class TaskSheetService {
  constructor(
    @InjectModel(TaskSheet) private taskSheetModel: typeof TaskSheet,
    @InjectModel(ReportTo) private reportToModel: typeof ReportTo,
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(TaskSheetOfSenior)
    private taskSheetOfSeniorModel: typeof TaskSheetOfSenior
  ) {}

  async addTaskSheet(dto: AddTaskSheet) {
    let error: any = null;
    const addTaskSheet: any = await this.taskSheetModel
      .create({ ...dto })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add task sheet`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        }
      );
    }

    if (addTaskSheet && Object.keys(addTaskSheet).length > 0) {
      const findTaskSheet: any = await this.taskSheetOfSeniorModel
        .findOne({
          where: { id: addTaskSheet.taskSheetOfSeniorId },
        })
        .catch((err: any) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} find task sheet of senior`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          }
        );
      }

      const currentDate: any = new Date();
      const currentDateString: any = currentDate.toISOString().split('T')[0];

      const EstimateDate: any = new Date(
        `${currentDateString} ${findTaskSheet.estimateTime}`
      );
      const TaskSheetTakenDate: any = new Date(
        `${currentDateString} ${addTaskSheet.takenTime}`
      );

      const timeDifference: any =
        EstimateDate.getTime() - TaskSheetTakenDate.getTime();
      const differenceDate: any = new Date(timeDifference);

      const hours: any = differenceDate
        .getUTCHours()
        .toString()
        .padStart(2, '0');
      const minutes: any = differenceDate
        .getUTCMinutes()
        .toString()
        .padStart(2, '0');
      const seconds: any = differenceDate
        .getUTCSeconds()
        .toString()
        .padStart(2, '0');

      const remainingTime: any = `${hours}:${minutes}:${seconds}`;
      console.log('---', remainingTime);

      await this.taskSheetOfSeniorModel
        .update(
          { remainingTime: remainingTime },
          { where: { id: addTaskSheet.taskSheetOfSeniorId } }
        )
        .catch((err: any) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} update task sheet `,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          }
        );
      }

      return HandleResponse(
        HttpStatus.CREATED,
        `Task sheet ${Messages.ADD_SUCCESS}`,
        { id: addTaskSheet.id },
        undefined
      );
    }
  }

  async editTaskSheet(taskSheetId: number, dto: EditTaskSheetDto) {
    let error: any = null;
    const findTaskSheet: any = await this.taskSheetModel
      .findOne({
        where: { id: taskSheetId },
      })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} find task sheet`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        }
      );
    }

    const editTaskSheet: any = await this.taskSheetModel
      .update(dto, {
        where: { id: findTaskSheet.id },
      })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add task sheet`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        }
      );
    }

    const [updateDetail]: any = editTaskSheet;

    if (updateDetail === 1) {
      const findData: any = await this.taskSheetOfSeniorModel.findOne({
        where: { id: findTaskSheet.taskSheetOfSeniorId },
      });
      const currentDate: any = new Date();
      const currentDateString: any = currentDate.toISOString().split('T')[0];

      const EstimateDate: any = new Date(
        `${currentDateString} ${findData.estimateTime}`
      );
      const TaskSheetTakenDate: any = new Date(
        `${currentDateString} ${findTaskSheet.takenTime}`
      );

      const timeDifference: any =
        EstimateDate.getTime() - TaskSheetTakenDate.getTime();
      const differenceDate: any = new Date(timeDifference);

      const hours: any = differenceDate
        .getUTCHours()
        .toString()
        .padStart(2, '0');
      const minutes: any = differenceDate
        .getUTCMinutes()
        .toString()
        .padStart(2, '0');
      const seconds: any = differenceDate
        .getUTCSeconds()
        .toString()
        .padStart(2, '0');

      const remainingTime: any = `${hours}:${minutes}:${seconds}`;

      await this.taskSheetOfSeniorModel
        .update(
          { remainingTime: remainingTime },
          { where: { id: findTaskSheet.taskSheetOfSeniorId } }
        )
        .catch((err: any) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} update task sheet`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          }
        );
      }

      return HandleResponse(
        HttpStatus.CREATED,
        `Task sheet ${Messages.UPDATE_SUCCESS}.`,
        undefined,
        undefined
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined
      );
    }
  }

  async viewTasksheet(id: number) {
    let error = null;

    const viewTasksheetData: any = await this.taskSheetModel
      .findAll({
        attributes: [
          'id',
          'addedBy',
          'date',
          'nameOfTask',
          'detailsOfTask',
          'estimateTime',
          'takenTime',
          'status',
        ],
        where: { addedBy: id, isDeleted: 0 },
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view tasksheet.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        }
      );
    }

    if (viewTasksheetData && viewTasksheetData.length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        viewTasksheetData,
        undefined
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined
      );
    }
  }

  async listOfJuniorTasksheet(id: number) {
    let error = null;

    const viewJouniorTasksheetData: any = await this.taskSheetModel
      .findAll({
        attributes: ['id', 'addedBy'],
        include: [
          {
            model: this.userModel,
            attributes: ['firstName', 'lastName'],
          },
        ],
        where: { reportTo: id, isDeleted: 0 },
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view tasksheet.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        }
      );
    }

    if (viewJouniorTasksheetData && viewJouniorTasksheetData.length > 0) {
      let viewJouniorTasksheetDataWithName = viewJouniorTasksheetData.map(
        (item) => {
          item = {
            id: item.dataValues.id,
            addedBy: item.dataValues.addedBy,
            firstname: item.dataValues.users.firstName,
            lastname: item.dataValues.users.lastName,
          };
          return item;
        }
      );
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        viewJouniorTasksheetDataWithName,
        undefined
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined
      );
    }
  }

  async viewJuniorTasksheet(addedBy: number) {
    let error = null;

    const viewJouniorTasksheetData: any = await this.userModel
      .findAll({
        attributes: ['firstName', 'lastName'],
        include: [
          {
            model: this.taskSheetModel,
            attributes: [
              'id',
              'addedBy',
              'date',
              'nameOfTask',
              'detailsOfTask',
              'estimateTime',
              'takenTime',
              'status',
            ],
          },
        ],
        where: { id: addedBy, isDeleted: 0 },
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view tasksheet.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        }
      );
    }

    if (viewJouniorTasksheetData && viewJouniorTasksheetData.length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        viewJouniorTasksheetData,
        undefined
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined
      );
    }
  }

  async approveTimesheet(dto: ApprovalTimesheetDto, id: number) {
    let error = null;

    const approveTimesheetDetails: any = await this.taskSheetModel
      .update(
        {
          estimateTime: dto.estimateTime,
          status: dto.status,
          reason: dto.reason,
          isDeleted: 1,
        },
        {
          where: {
            id: dto.id,
            addedBy: dto.addedBy,
          },
        }
      )
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} update tasksheet.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        }
      );
    }

    if (approveTimesheetDetails && approveTimesheetDetails.length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        approveTimesheetDetails,
        undefined
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined
      );
    }
  }
}
