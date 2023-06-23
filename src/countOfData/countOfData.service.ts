import { HttpStatus, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import * as Moment from 'moment';
import { InjectModel } from '@nestjs/sequelize';
import { Resources } from 'src/models/resources.model';
import { HandleResponse } from 'src/services/handleResponse';
import { CountOfDataDto } from './dto/countOfData.dto';
import { Messages } from '../utils/constants/message';
import { Users } from 'src/models/users.model';
import { Support } from 'src/models/support.model';
import { LeaveUser } from 'src/models/leaveUser.model';
import { CountOfMultipleCardData } from './dto/countOfMultipleCardData.dto';
import { Recruitment } from 'src/models/recruitment.model';
import { ResourcesDetails } from 'src/models/resourcesDetails.model';
import { DamagedResources } from 'src/models/damagedResources.model';
import { Course } from 'src/models/course.model';
import { FeedBack } from 'src/models/feedBack.model';

@Injectable()
export class CountOfDataService {
  constructor(
    @InjectModel(Resources) private resourcesModel: typeof Resources,
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(Course) private coursesModel: typeof Course,
    @InjectModel(Support) private supportModel: typeof Support,
    @InjectModel(FeedBack) private feedBackModel: typeof FeedBack,
    @InjectModel(LeaveUser) private leaveUserModel: typeof LeaveUser,
    @InjectModel(Recruitment) private recruitmentModel: typeof Recruitment,
    @InjectModel(ResourcesDetails)
    private resourcesDetailsModel: ResourcesDetails,
    @InjectModel(DamagedResources)
    private DamagedResourcesModel: DamagedResources,
  ) {}

  async countOfData(dto: CountOfDataDto) {
    let error = null;

    const countData: any = await this[dto.modelName]
      .count({
        where: dto.condition === undefined ? {} : dto.condition,
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

    if (countData >= 0) {
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

  async countOfMultipleCardData(dto: CountOfMultipleCardData) {
    let error = null;

    const totalUserData: any = await this.userModel
      .count({
        where: {
          ...dto,
        },
      })
      .catch((err: any) => {
        error = err;
      });

    const countActiveUserData: any = await this.userModel
      .count({
        where: {
          ...dto,
          isDeleted: 0,
        },
      })
      .catch((err: any) => {
        error = err;
      });

    const activeEmployeeOfCurrentMonth: any = await this.userModel
      .count({
        where: {
          ...dto,
          isDeleted: 0,
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

    const solvedQueriesData = await this.supportModel
      .count({
        where: { status: 'Completed', isDeleted: 1 },
      })
      .catch((err: any) => {
        error = err;
      });

    const solvedQueriesOfCurrentMonthData = await this.supportModel
      .count({
        where: {
          status: 'Completed',
          isDeleted: 1,
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

    const totalQueriesData = await this.supportModel
      .count()
      .catch((err: any) => {
        error = err;
      });

    const leaveApplicationData = await this.leaveUserModel
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

    const leaveApplicationOfCurrentMonthData = await this.leaveUserModel
      .count({
        where: {
          status: 'Pending',
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
      totalUserData,
      countActiveUserData,
      activeEmployeeOfCurrentMonth,
      solvedQueriesData,
      solvedQueriesOfCurrentMonthData,
      totalQueriesData,
      leaveApplicationData,
      leaveApplicationOfCurrentMonthData,
    };

    return HandleResponse(HttpStatus.OK, undefined, obj, undefined);
  }
}
