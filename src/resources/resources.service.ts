import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DamagedResources } from 'src/models/damagedResources.model';
import { Resources } from 'src/models/resources.model';
import { ResourcesDetails } from 'src/models/resourcesDetails.model';
import { HandleResponse } from 'src/services/handleResponse';
import { Messages } from 'src/utils/constants/message';
import { AddResources } from './dto/addResources.dto';
import { DamagedResourcesDto } from './dto/damagedResources.dto';
import { FindAllocateDevice } from './dto/findAllocate.dto';
import { ResourcesAllocation } from './dto/resourcesAllocation.dto';
import { Users } from 'src/models/users.model';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel(Resources) private resourcesModel: typeof Resources,
    @InjectModel(ResourcesDetails)
    private resourcesDetailsModel: typeof ResourcesDetails,
    @InjectModel(Users)
    private userModel: typeof Users,
    @InjectModel(DamagedResources)
    private damagedResourcesModel: typeof DamagedResources,
  ) {}

  async addResources(dto: AddResources) {
    let error = null;

    const addResourcesData = await this.resourcesModel
      .create({ ...dto })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add resources.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (addResourcesData && Object.keys(addResourcesData).length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        `Resource ${Messages.ADD_SUCCESS}`,
        undefined,
        undefined,
      );
    }
  }

  async resourcesAllocation(dto: ResourcesAllocation) {
    let error = null;

    const findAllocate = await this.resourcesDetailsModel
      .findOne({
        where: {
          resourceId: dto.resourceId,
          assignTo: dto.assignTo,
          status: dto.status,
        },
      })
      .catch((err) => {
        error = err;
      });

    if (findAllocate && Object.keys(findAllocate).length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        Messages.ALREADY_EXIST,
        undefined,
        undefined,
      );
    }

    const resourcesAllocationData = await this.resourcesDetailsModel
      .create({ ...dto })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add resources allocation.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (
      resourcesAllocationData &&
      Object.keys(resourcesAllocationData).length > 0
    ) {
      if (dto.status === 'Reallocation') {
        const data = await this.resourcesDetailsModel
          .update(
            { status: 'Release' },
            { where: { resourceId: dto.resourceId, status: 'Allocation' } },
          )
          .catch((err) => {
            error = err;
          });

        if (error) {
          return HandleResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            `${Messages.FAILED_TO} add resources allocation.`,
            undefined,
            {
              errorMessage: error.original.sqlMessage,
              field: error.fields,
            },
          );
        }

        return HandleResponse(
          HttpStatus.OK,
          `Resources reallocation ${Messages.ADD_SUCCESS}`,
          undefined,
          undefined,
        );
      }
      if (dto.status === 'Allocation') {
        return HandleResponse(
          HttpStatus.OK,
          `Resources allocation ${Messages.ADD_SUCCESS}`,
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
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async findDevices(dto: FindAllocateDevice) {
    let error = null;
    const resourcesAllocationData = await this.resourcesModel
      .findAll({
        attributes: ['id', 'resourceName', 'resourceNo', 'isDeleted'],
        where: { isDeleted: 0, resourceName: dto.resourceName },
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add resources allocation.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (resourcesAllocationData && resourcesAllocationData.length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        resourcesAllocationData,
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

  async listOfResources(id: number) {
    let error = null;

    const resourcesData = await this.resourcesDetailsModel
      .findAll({
        attributes: ['reason', 'status'],
        where: { assignTo: id },
        include: [
          {
            model: this.resourcesModel,
            attributes: ['resourceName', 'resourceNo'],
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} list resources.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (resourcesData && Object.keys(resourcesData).length > 0) {
      return HandleResponse(HttpStatus.OK, undefined, resourcesData, undefined);
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async damagedResources(dto: DamagedResourcesDto) {
    let error = null;

    const resourceDetails: any = await this.resourcesModel
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
      const resourceDetailsData = await this.resourcesDetailsModel
        .findOne({
          where: {
            resourceId: resourceDetails.id,
          },
          order: [['createdAt', 'DESC']],
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

      if (resourceDetailsData && Object.keys(resourceDetailsData).length > 0) {
        let damageData = {
          resourceId: resourceDetails.id,
          assignTo: resourceDetailsData.assignTo,
          addedBy: dto.addedBy,
          reason: dto.reason,
          status: 'Damaged',
        };

        const addDamageData: any = await this.damagedResourcesModel
          .create({ ...damageData })
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

        if (addDamageData && Object.keys(addDamageData).length > 0) {
          const updateResourcesDetails: any = await this.resourcesDetailsModel
            .update(
              { isDeleted: 1 },
              {
                where: {
                  resourceId: resourceDetails.id,
                },
              },
            )
            .catch((err) => {
              error = err;
            });

          const updateResourcesData: any = await this.resourcesModel
            .update(
              { isDeleted: 1 },
              {
                where: {
                  id: resourceDetails.id,
                },
              },
            )
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

          const [resourcesDetails] = updateResourcesDetails;
          const [updateResources] = updateResourcesData;

          if (resourcesDetails != 0 && updateResources === 1) {
            return HandleResponse(
              HttpStatus.OK,
              `Damaged resource ${Messages.ADD_SUCCESS}`,
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
      } else {
        return HandleResponse(
          HttpStatus.NOT_FOUND,
          Messages.NOT_FOUND,
          undefined,
          undefined,
        );
      }
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async listOfDamagedResources() {
    let error = null;

    const damagedData: any = await this.damagedResourcesModel
      .findAll({
        where: { isDeleted: 0 },
        attributes: ['reason'],
        include: [
          {
            model: this.resourcesModel,
            where: { isDeleted: 0 },
            attributes: ['resourceName', 'resourceNo'],
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} list of damage resources.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (damagedData && damagedData.length > 0) {
      return HandleResponse(HttpStatus.OK, undefined, damagedData, undefined);
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async listOfAllocation() {
    let error = null;

    const resourcesData = await this.resourcesDetailsModel
      .findAll({
        attributes: ['id', 'status'],
        where: { status: 'Allocation', isDeleted: 0 },
        include: [
          {
            model: this.userModel,
            attributes: ['id', 'firstName', 'lastName'],
          },
          {
            model: this.resourcesModel,
            attributes: ['resourceName', 'resourceNo'],
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} list of allocation.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (resourcesData && resourcesData.length > 0) {
      return HandleResponse(HttpStatus.OK, undefined, resourcesData, undefined);
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async listOfReallocation() {
    let error = null;

    const resourcesData: any = await this.resourcesDetailsModel
      .findAll({
        where: { status: 'Reallocation', isDeleted: 0 },
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} list of reallocation..`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (resourcesData && resourcesData.length > 0) {
      let result: any = [];
      for (let item of resourcesData) {
        const resourcesData1: any = await this.resourcesDetailsModel
          .findOne({
            where: {
              resourceId: item.dataValues.resourceId,
              status: 'Release',
              isDeleted: 0,
            },
          })
          .catch((err) => {
            error = err;
          });

        const actualUser: any = await this.userModel
          .findOne({
            attributes: ['id', 'firstName', 'lastName'],
            where: { id: resourcesData1.dataValues.assignTo },
          })
          .catch((err) => {
            error = err;
          });

        const exchangeUser: any = await this.userModel
          .findOne({
            attributes: ['id', 'firstName', 'lastName'],
            where: { id: item.dataValues.assignTo },
          })
          .catch((err) => {
            error = err;
          });

        const resourceDetails: any = await this.resourcesModel.findOne({
          attributes: ['id', 'resourceName', 'resourceNo'],
          where: { id: item.dataValues.resourceId, isDeleted: 0 },
        });

        if (error) {
          return HandleResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            `${Messages.FAILED_TO} list resources.`,
            undefined,
            {
              errorMessage: error.original.sqlMessage,
              field: error.fields,
            },
          );
        }
        result.push({
          resourceId: item.dataValues.resourceId,
          resourceName: resourceDetails.dataValues.resourceName,
          resourceNo: resourceDetails.dataValues.resourceName,
          employeeName: actualUser.dataValues.firstName,
          exchangeEmployeeName: exchangeUser.dataValues.firstName,
        });
      }
      return HandleResponse(HttpStatus.OK, undefined, result, undefined);
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
