import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Support } from 'src/models/support.model';
import { HandleResponse } from 'src/services/handleResponse';
import { AddSupport } from './dto/addSupport.dto';
import { Messages } from 'src/utils/constants/message';
import { Users } from 'src/models/users.model';
import { Resources } from 'src/models/resources.model';

@Injectable()
export class SupportService {
  constructor(
    @InjectModel(Support) private supportModel: typeof Support,
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(Resources) private resourceModel: typeof Resources,
  ) {}

  async addSupport(dto: AddSupport) {
    let error = null;

    const addSupportData: any = await this.supportModel
      .create({ ...dto })
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

  async viewSupport(id:number) {
    let error = null;
    
    const supportHRData: any = await this.supportModel
      .findAll({
        where: { userId: id, isDeleted: 0 },
        include: [
          {
            model: this.resourceModel,
            required: true,
          },
        ],
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
      let finalSupportData = [];
      supportHRData.map((dataSupport: any) => {
        finalSupportData.push({
          id: dataSupport.id,
          ResourceName: dataSupport.resource.resourceName,
          reason: dataSupport.reason,
          dateOfRequest: dataSupport.dateOfRequest,
          status: dataSupport.status,
        });
      });
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        finalSupportData,
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

  async listSupportDataOfEmployee() {
    let error = null;

    const supportEmployeeData: any = await this.supportModel
      .findAll({
        where: { isDeleted: 0 },
        include: [
          {
            model: this.userModel,
            where: { role: 'Employee', isDeleted: 0 },
            required: true,
          },
          {
            model: this.resourceModel,
            required: true,
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

    let finalSupportData = [];
    if (supportEmployeeData && supportEmployeeData.length > 0) {
      supportEmployeeData.map((supportData: any) => {
        finalSupportData.push({
          id: supportData.id,
          userName: supportData.user.firstName,
          ResourceName: supportData.resource.resourceName,
          reason: supportData.reason,
          dateOfRequest: supportData.dateOfRequest,
          status: supportData.status,
        });
      });
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        finalSupportData,
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
