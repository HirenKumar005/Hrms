import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Documents } from 'src/models/documents.model';
import { HandleResponse } from 'src/services/handleResponse';
import { AddDocument } from './dto/addDocument.dto';
import { Messages } from '../utils/constants/message';
import { DeleteDocument } from './dto/deleteDocument.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Documents) private documentModel: typeof Documents,
  ) {}

  async addDocument(dto: AddDocument, fileUpload: Express.Multer.File) {
    let error = null;

    const addDocumentsData = await this.documentModel
      .create({ ...dto, fileUpload: fileUpload.filename })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add document.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (addDocumentsData && Object.keys(addDocumentsData).length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        `Document ${Messages.ADD_SUCCESS}`,
        undefined,
        undefined,
      );
    }
  }

  async viewDocument(hrId: number) {
    let error = null;

    const findDocuments: any = await this.documentModel
      .findAll({
        where: {
          userId: hrId,
          isDeleted: 0,
        },
        order:[['id','DESC']]
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view document.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (findDocuments && Object.keys(findDocuments).length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        `Document ${Messages.GET_SUCCESS}`,
        findDocuments,
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

  async deleteDocument(dto: DeleteDocument) {
    let error = null;

    const deleteEducationDetails: any = await this.documentModel
      .update(
        { isDeleted: 1 },
        {
          where: {
            userId: dto.id,
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
        `${Messages.FAILED_TO} delete document.`,
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
