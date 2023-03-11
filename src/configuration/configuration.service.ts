import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Configuration } from 'src/models/configuration.model';
import { Resources } from 'src/models/resources.model';
import { HandleResponse } from 'src/services/handleResponse';
import { Messages } from 'src/utils/constants/message';
import { AddConfigurationDto } from './dto/addConfiguration.dto';
import { EditConfigurationDto } from './dto/editConfiguration.dto';
import { ListOfConfigurationDto } from './dto/listOfConfiguration.dto';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectModel(Configuration)
    private configurationModel: typeof Configuration,
    @InjectModel(Resources)
    private resourcesModel: typeof Resources,
  ) {}

  async addConfiguration(dto: AddConfigurationDto) {
    let error = null;

    const configuration: any = await this.configurationModel
      .create({
        ...dto,
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add configuration.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (configuration && Object.keys(configuration).length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        `Configuration ${Messages.ADD_SUCCESS}`,
        undefined,
        undefined,
      );
    }
  }

  async editConfiguration(hrId: number, dto: EditConfigurationDto) {
    let error = null;

    const configuration: any = await this.configurationModel
      .update(
        {
          ...dto,
        },
        {
          where: { id: hrId },
        },
      )
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} edit configuration.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (configuration && Object.keys(configuration).length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        `Configuration ${Messages.UPDATE_SUCCESS}`,
        undefined,
        undefined,
      );
    }
  }

  async listOfConfiguration(dto: ListOfConfigurationDto) {
    let error = null;

    const configuration: any = await this.configurationModel
      .findAll({
        attributes: [
          'id',
          'brand',
          'modelName',
          'serialNo',
          'processor',
          'RAM',
          'storageType',
          'osType',
          'osVersion',
          'graphicsCard',
          'warrantyStartDate',
          'warrantyEndDate',
          'vendor',
          'purchaseDate',
        ],
        where: { ...dto },
        include: [
          {
            model: this.resourcesModel,
            attributes: ['id', 'resourceName', 'resourceNo'],
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} list of configuration.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (configuration && Object.keys(configuration).length > 0) {
      return HandleResponse(HttpStatus.OK, undefined, configuration, undefined);
    }
  }
}
