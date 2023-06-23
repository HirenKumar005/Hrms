import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BankDetails } from 'src/models/bankDetails.model';
import { HandleResponse } from 'src/services/handleResponse';
import { AddBankDetailsDto } from './dto/addBankDetails.dto';
import { EditBankDetailsDto } from './dto/editBankDetails.dto';
import { Messages } from '../utils/constants/message';
import { Users } from 'src/models/users.model';
import { EmergencyContact } from 'src/models/emergencyContact.model';
import { EducationDetails } from 'src/models/educationDetails.model';
import { DeleteEmployeeDto } from './dto/deleteEmployee.dto';
import { Documents } from 'src/models/documents.model';
import { ListOfEmployeeDto } from './dto/listOfEmployee.dto';
import { Designation } from 'src/models/designation.model';
import { Position } from 'src/models/position.model';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(BankDetails) private bankDetailsModel: typeof BankDetails,
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(Documents) private documentsModel: typeof Documents,
    @InjectModel(EmergencyContact)
    private emergencyContact: typeof EmergencyContact,
    @InjectModel(EducationDetails)
    private educationDetails: typeof EducationDetails,
    @InjectModel(Designation)
    private designationModel: typeof Designation,
    @InjectModel(Position)
    private positionModel: typeof Position,
  ) {}

  async addBankDetails(dto: AddBankDetailsDto) {
    let error = null;

    const employee = await this.bankDetailsModel
      .create({ ...dto })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add bank details.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (employee && Object.keys(employee).length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        `Bank details ${Messages.ADD_SUCCESS}`,
        undefined,
        undefined,
      );
    }
  }

  async editBankDetails(dto: EditBankDetailsDto, employeeId: number) {
    let error = null;

    const editDetails: any = await this.bankDetailsModel
      .update({ ...dto }, { where: { userId: employeeId } })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} edit bankDetails.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }
    const [dataValue] = editDetails;

    if (dataValue === 1) {
      return HandleResponse(
        HttpStatus.OK,
        `Bank details ${Messages.UPDATE_SUCCESS}`,
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

  async deleteEmployee(employeeId: number, dto: DeleteEmployeeDto) {
    let error = null;

    const deleteEmployeeData: any = await this.userModel
      .update(dto, {
        where: { id: employeeId },
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} delete employee.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    const [dataValue] = deleteEmployeeData;

    if (dataValue === 1) {
      const deleteEmployeeBankData: any = await this.bankDetailsModel
        .update(dto, {
          where: { userId: employeeId },
        })
        .catch((err) => {
          error = err;
        });
      const deleteEmployeeDocumentsData: any = await this.documentsModel
        .update(dto, {
          where: { userId: employeeId },
        })
        .catch((err) => {
          error = err;
        });
      const deleteEmployeeEmergencyContactData: any =
        await this.emergencyContact
          .update(dto, {
            where: { userId: employeeId },
          })
          .catch((err) => {
            error = err;
          });
      const deleteEmployeeEducationData: any = await this.educationDetails
        .update(dto, {
          where: { userId: employeeId },
        })
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} delete employee.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }

      if (
        deleteEmployeeBankData[0] === 1 &&
        deleteEmployeeDocumentsData[0] === 1 &&
        deleteEmployeeEmergencyContactData[0] === 1 &&
        deleteEmployeeEducationData[0] === 1
      ) {
        return HandleResponse(
          HttpStatus.OK,
          `Employee ${Messages.DELETED_SUCCESS}`,
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

  async listOfEmployee(dto: ListOfEmployeeDto) {
    let error = null;

    const findEmployeeDetails = await this.userModel
      .findAll({
        where: {
          ...dto,
        },
        include: [
          {
            model: this.designationModel,
            attributes: ['id', 'designation'],
          },
          {
            model: this.positionModel,
            attributes: ['id', 'position'],
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view employee details.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (findEmployeeDetails && Object.keys(findEmployeeDetails).length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        findEmployeeDetails,
        undefined,
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        `Education details ${Messages.NOT_FOUND}`,
        undefined,
        undefined,
      );
    }
  }
}
