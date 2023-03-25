import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recruitment } from 'src/models/recruitment.model';
import { AddRecruitmentDto } from './dto/addRecruitmentDto';
import { HandleResponse } from '../services/handleResponse';
import { Messages } from 'src/utils/constants/message';
import { FeedBack } from 'src/models/feedBack.model';
import { addTechnicalRecruitmentDto } from './dto/addTechnicalRecruitmentDto';
import { EditTechnicalDetailsDto } from './dto/editTechnicalDetailsDto';
import { Users } from 'src/models/users.model';
import { Designation } from 'src/models/designation.model';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectModel(Recruitment) private addRecruitmentModel: typeof Recruitment,
    @InjectModel(FeedBack) private feedbackModel: typeof FeedBack,
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(Designation) private designationModel: typeof Designation,
  ) {}

  async addRecruitment(dto: AddRecruitmentDto, resume: Express.Multer.File) {
    let error = null;

    const addRecruitment: any = await this.addRecruitmentModel
      .create({
        ...dto,
        resume: resume ? resume.filename : null,
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add recruitment details`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }
    if (addRecruitment && Object.keys(addRecruitment).length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        `The Recruitment details ${Messages.ADD_SUCCESS}`,
        undefined,
        undefined,
      );
    } else {
      return HandleResponse(
        HttpStatus.OK,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async addTechnicalRecruitment(
    recruitmentId: number,
    dto: addTechnicalRecruitmentDto,
  ) {
    let error = null;

    const findRecruitmentDetails: any = await this.feedbackModel
      .findAll({
        ...dto,
        where: { recruitmentId: recruitmentId },
      })
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

    if (findRecruitmentDetails && findRecruitmentDetails.length >= 2) {
      return HandleResponse(
        HttpStatus.OK,
        `More than two rounds are added`,
        findRecruitmentDetails,
        undefined,
      );
    } else if (
      findRecruitmentDetails.length >= 0 &&
      findRecruitmentDetails.length < 2
    ) {
      const findTechnicalRoundDetails: any = await this.feedbackModel
        .findAll({
          ...dto,
          where: {
            recruitmentId: recruitmentId,
            status: 'Rejected',
            isDeleted: 1,
          },
        })
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} find technical details.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }
      if (findTechnicalRoundDetails && findTechnicalRoundDetails.length > 0) {
        return HandleResponse(
          HttpStatus.OK,
          `The candidate is already rejected in first round.`,
          findRecruitmentDetails,
          undefined,
        );
      } else {
        const addTechnicalRoundDetails: any = await this.feedbackModel
          .create({
            ...dto,
            recruitmentId: recruitmentId,
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
        if (
          addTechnicalRoundDetails &&
          Object.keys(addTechnicalRoundDetails).length > 0
        ) {
          return HandleResponse(
            HttpStatus.OK,
            `The Technical Round details ${Messages.ADD_SUCCESS}`,
            undefined,
            undefined,
          );
        } else {
          return HandleResponse(
            HttpStatus.OK,
            Messages.NOT_FOUND,
            undefined,
            undefined,
          );
        }
      }
    } else {
      return HandleResponse(
        HttpStatus.OK,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async listOfTechnicalInterviews(userId: number) {
    let error = null;

    const listOfTechnicalInterviewsData: any = await this.feedbackModel
      .findAll({
        attributes: [
          'id',
          'technology',
          'type',
          'dateOfInterview',
          'timeOfInterview',
          'link',
          'status',
        ],
        where: { assineeId: userId, status: 'Pending', isDeleted: 0 },
        include: [
          {
            model: this.addRecruitmentModel,
            attributes: ['candidateName'],
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} list of supports.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (
      listOfTechnicalInterviewsData &&
      listOfTechnicalInterviewsData.length > 0
    ) {
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        listOfTechnicalInterviewsData,
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

  async editTechnicalInterviews(
    recruitmentId: number,
    dto: EditTechnicalDetailsDto,
  ) {
    let error = null;

    const editTechnicalInterviewsDetails: any = await this.feedbackModel
      .update(
        {
          english: dto.english,
          communication: dto.communication,
          confidence: dto.confidence,
          review: dto.review,
          status: dto.status,
          isDeleted: 1,
        },
        {
          where: {
            id: dto.id,
            recruitmentId: recruitmentId,
          },
        },
      )
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} edit technical details.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    const [dataValue] = editTechnicalInterviewsDetails;

    if (dataValue === 1) {
      return HandleResponse(
        HttpStatus.OK,
        `Technical Round details ${Messages.UPDATE_SUCCESS}`,
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

  async listOfRecruitment() {
    let error = null;
    const listOfRecruitmentData: any = await this.addRecruitmentModel
      .findAll({
        attributes: [
          'id',
          'candidateName',
          'dateOfInterview',
          'timeOfInterview',
          'experience',
          'english',
          'communication',
          'confidence',
          'review',
          'status',
        ],
        include: [
          {
            model: this.userModel,
            attributes: ['firstName', 'lastName'],
          },
          {
            model: this.designationModel,
            attributes: ['designation'],
          },
          {
            model: this.feedbackModel,
            include: [
              {
                model: this.userModel,
                attributes: ['firstName', 'lastName'],
              },
            ],
            attributes: [
              'assineeId',
              'technology',
              'type',
              'dateOfInterview',
              'timeOfInterview',
              'link',
              'english',
              'communication',
              'confidence',
              'review',
              'status',
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
        `${Messages.FAILED_TO} list of supports.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }
    if (listOfRecruitmentData && listOfRecruitmentData.length > 0) {
      let listOfRecruitmentWithAverageData = listOfRecruitmentData.map(
        (item) => {
          item.dataValues.averageOfHR =
            (item.english + item.confidence + item.communication) / 3;

          item.feedBack.map((v) => {
            v.dataValues.averageOfAssignee =
              (v.english + v.confidence + v.communication) / 3;
          });
          return item;
        },
      );

      return HandleResponse(
        HttpStatus.OK,
        undefined,
        listOfRecruitmentWithAverageData,
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

  async listOfTechnicalRoundOne() {
    let error = null;

    const listOfTechnicalRoundOneData: any = await this.feedbackModel
      .findAll({
        attributes: [
          'id',
          'technology',
          'type',
          'dateOfInterview',
          'timeOfInterview',
          'link',
          'status',
          'round',
        ],
        where: {
          status: 'Selected',
          round: 'Technical1',
        },
        include: [
          {
            model: this.addRecruitmentModel,
            attributes: ['candidateName'],
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} list of supports.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (listOfTechnicalRoundOneData && listOfTechnicalRoundOneData.length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        listOfTechnicalRoundOneData,
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
