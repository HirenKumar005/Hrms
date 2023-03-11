import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Resources } from 'src/models/resources.model';
import { HandleResponse } from 'src/services/handleResponse';
import { CountOfDataDto } from './dto/countOfData.dto';
import { Messages } from '../utils/constants/message';
import { Users } from 'src/models/users.model';
import { Support } from 'src/models/support.model';
import { LeaveUser } from 'src/models/leaveUser.model';

@Injectable()
export class CountOfDataService {
  constructor(
    @InjectModel(Resources) private resourcesModel: typeof Resources,
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(Support) private supportModel: typeof Support,
    @InjectModel(LeaveUser) private leaveUserModel: typeof LeaveUser,
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
}
