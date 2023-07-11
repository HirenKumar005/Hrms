import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/sequelize";
import { HandleResponse } from "src/services/handleResponse";
import { Messages } from "src/utils/constants/message";
import { Project } from "src/models/project.model";
import { AddProjectDto } from "./dto/addProject.dto";
import { ProjectAssignTo } from "src/models/projectAssignTo.model";
import { Sequelize } from "sequelize";
import { ListOfProjectDto } from "./dto/listOfProject.dto";

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project)
    private projectModel: typeof Project,
    @InjectModel(ProjectAssignTo)
    private projectAssignToModel: typeof ProjectAssignTo,
    @InjectConnection() private sequelize: Sequelize
  ) {}

  async addProject(dto: AddProjectDto) {
    let error: any = null;

    let projectDetails: any = {
      addedBy: dto.addedBy,
      projectName: dto.projectName,
      description: dto.description,
      duration: dto.duration,
      technologies: dto.technologies,
    };

    const transaction = await this.sequelize.transaction();

    const addProjectDetails: any = await this.projectModel
      .create(projectDetails, { transaction: transaction })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add project details.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        }
      );
    }

    if (addProjectDetails && Object.keys(addProjectDetails).length > 0) {
      let projectAssignDetails: any = dto.assignTo.map((item: any) => {
        return {
          assignTo: item,
          projectId: addProjectDetails.id,
        };
      });

      await this.projectAssignToModel
        .bulkCreate(projectAssignDetails, {
          transaction,
        })
        .catch(async (err) => {
          await transaction.rollback();
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} add project details.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          }
        );
      }

      await transaction.commit();
      if (addProjectDetails && Object.keys(projectAssignDetails).length > 0) {
        return HandleResponse(
          HttpStatus.OK,
          `Project details ${Messages.ADD_SUCCESS}.`,
          { id: addProjectDetails.id },
          undefined
        );
      }
    }
  }

  async listProject(dto: ListOfProjectDto) {
    let error = null;

    const findProjectDetails: any = await this.projectModel
      .findAll({
        where: dto.id ? { id: dto.id } : {},
        include: [
          {
            model: this.projectAssignToModel,
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view project details.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        }
      );
    }

    if (findProjectDetails && findProjectDetails.length > 0) {
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        findProjectDetails,
        undefined
      );
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        Messages.NOT_FOUND,
        undefined,
        undefined
      );
    }
  }
}
