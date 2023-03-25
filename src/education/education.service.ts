import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EducationDetails } from 'src/models/educationDetails.model';
import { Qualification } from 'src/models/qualification.model';
import { HandleResponse } from 'src/services/handleResponse';
import { Messages } from 'src/utils/constants/message';
import { AddEducation } from './dto/addEducation.dto';
import { DeleteEducation } from './dto/DeleteEducation.dto';
import { ViewEducation } from './dto/viewEducation.dto';
import { Documents } from 'src/models/documents.model';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(EducationDetails)
    private educationDetailsModel: typeof EducationDetails,
    @InjectModel(Qualification)
    private qualificationModel: typeof Qualification,
    @InjectModel(Documents)
    private documentsModel: typeof Documents,
  ) {}

  async addEducation(dto: AddEducation, fileUpload: Express.Multer.File) {
    let error = null;

    const addEducationDetails = await this.educationDetailsModel
      .create({ ...dto })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add education details.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (addEducationDetails && Object.keys(addEducationDetails).length > 0) {
      const addDocument = await this.documentsModel
        .create({
          userId: dto.userId,
          fileName: dto.fileName,
          fileUpload: fileUpload.filename,
        })
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} add education details.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }

      if (addDocument && Object.keys(addEducationDetails).length > 0) {
        return HandleResponse(
          HttpStatus.OK,
          `Education details ${Messages.ADD_SUCCESS}.`,
          undefined,
          undefined,
        );
      }
    }
  }

  async viewEducation(dto: ViewEducation) {
    let error = null;

    const findEducationDetails: any = await this.educationDetailsModel
      .findAll({
        where: dto.id ? { id: dto.id, isDeleted: 0 } : { isDeleted: 0 },
        include: [
          {
            model: this.qualificationModel,
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view education details.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    const educationDetails = findEducationDetails.map(
      (educationDetailsData: any) => {
        return {
          id: educationDetailsData.id,
          collegeName: educationDetailsData.collegeName,
          qualification: educationDetailsData.qualification.qualification,
          year: educationDetailsData.passingYear,
          isDeleted: educationDetailsData.isDeleted,
        };
      },
    );

    if (findEducationDetails && findEducationDetails.length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        educationDetails,
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

  async deleteEducation(dto: DeleteEducation) {
    let error = null;

    const deleteEducationDetails: any = await this.educationDetailsModel
      .update(
        { isDeleted: 1 },
        {
          where: {
            userId: dto.hrId,
            fileName: dto.fileName,
          },
        },
      )
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} delete education.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }
    const [dataValues] = deleteEducationDetails;

    if (dataValues === 1) {
      return HandleResponse(
        HttpStatus.OK,
        `Education details ${Messages.DELETE_SUCCESS}`,
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
}
