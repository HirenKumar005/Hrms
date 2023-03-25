import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from 'src/models/address.model';
import { City } from 'src/models/city.model';
import { Country } from 'src/models/country.model';
import { State } from 'src/models/state.model';
import { Users } from 'src/models/users.model';
import { HandleResponse } from 'src/services/handleResponse';
import { Messages } from 'src/utils/constants/message';
import { EditProfileDto } from './dto/editProfile.dto';
import { Designation } from 'src/models/designation.model';
import { EducationDetails } from 'src/models/educationDetails.model';
import { EmergencyContact } from 'src/models/emergencyContact.model';
import { Position } from 'src/models/position.model';
import { Qualification } from 'src/models/qualification.model';
import { BankDetails } from 'src/models/bankDetails.model';
import { ReportTo } from 'src/models/reportTo.model';

@Injectable()
export class HrProfileService {
  constructor(
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(Address) private addressModel: typeof Address,
    @InjectModel(City) private cityModel: typeof City,
    @InjectModel(State) private stateModel: typeof State,
    @InjectModel(Country) private countryModel: typeof Country,
    @InjectModel(Designation) private designationModel: typeof Designation,
    @InjectModel(Position) private positionModel: typeof Position,
    @InjectModel(BankDetails) private bankDetailsModel: typeof BankDetails,
    @InjectModel(EducationDetails)
    private educationDetailsModel: typeof EducationDetails,
    @InjectModel(EmergencyContact)
    private emergencyContactModel: typeof EmergencyContact,
    @InjectModel(Qualification)
    private qualificationModel: typeof Qualification,
    @InjectModel(ReportTo)
    private reportToModel: typeof ReportTo,
  ) {}

  async viewProfile(id: number) {
    let error = null;

    let findDetails: any = await this.userModel
      .findOne({
        attributes: [
          'id',
          'firstName',
          'lastName',
          'email',
          'phoneNo',
          'dob',
          'maritalStatus',
          'role',
          'gender',
          'religion',
          'nationality',
          'dateOfJoin',
          'profileImage',
          'skypeId',
          'personalEmail',
        ],
        where: {
          id,
          isDeleted: 0,
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
          {
            model: this.addressModel,
            attributes: ['id', 'addressLine1', 'addressLine2'],
            include: [
              {
                model: this.cityModel,
                attributes: ['id', 'cityName'],
              },
              {
                model: this.stateModel,
                attributes: ['id', 'stateName'],
              },
              {
                model: this.countryModel,
                attributes: ['id', 'countryName'],
              },
            ],
          },
          {
            model: this.bankDetailsModel,
            attributes: [
              'id',
              'bankName',
              'bankAccountNo',
              'accountHolderName',
              'ifscCode',
            ],
          },
          {
            model: this.educationDetailsModel,
            attributes: [
              'id',
              'fileName',
              'collegeName',
              'passingYear',
              'fileUpload',
            ],
            include: [
              {
                model: this.qualificationModel,
                attributes: ['id', 'qualification'],
              },
            ],
          },
          {
            model: this.emergencyContactModel,
            attributes: [
              'id',
              'primaryName',
              'primaryContactNo',
              'primaryRelation',
              'secondaryName',
              'secondaryContactNo',
              'secondaryRelation',
            ],
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    const findReportToDetails: any = await this.reportToModel
      .findOne({
        where: {
          assignerId: id
        },
        include: [{
          model: this.userModel,
          attributes: ['firstName','lastName']
        }]
      }).catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view your profile.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }
    
    findDetails.dataValues.reportTo = findReportToDetails?.user ? findReportToDetails.user : null;

    if (findDetails && Object.keys(findDetails).length > 0) {
      return HandleResponse(HttpStatus.OK, undefined, findDetails, undefined);
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async editProfile(id: number, dto: EditProfileDto) {
    let error = null;
    let updateAddressDetails = null;
    let updateEmergencyDetails = null;

    const editDetails: any = await this.userModel
      .update(
        { ...dto.user },
        {
          where: {
            id,
          },
        },
      )
      .catch((err) => {
        error = err;
      });

    const addressDetails: any = await this.addressModel
      .findOne({
        where: {
          userId: id,
        },
      })
      .catch((err) => {
        error = err;
      });

    const emergencyDetails: any = await this.emergencyContactModel
      .findOne({
        where: {
          userId: id,
        },
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} edit hr profile.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (addressDetails && emergencyDetails) {
      updateAddressDetails = await this.addressModel
        .update(
          { ...dto.address },
          {
            where: {
              userId: id,
            },
          },
        )
        .catch((err) => {
          error = err;
        });

      updateEmergencyDetails = await this.emergencyContactModel
        .update(
          { ...dto.emergencyContact },
          {
            where: {
              userId: id,
            },
          },
        )
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} update address or emergency contact.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }
    } else {
      updateAddressDetails = await this.addressModel
        .create({ ...dto.address, userId: id })
        .catch((err) => {
          error = err;
        });

      updateEmergencyDetails = await this.emergencyContactModel
        .create({ ...dto.emergencyContact, userId: id })
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} add address or emergency contact.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }
    }

    if (
      editDetails[0] === 1 &&
      ((Object.keys(updateAddressDetails).length > 0 &&
        Object.keys(updateEmergencyDetails).length > 0) ||
        (updateAddressDetails[0] === 1 && updateEmergencyDetails[0] === 1))
    ) {
      return HandleResponse(
        HttpStatus.OK,
        `Your profile ${Messages.UPDATE_SUCCESS}`,
        undefined,
        undefined,
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.ID_NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async editProfileImage(id: number, profileImage: Express.Multer.File) {
    let error = null;

    const editProfileImage: any = await this.userModel
      .update(
        { profileImage: profileImage.filename },
        {
          where: {
            id,
          },
        },
      )
      .catch((err) => {
        error = err;
      });

      if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to add profile image.',
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if ( editProfileImage ) {
      return HandleResponse(
        HttpStatus.OK,
        `Your profile image ${Messages.UPDATE_SUCCESS}`,
        undefined,
        undefined,
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.ID_NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }
}
