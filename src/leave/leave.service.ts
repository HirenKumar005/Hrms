import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Leave } from 'src/models/leave.model';
import { LeaveUser } from 'src/models/leaveUser.model';
import { IdValidationDto } from './dto/findLeave.dto';
import { AddLeaveDto } from './dto/addLeave.dto';
import { LeaveApprovalDto } from './dto/leaveApproval.dto';
import { HandleResponse } from '../services/handleResponse';
import { Messages } from 'src/utils/constants/message';
import { Users } from 'src/models/users.model';
import { exit } from 'process';

@Injectable()
export class LeaveService {
  constructor(
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(Leave) private leaveModel: typeof Leave,
    @InjectModel(LeaveUser) private addLeaveModel: typeof LeaveUser,
  ) {}

  // async findLeave(dto: IdValidationDto) {
  //   let error = null;

  //   const leave: any = await this.leaveModel
  //     .findAll({
  //       where: { ...dto, isDeleted: 0 },
  //       order: [['id', 'DESC']],
  //       limit: 2,
  //     })
  //     .catch((err) => {
  //       error = err;
  //     });

  //   if (error) {
  //     return HandleResponse(
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //       `${Messages.FAILED_TO} find leaves`,
  //       undefined,
  //       {
  //         errorMessage: error.original.sqlMessage,
  //         field: error.fields,
  //       },
  //     );
  //   }

  //   if (leave && leave.length > 0) {
  //     return HandleResponse(HttpStatus.OK, '', leave, undefined);
  //   } else {
  //     return HandleResponse(
  //       HttpStatus.OK,
  //       Messages.NOT_FOUND,
  //       undefined,
  //       undefined,
  //     );
  //   }
  // }

  async addLeave(dto: AddLeaveDto) {
    let error = null;

    const { count }: any = await this.addLeaveModel
      .findAndCountAll({
        where: {
          userId: dto.userId,
          fromDate: dto.fromDate,
          toDate: dto.toDate,
        },
      })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} count leave/leaves`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (count > 0) {
      return HandleResponse(
        HttpStatus.CONFLICT,
        Messages.DUPLICATE_RECORD,
        undefined,
        undefined,
      );
    } else {
      const addLeaveByUser: any = await this.addLeaveModel
        .create({
          ...dto,
        })
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} add leave/leaves`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }

      if (addLeaveByUser && Object.keys(addLeaveByUser).length > 0) {
        return HandleResponse(
          HttpStatus.OK,
          `The Leave/Leaves ${Messages.ADD_SUCCESS}`,
          undefined,
          undefined,
        );
      } else {
        return HandleResponse(
          HttpStatus.OK,
          Messages.NOT_FOUND,
          undefined,
          undefined,
        );
      }
    }
  }

  async listOfApplicants() {
    let error = null;

    const listOfApplicantsData: any = await this.addLeaveModel
      .findAll({
        attributes: [
          'id',
          'leaveType',
          'fromDate',
          'toDate',
          'leaveDays',
          'reason',
          'status',
        ],
        include: [
          {
            model: this.userModel,
            attributes: ['firstName', 'lastName'],
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} list of supports.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (listOfApplicantsData && listOfApplicantsData.length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        listOfApplicantsData,
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

  async leaveApproval(dto: LeaveApprovalDto) {
    let error = null;

    if (dto.status === 'Approve') {
      const leaveApprovalDetails: any = await this.addLeaveModel
        .update(
          { status: dto.status, isDeleted: 1 },
          {
            where: {
              id: dto.id,
              userId: dto.userId,
            },
          },
        )
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} update leave status.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }

      const totalLeavesOfUser: any = await this.leaveModel
        .findOne({
          where: { id: dto.userId },
        })
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} find the total leaves.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }
      const [dataValues] = leaveApprovalDetails;

      if (dataValues === 1) {
        let error = null;

        let updatedTotalLeave = totalLeavesOfUser.dataValues.totalLeave - 1;

        const updateLeave: any = await this.leaveModel
          .update(
            { totalLeave: updatedTotalLeave },
            {
              where: {
                id: totalLeavesOfUser.dataValues.assignTo,
              },
            },
          )
          .catch((err) => {
            error = err;
          });

        if (error) {
          return HandleResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            `${Messages.FAILED_TO} update total leaves.`,
            undefined,
            {
              errorMessage: error.original.sqlMessage,
              field: error.fields,
            },
          );
        }

        return HandleResponse(
          HttpStatus.OK,
          `Leave approved and ${Messages.UPDATE_SUCCESS}`,
          undefined,
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
    } else if (dto.status === 'Reject') {
      const leaveApprovalDetails: any = await this.addLeaveModel
        .update(
          { status: dto.status, isDeleted: 1 },
          {
            where: {
              id: dto.id,
              userId: dto.userId,
            },
          },
        )
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} update leave status.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }
      return HandleResponse(
        HttpStatus.OK,
        `Leave rejected and ${Messages.UPDATE_SUCCESS}`,
        undefined,
        undefined,
      );
    }
  }
}
