import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BankDetails } from 'src/models/bankDetails.model';
import { HandleResponse } from 'src/services/handleResponse';
import { Messages } from '../utils/constants/message';

@Injectable()
export class BankDetailsService {
  constructor(
    @InjectModel(BankDetails) private bankDetailsModel: typeof BankDetails,
  ) {}

  async viewBankDetails(id: number) {
    let error = null;

    const findBankDetails = await this.bankDetailsModel
      .findOne({ where: { userId: id, isDeleted: 0 } })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view bank details.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (findBankDetails && Object.keys(findBankDetails).length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        `Bank details ${Messages.GET_SUCCESS}`,
        findBankDetails,
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
