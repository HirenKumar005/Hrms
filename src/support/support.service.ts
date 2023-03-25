import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import * as Moment from 'moment';
import { Support } from 'src/models/support.model';
import { HandleResponse } from 'src/services/handleResponse';
import { AddSupport } from './dto/addSupport.dto';
import { Messages } from 'src/utils/constants/message';
import { Users } from 'src/models/users.model';
import { Resources } from 'src/models/resources.model';
import { UpdateSupportStatus } from './dto/updateSupportStatus.dto';
import { SupportIssues } from 'src/models/supportIssue.model';

@Injectable()
export class SupportService {
  constructor(
    @InjectModel(Support) private supportModel: typeof Support,
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(Resources) private resourceModel: typeof Resources,
    @InjectModel(SupportIssues)
    private supportIssuesModel: typeof SupportIssues,
  ) {}

  async addSupport(dto: AddSupport) {
    let error = null;
    let resourceDetails: any;
    let obj: any = {
      issueId: dto.issueId,
      reason: dto.reason,
      userId: dto.userId,
    };

    if (dto.resourceName && dto.resourceNo) {
      resourceDetails = await this.resourceModel
        .findOne({
          where: {
            resourceNo: dto.resourceNo,
            resourceName: dto.resourceName,
          },
        })
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} damaged resources.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }

      if (resourceDetails && Object.keys(resourceDetails).length > 0) {
        obj.resourceId = resourceDetails.id;
      } else {
        return HandleResponse(
          HttpStatus.NOT_FOUND,
          Messages.DOES_NOT_MATCH,
          undefined,
          undefined,
        );
      }
    }

    const addSupportData: any = await this.supportModel
      .create(obj)
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add support.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (addSupportData && Object.keys(addSupportData).length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        `Support details ${Messages.ADD_SUCCESS}.`,
        undefined,
        undefined,
      );
    }
  }

  async viewSupport(id: number) {
    let error = null;

    const supportHRData: any = await this.userModel
      .findAll({
        attributes: ['id', 'firstName', 'lastName'],
        where: { id, isDeleted: 0 },
        include: [
          {
            model: this.supportModel,
            where: { isDeleted: 0 },
            attributes: [
              'id',
              'issueId',
              'resourceId',
              'reason',
              'dateOfRequest',
              'status',
            ],
            include: [
              {
                model: this.resourceModel,
                attributes: ['id', 'resourceName', 'resourceNo'],
              },
              {
                model: this.supportIssuesModel,
                attributes: ['id', 'issue'],
                where: { isDeleted: 0 },
              },
            ],
          },
        ],
        order: [['id', 'ASC']],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view support by HR.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (supportHRData && supportHRData.length > 0) {
      return HandleResponse(HttpStatus.OK, undefined, supportHRData, undefined);
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async listSupportDataOfEmployee() {
    let error = null;

    const supportEmployeeData: any = await this.supportModel
      .findAll({
        attributes: [
          'id',
          'issueId',
          'resourceId',
          'reason',
          'dateOfRequest',
          'status',
        ],
        where: { isDeleted: 0 },
        include: [
          {
            model: this.userModel,
            attributes: ['id', 'firstName', 'lastName'],
            where: { role: 'Employee', isDeleted: 0 },
          },
          {
            model: this.resourceModel,
            attributes: ['id', 'resourceName', 'resourceNo'],
          },
          {
            model: this.supportIssuesModel,
            attributes: ['id', 'issue'],
            where: { isDeleted: 0 },
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} list support data of employee.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (supportEmployeeData && supportEmployeeData.length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        supportEmployeeData,
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

  async updateSupportStatus(dto: UpdateSupportStatus) {
    let error = null;

    const updateStatus: any = await this.supportModel
      .update(
        { ...dto },
        {
          where: {
            userId: dto.userId,
            resourceId: dto.resourceId,
          },
        },
      )
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} update support status.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    const [dataValues] = updateStatus;
    if (dataValues === 1) {
      return HandleResponse(
        HttpStatus.OK,
        `Update support status ${Messages.UPDATE_SUCCESS}`,
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
  }

  async countOfMultipleSupportData() {
    let error = null;

    const openTicketData: any = await this.supportModel
      .count({
        where: {
          status: 'Pending',
        },
      })
      .catch((err: any) => {
        error = err;
      });

    const openTicketOfCurrentMonthData: any = await this.supportModel
      .count({
        where: {
          status: 'Pending',
          createdAt: {
            [Op.between]: [
              Moment().startOf('month').format('YYYY-MM-DD'),
              Moment().endOf('month').format('YYYY-MM-DD'),
            ],
          },
        },
      })
      .catch((err: any) => {
        error = err;
      });

    const closeTicketData: any = await this.supportModel
      .count({
        where: {
          status: 'Completed',
        },
      })
      .catch((err: any) => {
        error = err;
      });

    const closeTicketOfCurrentMonthData: any = await this.supportModel
      .count({
        where: {
          status: 'Completed',
          createdAt: {
            [Op.between]: [
              Moment().startOf('month').format('YYYY-MM-DD'),
              Moment().endOf('month').format('YYYY-MM-DD'),
            ],
          },
        },
      })
      .catch((err: any) => {
        error = err;
      });

    const inProgressTicketData: any = await this.supportModel
      .count({
        where: {
          status: 'On Process',
        },
      })
      .catch((err: any) => {
        error = err;
      });

    const inProgressTicketOfCurrentMonthData: any = await this.supportModel
      .count({
        where: {
          status: 'On Process',
          createdAt: {
            [Op.between]: [
              Moment().startOf('month').format('YYYY-MM-DD'),
              Moment().endOf('month').format('YYYY-MM-DD'),
            ],
          },
        },
      })
      .catch((err: any) => {
        error = err;
      });

    const totalTicketData: any = await this.supportModel
      .count()
      .catch((err: any) => {
        error = err;
      });

    const totalTicketOfCurrentMonthData: any = await this.supportModel
      .count({
        where: {
          createdAt: {
            [Op.between]: [
              Moment().startOf('month').format('YYYY-MM-DD'),
              Moment().endOf('month').format('YYYY-MM-DD'),
            ],
          },
        },
      })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} count data.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }
    const obj = {
      openTicketData,
      openTicketOfCurrentMonthData,
      closeTicketData,
      closeTicketOfCurrentMonthData,
      inProgressTicketData,
      inProgressTicketOfCurrentMonthData,
      totalTicketData,
      totalTicketOfCurrentMonthData,
    };

    return HandleResponse(HttpStatus.OK, undefined, obj, undefined);
  }
}
