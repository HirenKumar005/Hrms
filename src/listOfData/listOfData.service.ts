import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/models/users.model';
import { HandleResponse } from '../services/handleResponse';
import { Admin } from 'src/models/admin.model';
import { Messages } from 'src/utils/constants/message';
import { Designation } from 'src/models/designation.model';
import { City } from 'src/models/city.model';
import { Country } from 'src/models/country.model';
import { State } from 'src/models/state.model';
import { ListOfDataDto } from './dto/listOfData.dto';
import { Resources } from 'src/models/resources.model';
import { Qualification } from 'src/models/qualification.model';
import { Support } from 'src/models/support.model';
import { ResourcesDetails } from 'src/models/resourcesDetails.model';
const salt = 10;

@Injectable()
export class ListOfDataService {
  constructor(
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(Admin) private adminModel: typeof Admin,
    @InjectModel(Designation) private designationModel: typeof Designation,
    @InjectModel(City) private cityModel: typeof City,
    @InjectModel(State) private stateModel: typeof State,
    @InjectModel(Country) private countryModel: typeof Country,
    @InjectModel(Resources) private resourcesModel: typeof Resources,
    @InjectModel(Qualification)
    private qualificationModel: typeof Qualification,
    @InjectModel(Support) private supportModel: Support,
    @InjectModel(ResourcesDetails) private resourcesDetailsModel: ResourcesDetails,
  ) {}

  async listOfData(dto: ListOfDataDto) {
    let error = null;

    const findAllData: any = await this[dto.modelName]
      .findAll({
        attributes: dto.selectionCriteria,
        where: dto.condition === undefined ? {} : dto.condition,
      })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} list data.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (findAllData && findAllData.length > 0) {
      return HandleResponse(HttpStatus.OK, undefined, findAllData, undefined);
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
