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
import { AssignCourse } from './dto/assignCourse.dto';
import { UserCourse } from 'src/models/userCourse.model';
import { FindAssignCourse } from './dto/findUserCourseAssign.dto';
import { AssignUserCourse } from 'src/models/assignUserCourse.model';
@Injectable()
export class ItpService {
  constructor(
    @InjectModel(Course) private courseModel: typeof Course,
    @InjectModel(Topic) private topicModel: typeof Topic,
    @InjectModel(UserCourse) private userCourseModel: typeof UserCourse,
    @InjectModel(AssignUserCourse)
    private assignUserCourseModel: typeof AssignUserCourse,
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
    let dataValue: any;

    const detailsOfCourse: any = await this.courseModel
      .findOne({
        where: { id: dto.courseId },
      })
      .catch((err) => {
        error = err;
      });

    if (dto.courseId && dto.courseName) {
      const updateCourse: any = await this.courseModel
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
      [dataValue] = updateCourse;
    }

    let findOfTopic: any = [];
    let topic: any;
    let topicUpdated: any;

    if (dto.topic.length > 0) {
      let item: any;
      for (item of dto.topic) {
        if (item.id) {
          findOfTopic.push(
            await this.topicModel.findOne({
              where: { id: item.id },
            }),
          );

          const updateOfTopic: any = await this.topicModel
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
          [topicUpdated] = updateOfTopic;
        } else {
          item['courseId'] = dto.courseId;
          topic = await this.topicModel.create(item).catch((err) => {
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
      }
    }

    if (
      (topic && Object.keys(topic).length > 0) ||
      dataValue === 1 ||
      topicUpdated === 1
    ) {
      let durationUpdated: any;
      if (dto.topic.length > 0) {
        let result: number = 0;

        for (let item of findOfTopic) {
          result = result + item.dataValues.hour;
        }

        for (let item of dto.topic) {
          let hour: any = [];
          if (!item.id) {
            let updateDuration: any;
            let condition: number;
            hour.push(item.hour);
            condition = detailsOfCourse.dataValues.duration;
            updateDuration = (data: any, data2: any[]) => {
              let total = data;
              for (let item in data2) {
                total += data2[item];
              }
              return total;
            };
            let updateOfCourseDuration: any = await this.courseModel
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
            [durationUpdated] = updateOfCourseDuration;
          } else {
            let condition: number;
            let updateDuration: any;
            let updateOfDuration: number =
              detailsOfCourse.dataValues.duration - result;
            hour.push(item.hour);
            condition = updateOfDuration;
            updateDuration = (data: any, data2: any[]) => {
              let total = data;
              for (let item in data2) {
                total += data2[item];
              }
              return total;
            };
            let updateOfCourseDuration: any = await this.courseModel
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
            [durationUpdated] = updateOfCourseDuration;
          }
        }

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
      }

      if (durationUpdated === 1 || dataValue === 1) {
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
        `Course is ${Messages.DELETED_SUCCESS}`,
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

    const topicData: any = await this.courseModel
      .findAll({
        attributes: ['id', 'courseName', 'userId', 'duration', 'isDeleted'],
        where: dto.courseId
          ? { id: dto.courseId, isDeleted: 0 }
          : dto.userId
          ? { userId: dto.userId, isDeleted: 0 }
          : { isDeleted: 0 },
        include: [
          {
            model: this.topicModel,
            attributes: [
              'id',
              'courseId',
              'topicName',
              'link',
              'hour',
              'isDeleted',
            ],
            where: dto.id ? { id: dto.id, isDeleted: 0 } : { isDeleted: 0 },
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
      for (let item of topicData) {
        let [dataValue] = item.dataValues.topic;
        let noOfTopics = await this.topicModel.count({
          where: { courseId: dataValue.dataValues.courseId },
        });
        item.dataValues.noOfTopics = noOfTopics;
      }
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

  async assignCourse(dto: AssignCourse) {
    let error = null;

    const findUser: any = await this.userCourseModel
      .findOne({
        where: { userId: dto.userId },
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} assign course`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (!findUser) {
      const assignCourseData: any = await this.userCourseModel
        .create({ ...dto })
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} assign course`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }

      if (assignCourseData && Object.keys(assignCourseData).length > 0) {
        let courseData = dto.courseId.map((item: any) => {
          return {
            courseId: item,
            userCourseId: assignCourseData.id,
          };
        });

        const multipleAssignCourse: any = await this.assignUserCourseModel
          .bulkCreate(courseData)
          .catch((err) => {
            error = err;
          });

        if (error) {
          return HandleResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            `${Messages.FAILED_TO} assign course`,
            undefined,
            {
              errorMessage: error.original.sqlMessage,
              field: error.fields,
            },
          );
        }

        if (multipleAssignCourse && multipleAssignCourse.length > 0) {
          return HandleResponse(
            HttpStatus.OK,
            Messages.ASSIGN_COURSE,
            undefined,
            undefined,
          );
        } else {
          await this.userCourseModel
            .destroy({ where: { id: assignCourseData.id } })
            .catch((err) => {
              error = err;
            });
          if (error) {
            return HandleResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              `${Messages.FAILED_TO} assign course`,
              undefined,
              {
                errorMessage: error.original.sqlMessage,
                field: error.fields,
              },
            );
          }
        }
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
        Messages.ALREADY_ADDED,
        undefined,
        undefined,
      );
    }
  }

  async findAssignCourse(dto: FindAssignCourse) {
    let error = null;
    const findAssignCourseData: any = await this.userCourseModel
      .findAll({
        attributes: ['id', 'userId', 'isDeleted'],
        where: dto.userId
          ? { userId: dto.userId, isDeleted: 0 }
          : { isDeleted: 0 },
        include: [
          {
            model: this.assignUserCourseModel,
            attributes: ['id'],
            include: [
              {
                model: this.courseModel,
                attributes: ['id', 'courseName', 'duration', 'isDeleted'],
                where: dto.courseId
                  ? { id: dto.courseId, isDeleted: 0 }
                  : { isDeleted: 0 },
                include: [
                  {
                    model: this.topicModel,
                    attributes: [
                      'id',
                      'courseId',
                      'topicName',
                      'link',
                      'hour',
                      'isDeleted',
                    ],
                  },
                ],
              },
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
        `${Messages.FAILED_TO} find assign course`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (findAssignCourseData && findAssignCourseData.length > 0) {
      for (let item of findAssignCourseData) {
        let obj = item.dataValues.assignUserCourse;
        for (let key of obj) {
          let [dataValue] = key.dataValues.course.dataValues.topic;
          const noOfTopics: any = await this.topicModel.count({
            where: { courseId: dataValue.dataValues.courseId },
          });
          key.dataValues.course.dataValues.noOfTopics = noOfTopics;
        }
      }
      return HandleResponse(
        HttpStatus.OK,
        undefined,
        findAssignCourseData,
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
