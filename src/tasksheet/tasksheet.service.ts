import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskSheet } from 'src/models/taskSheet.model';
import { HandleResponse } from 'src/services/handleResponse';
import { AddTasksheet } from './dto/addTasksheet.dto';
import { Messages } from 'src/utils/constants/message';
import { ReportTo } from 'src/models/reportTo.model';
import { Users } from 'src/models/users.model';
import { ApprovalTimesheetDto } from './dto/approvalTasksheet.dto';

@Injectable()
export class TasksheetService {
  constructor(
    @InjectModel(TaskSheet) private tasksheetModel: typeof TaskSheet,
    @InjectModel(ReportTo) private reportToModel: typeof ReportTo,
    @InjectModel(Users) private userModel: typeof Users,
  ) {}

  async addTasksheet(dto: AddTasksheet) {
    let error = null;

    const findReportToData: any = await this.reportToModel
      .findOne({
        where: {
          assigneeId: dto.addedBy,
        },
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} find details.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (findReportToData && Object.keys(findReportToData).length > 0) {
      const addTasksheetData: any = await this.tasksheetModel
        .create({ ...dto, reportTo: findReportToData.dataValues.assignerId })
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} find details.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }
      if (addTasksheetData && Object.keys(addTasksheetData).length > 0) {
        return HandleResponse(
          HttpStatus.OK,
          `Tasksheet details ${Messages.ADD_SUCCESS}.`,
          undefined,
          undefined,
        );
      } else {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} create tasksheet details.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        `Assignees are ${Messages.NOT_FOUND}`,
        undefined,
        undefined,
      );
    }
  }

  async viewTasksheet(id: number) {
    let error = null;

    const viewTasksheetData: any = await this.tasksheetModel
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
        },
      );
    }

    if (viewTasksheetData && viewTasksheetData.length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        viewTasksheetData,
        undefined,
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async listOfJuniorTasksheet(id: number) {
    let error = null;

    const viewJouniorTasksheetData: any = await this.tasksheetModel
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
        },
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
        },
      );
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        viewJouniorTasksheetDataWithName,
        undefined,
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
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
            model: this.tasksheetModel,
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
        },
      );
    }

    if (viewJouniorTasksheetData && viewJouniorTasksheetData.length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        viewJouniorTasksheetData,
        undefined,
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async approveTimesheet(dto: ApprovalTimesheetDto, id: number) {
    let error = null;

    const approveTimesheetDetails: any = await this.tasksheetModel
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
        },
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
        },
      );
    }

    if (approveTimesheetDetails && approveTimesheetDetails.length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        approveTimesheetDetails,
        undefined,
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }
}
