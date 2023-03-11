import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HandleResponse } from '../services/handleResponse';
import { Messages } from 'src/utils/constants/message';
import { Filter } from 'src/services/serviceLayer';
import { ReportDto } from './dto/employeeTimeSheet.dto';
import { RecruitmentDto } from './dto/recruitmentReport.dto';
import { ResourceDto } from './dto/resourceReport.dto';
import { TaskSheet } from 'src/models/taskSheet.model';
import { Users } from 'src/models/users.model';
import { ResourcesDetails } from 'src/models/resourcesDetails.model';
import { Resources } from 'src/models/resources.model';
import { Configuration } from 'src/models/configuration.model';
import { FeedBack } from 'src/models/feedBack.model';
import { Recruitment } from 'src/models/recruitment.model';
import { Designation } from 'src/models/designation.model';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Users) public userModel: typeof Users,
    @InjectModel(TaskSheet) private taskSheetModel: typeof TaskSheet,
    @InjectModel(ResourcesDetails)
    private resourcesDetailsModel: typeof ResourcesDetails,
    @InjectModel(Resources) private resourceModel: typeof Resources,
    @InjectModel(Configuration)
    private configurationModel: typeof Configuration,
    @InjectModel(FeedBack)
    private feedBackModel: typeof FeedBack,
    @InjectModel(Recruitment)
    private recruitmentModel: typeof Recruitment,
    @InjectModel(Designation)
    private designationModel: typeof Designation,
  ) {}

  async employeeTimeSheet(dto: ReportDto) {
    let error = null;
    let result = Filter(
      dto.startDate,
      dto.endDate,
      dto.employeeName,
      dto.status,
      undefined,
      undefined,
      undefined,
    );

    const filteredData = await this.taskSheetModel
      .findAll({
        attributes: [
          'id',
          'date',
          'nameOfTask',
          'detailsOfTask',
          'estimateTime',
          'takenTime',
          'status',
          'isDeleted',
        ],
        where: result.search,
        include: [
          {
            model: this.userModel,
            attributes: ['id', 'firstName', 'lastName', 'lastName'],
            where: result.value,
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view employee time sheet`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (filteredData && filteredData.length > 0) {
      return HandleResponse(HttpStatus.OK, undefined, filteredData, undefined);
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async resourceReport(dto: ResourceDto) {
    let error = null;
    let result = Filter(
      dto.startDate,
      dto.endDate,
      undefined,
      undefined,
      dto.resourceName,
      undefined,
      undefined,
    );

    if (dto.resourceName) {
      result.search.resourceName = result.value.resourceName;
    }

   const filteredData = await this.resourceModel
      .findAll({
        attributes: ['id', 'resourceName', 'amount', 'paidBy', 'isDeleted'],
        where: result.search,
        include: [
          {
            model: this.configurationModel,
            attributes: [
              'id',
              'brand',
              'purchaseDate',
              'warrantyEndDate',
              'isDeleted',
            ],
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view resource report.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (filteredData && filteredData.length > 0) {
      return HandleResponse(HttpStatus.OK, undefined, filteredData, undefined);
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async resourceAllocatedReport(dto: ResourceDto) {
    let error = null;
    let result = Filter(
      dto.startDate,
      dto.endDate,
      undefined,
      undefined,
      dto.resourceName,
      undefined,
      undefined,
    );

    const filteredData = await this.resourcesDetailsModel
      .findAll({
        attributes: [
          'id',
          'resourceId',
          'assignTo',
          'status',
          'createdAt',
          'isDeleted',
          'isDeleted',
        ],
        where: result.search,
        include: [
          {
            model: this.userModel,
            attributes: ['id', 'firstName', 'lastName'],
          },
          {
            model: this.resourceModel,
            attributes: ['id', 'resourceName'],
            where: result.value,
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view resource allocated report.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (filteredData && filteredData.length > 0) {
      return HandleResponse(HttpStatus.OK, undefined, filteredData, undefined);
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async recruitmentReport(dto: RecruitmentDto) {
    let error = null;
    let result = Filter(
      dto.startDate,
      dto.endDate,
      undefined,
      undefined,
      undefined,
      dto.technologyName,
      dto.status,
    );

    const filteredData = await this.feedBackModel
      .findAll({
        attributes: ['id', 'review', 'status', 'isDeleted'],
        where: { isDeleted: 0, status: 'HR' },
        include: [
          {
            model: this.recruitmentModel,
            attributes: [
              'id',
              'candidateName',
              'dateOfInterview',
              'status',
              'isDeleted',
            ],
            where: result.search,
            include: [
              {
                model: this.designationModel,
                attributes: ['id', 'designation', 'isDeleted'],
                where: result.value,
              },
            ],
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view recruitment report.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (filteredData && filteredData.length > 0) {
      return HandleResponse(HttpStatus.OK, undefined, filteredData, undefined);
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async damageResourceReport(dto: ResourceDto) {
    let error = null;
    let result = Filter(
      dto.startDate,
      dto.endDate,
      undefined,
      undefined,
      dto.resourceName,
      undefined,
      undefined,
    );

    result.search.status = 'Damaged';
    const filteredData = await this.resourcesDetailsModel
      .findAll({
        attributes: [
          'id',
          'resourceId',
          'reason',
          'status',
          'isDeleted',
          'isDeleted',
        ],
        where: result.search,
        include: [
          {
            model: this.resourceModel,
            attributes: ['id', 'resourceName', 'resourceNo', 'isDeleted'],
            where: result.value,
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view damage resource report.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (filteredData && filteredData.length > 0) {
      return HandleResponse(HttpStatus.OK, undefined, filteredData, undefined);
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }
};
