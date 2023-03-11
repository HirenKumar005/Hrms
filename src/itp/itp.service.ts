import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from 'src/models/course.model';
import { IdValidationDto } from './dto/findCourse.dto';
import { HandleResponse } from '../services/handleResponse';
import { Messages } from 'src/utils/constants/message';
import { TopicDto } from './dto/addTopic.dto';
import { Topic } from 'src/models/topic.model';
import { UpdateTopicDto } from './dto/updateTopic.dto';
import { DeleteTopic } from './dto/deleteTopic.dto';
import { DeleteCourse } from './dto/deleteCourse.dto';
@Injectable()
export class ItpService {
  constructor(
    @InjectModel(Course) private courseModel: typeof Course,
    @InjectModel(Topic) private topicModel: typeof Topic,
  ) {}

  async addCourse(dto: TopicDto) {
    let error = null;

    let courseAdd: any = {
      userId: dto.userId,
      courseName: dto.courseName,
    };

    const course: any = await this.courseModel
      .create(courseAdd)
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add topic`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (course && Object.keys(course).length > 0) {
      const detailsOfCourse: any = await this.courseModel
        .findOne({
          where: { id: course.dataValues.id },
        })
        .catch((err) => {
          error = err;
        });

      let values = dto.topic.map((item: any) => {
        let result = {
          courseId: course.dataValues.id,
          topicName: item.topicName,
          link: item.link,
          hour: item.hour,
        };
        return result;
      });

      const topic: any = await this.topicModel
        .bulkCreate(values)
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} add topic`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }

      if (topic && Object.keys(topic).length > 0) {
        let updateDuration = (data: any, data2: any[]) => {
          let total = data;
          for (let item in data2) {
            total += data2[item];
          }
          return total;
        };

        let hour: any = dto.topic.map((item) => item.hour);

        const updateOfCourseDuration: any = await this.courseModel
          .update(
            {
              duration: updateDuration(
                detailsOfCourse.dataValues.duration,
                hour,
              ),
            },
            {
              where: { id: course.dataValues.id },
            },
          )
          .catch((err) => {
            error = err;
          });

        if (error) {
          return HandleResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            `${Messages.FAILED_TO} update duration`,
            undefined,
            {
              errorMessage: error.original.sqlMessage,
              field: error.fields,
            },
          );
        }

        const [dataValue] = updateOfCourseDuration;

        if (dataValue === 1) {
          return HandleResponse(
            HttpStatus.OK,
            `Topic ${Messages.ADD_SUCCESS}`,
            undefined,
            undefined,
          );
        } else {
          return HandleResponse(
            HttpStatus.NOT_FOUND,
            `Duration is ${Messages.UPDATE_FAILED}`,
            undefined,
            undefined,
          );
        }
      } else {
        await this.courseModel
          .destroy({ where: { id: course.dataValues.id } })
          .catch((err) => {
            error = err;
          });

        if (error) {
          this.topicModel.destroy({
            where: { id: topic.dataValues.id },
          });
          return HandleResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            `${Messages.FAILED_TO} update duration`,
            undefined,
            {
              errorMessage: error.original.sqlMessage,
              field: error.fields,
            },
          );
        }
        return HandleResponse(
          HttpStatus.NOT_FOUND,
          `Topic ${Messages.NOT_FOUND}`,
          undefined,
          undefined,
        );
      }
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        `Course ${Messages.NOT_FOUND}`,
        undefined,
        undefined,
      );
    }
  }

  async updateTopic(dto: UpdateTopicDto) {
    let error = null;

    const detailsOfCourse: any = await this.courseModel
      .findOne({
        where: { id: dto.courseId },
      })
      .catch((err) => {
        error = err;
      });

    if (dto.courseId && dto.courseName) {
      await this.courseModel
        .update(
          { courseName: dto.courseName },
          {
            where: { id: dto.courseId },
          },
        )
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} update topic`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }
    }

    let findOfTopic: any = [];
    let topic: any;
    let updateOfTopic: any;

    if (dto.topic.length > 0) {
      if (dto.topic[0].id) {
        for (let item of dto.topic) {
          findOfTopic.push(
            await this.topicModel.findOne({
              where: { id: item.id },
            }),
          );

          updateOfTopic = await this.topicModel
            .update(item, { where: { id: item.id } })
            .catch((err) => {
              error = err;
            });

          if (error) {
            return HandleResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              `${Messages.FAILED_TO} update topic`,
              undefined,
              {
                errorMessage: error.original.sqlMessage,
                field: error.fields,
              },
            );
          }
        }
      } else {
        let values = dto.topic.map((item: any) => {
          return {
            courseId: dto.courseId,
            topicName: item.topicName,
            link: item.link,
            hour: item.hour,
          };
        });

        topic = await this.topicModel.bulkCreate(values).catch((err) => {
          error = err;
        });

        if (error) {
          return HandleResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            `${Messages.FAILED_TO} add topic`,
            undefined,
            {
              errorMessage: error.original.sqlMessage,
              field: error.fields,
            },
          );
        }
      }
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        `Topic ${Messages.NOT_FOUND}`,
        undefined,
        undefined,
      );
    }

    if ((topic && Object.keys(topic).length > 0) || updateOfTopic[0] === 1) {
      let updateDuration = (data: any, data2: any[]) => {
        let total = data;
        for (let item in data2) {
          total += data2[item];
        }
        return total;
      };

      let hour: any;
      let updateOfDuration: number = 0;

      if (!dto.topic[0].id) {
        hour = dto.topic.map((item) => item.hour);
      } else {
        let result: number = 0;
        for (let item of findOfTopic) {
          result = result + item.dataValues.hour;
        }
        updateOfDuration = detailsOfCourse.dataValues.duration - result;
        hour = dto.topic.map((item) => item.hour);
      }

      let condition = !dto.topic[0].id
        ? detailsOfCourse.dataValues.duration
        : updateOfDuration;

      const updateOfCourseDuration: any = await this.courseModel
        .update(
          {
            duration: updateDuration(condition, hour),
          },
          {
            where: { id: dto.courseId },
          },
        )
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} update duration`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }

      const [dataValue] = updateOfCourseDuration;

      if (dataValue === 1) {
        return HandleResponse(
          HttpStatus.OK,
          `Topic ${Messages.UPDATE_SUCCESS}`,
          undefined,
          undefined,
        );
      } else {
        return HandleResponse(
          HttpStatus.NOT_FOUND,
          `Duration is ${Messages.UPDATE_FAILED}`,
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

  async updateCourse(dto: DeleteCourse) {
    let error = null;

    const course: any = await this.courseModel
      .update(dto, {
        where: { id: dto.id },
      })
      .catch((err) => {
        error = err;
      });

    if (dto.isDeleted) {
      await this.topicModel
        .update(
          { isDeleted: dto.isDeleted },
          {
            where: { courseId: dto.id },
          },
        )
        .catch((err) => {
          error = err;
        });
    }

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} update course`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    const [dataValue] = course;

    if (dataValue === 1) {
      return HandleResponse(
        HttpStatus.OK,
        `Course is ${Messages.UPDATE_SUCCESS}`,
        undefined,
        undefined,
      );
    } else {
      return HandleResponse(
        HttpStatus.OK,
        Messages.ID_NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }

  async deleteTopic(dto: DeleteTopic) {
    let error = null;

    const detailsOfCourse: any = await this.courseModel
      .findOne({
        where: { id: dto.courseId },
      })
      .catch((err) => {
        error = err;
      });

    let findOfTopic: any = [];
    let updateOfTopic: any;

    for (let item of dto.topic) {
      findOfTopic.push(
        await this.topicModel.findOne({
          where: { id: item.id },
        }),
      );

      updateOfTopic = await this.topicModel
        .update(item, { where: { id: item.id } })
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} update topic`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }
    }

    if (updateOfTopic[0] === 1) {
      let result: number = 0;
      for (let item of findOfTopic) {
        result = result + item.dataValues.hour;
      }

      let updateOfDuration: number =
        detailsOfCourse.dataValues.duration - result;

      const updateOfCourseDuration: any = await this.courseModel
        .update(
          {
            duration: updateOfDuration,
          },
          {
            where: { id: dto.courseId },
          },
        )
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} update duration`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }

      const [dataValue] = updateOfCourseDuration;

      if (dataValue === 1) {
        return HandleResponse(
          HttpStatus.OK,
          `Topic ${Messages.DELETE_SUCCESS}`,
          undefined,
          undefined,
        );
      } else {
        return HandleResponse(
          HttpStatus.NOT_FOUND,
          `Duration is ${Messages.UPDATE_FAILED}`,
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

  async findTopic(dto: IdValidationDto) {
    let error = null;
    const topicData: any = await this.topicModel
      .findAll({
        attributes: ['id', 'topicName', 'link', 'hour', 'isDeleted'],
        where: dto.id ? { id: dto.id, isDeleted: 0 } : { isDeleted: 0 },
        include: [
          {
            model: this.courseModel,
            attributes: ['id', 'courseName', 'userId', 'duration', 'isDeleted'],
            where: dto.courseId
              ? { id: dto.courseId, isDeleted: 0 }
              : dto.userId
              ? { userId: dto.userId, isDeleted: 0 }
              : { isDeleted: 0 },
          },
        ],
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} find course`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (topicData && topicData.length > 0) {
      return HandleResponse(HttpStatus.OK, undefined, topicData, undefined);
    } else {
      return HandleResponse(
        HttpStatus.OK,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }
}
