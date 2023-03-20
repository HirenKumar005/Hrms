import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CountOfDataService } from 'src/countOfData/countOfData.service';
import { DamagedResources } from 'src/models/damagedResources.model';
import { Designation } from 'src/models/designation.model';
import { LeaveUser } from 'src/models/leaveUser.model';
import { ReportTo } from 'src/models/reportTo.model';
import { ResourcesDetails } from 'src/models/resourcesDetails.model';
import { Support } from 'src/models/support.model';
import { Users } from 'src/models/users.model';
import { HandleResponse } from 'src/services/handleResponse';
import { Messages } from 'src/utils/constants/message';
import { ListOfSupportsDto } from './dto/listOfSupports.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Users) private userModel: typeof Users,
    private countOfDataService: CountOfDataService,
    @InjectModel(Designation) private designationModel: typeof Designation,
    @InjectModel(ReportTo) private reportToModel: typeof ReportTo,
    @InjectModel(Support) private supportModel: typeof Support,
    @InjectModel(LeaveUser) private addLeaveModel: typeof LeaveUser,
    @InjectModel(ResourcesDetails)
    private resourcesDetailsModel: ResourcesDetails,
    @InjectModel(DamagedResources)
    private DamagedResourcesModel: DamagedResources,
  ) {}

  async pieChart() {
    let error = null;

    const totalUserData = await this.countOfDataService
      .countOfData({ modelName: 'userModel', condition: { role: 'Employee' } })
      .catch((err: any) => {
        error = err;
      });

    const activeUserData = await this.countOfDataService
      .countOfData({
        modelName: 'userModel',
        condition: { role: 'Employee', isDeleted: 0 },
      })
      .catch((err: any) => {
        error = err;
      });

    const inactiveUserData = await this.countOfDataService
      .countOfData({
        modelName: 'userModel',
        condition: { role: 'Employee', isDeleted: 1 },
      })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} pie chart.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (totalUserData && activeUserData && inactiveUserData) {
      let countData = {
        activeUser: (activeUserData.data / totalUserData.data) * 100,
        inactiveUserData: (inactiveUserData.data / totalUserData.data) * 100,
      };

      return HandleResponse(HttpStatus.OK, undefined, countData, undefined);
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async recentlyRegistration() {
    let error = null;

    const recentlyData = await this.userModel
      .findAll({
        include: [
          {
            model: this.designationModel,
            attributes: ['id', 'designation'],
          },
          {
            model: this.reportToModel,
            include: [
              {
                model: this.userModel,
              },
            ],
          },
        ],
        order: [['createdAt', 'DESC']],
        where: { role: 'Employee', isDeleted: 0 },
      })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} recently registration.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (recentlyData && recentlyData.length > 0) {
      const finalRecentlyData = recentlyData.map((data: any) => {
        const [dataValues] = data.reportTo;
        let assignedSenior: any;
        if (dataValues === undefined) {
          assignedSenior = null;
        } else {
          assignedSenior = dataValues.user.firstName;
        }
        return {
          id: data.id,
          employeeName: data.firstName,
          mobileNo: data.phoneNo,
          email: data.email,
          technology: data.designation.designation,
          assignedSenior,
          DOJ: data.dateOfJoin,
        };
      });
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        finalRecentlyData,
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

  async listOfSupports(dto: ListOfSupportsDto) {
    let error = null;
    let order: any = [dto.order];

    const listOfSupportsData: any = await this.supportModel
      .findAll({
        include: [
          {
            model: this.userModel,
          },
        ],
        order: dto.order ? order : []
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

    if (listOfSupportsData && listOfSupportsData.length > 0) {
      const finalSupportData = listOfSupportsData.map((supportData: any) => {
        return {
          id: supportData.id,
          employeeName: supportData.user.firstName,
          issue: supportData.reason,
          dateOfRequest: supportData.dateOfRequest,
          status: supportData.status,
        };
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
