import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/models/users.model';
import { AddEmployeeDto } from './dto/addEmployee.dto';
import { HandleResponse } from '../services/handleResponse';
import * as bcrypt from 'bcrypt';
import { AdminLoginDto } from './dto/adminLogin.dto';
import { Admin } from 'src/models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { Messages } from 'src/utils/constants/message';
import { EditAdminDto } from './dto/editAdmin.dto';
import { City } from 'src/models/city.model';
import { Country } from 'src/models/country.model';
import { State } from 'src/models/state.model';
import { Leave } from 'src/models/leave.model';
import { ReportTo } from 'src/models/reportTo.model';
const salt = 10;

@Injectable()
export class AdminProfileService {
  constructor(
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(Admin) private adminModel: typeof Admin,
    @InjectModel(City) private cityModel: typeof City,
    @InjectModel(State) private stateModel: typeof State,
    @InjectModel(Country) private countryModel: typeof Country,
    @InjectModel(Leave) private leaveModel: typeof Leave,
    @InjectModel(ReportTo) private reportToModel: typeof ReportTo,
    private jwt: JwtService,
  ) {}

  async addEmployee(dto: AddEmployeeDto) {
    let error = null;
    const hashPassword = await bcrypt.hash(dto.password, salt);
    delete dto.password;

    const employee: any = await this.userModel
      .create({
        ...dto,
        password: hashPassword,
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} add ${dto.role}.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (employee && Object.keys(employee).length > 0) {
      let addedReportTo : any = null;

      if (dto.reportTo) {
        addedReportTo = await this.reportToModel
          .create({
            assignerId: dto.reportTo,
            assigneeId: employee.id,
          })
          .catch((err) => {
            error = err;
          });
      }
      const employeeLeave: any = await this.leaveModel
        .create({
          addedBy: dto.userId,
          role: dto.addedBy,
          assignTo: employee.id,
        })
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} add leave.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }

      if (
        addedReportTo &&
        Object.keys(addedReportTo).length > 0 ||
        employeeLeave &&
        Object.keys(employeeLeave).length > 0
      ) {
        return HandleResponse(
          HttpStatus.OK,
          `${dto.role} ${Messages.ADD_SUCCESS}`,
          {id: employee.id},
          undefined,
        );
      }
    }
  }

  async login(dto: AdminLoginDto) {
    let error = null;

    const employeeHrLogin: any = await this.userModel
      .findOne({
        where: { email: dto.email, isDeleted: 0 },
      })
      .catch((err: any) => {
        error = err;
      });

    const adminLogin: any = await this.adminModel
      .findOne({
        where: { email: dto.email, isDeleted: 0 },
      })
      .catch((err: any) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} login.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (employeeHrLogin || adminLogin) {
      const comparison = await bcrypt.compare(
        dto.password,
        employeeHrLogin ? employeeHrLogin.password : adminLogin.password,
      );

      const id = employeeHrLogin ? employeeHrLogin.id : adminLogin.id;
      const role = employeeHrLogin ? employeeHrLogin.role : 'Admin';

      if (comparison) {
        const token = await this.jwt.signAsync({
          id,
          role,
        });
        return HandleResponse(
          HttpStatus.OK,
          `${role} ${Messages.LOGIN_SUCCESS}.`,
          { id, token },
          undefined,
        );
      } else {
        return HandleResponse(
          HttpStatus.BAD_REQUEST,
          `Password ${Messages.DOES_NOT_MATCH}.`,
          undefined,
          undefined,
        );
      }
    } else {
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        `This email ${Messages.DOES_NOT_EXIST}.`,
        undefined,
        undefined,
      );
    }
  }

  async viewProfile(adminId: number) {
    let error = null;

    const findAdminDetails: any = await this.adminModel
      .findOne({
        where: {
          id: adminId,
          isDeleted: 0
        },
      })
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} view admin profile.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    if (findAdminDetails && Object.keys(findAdminDetails).length > 0) {
      delete findAdminDetails.dataValues.password;

      const findCity: any = await this.cityModel
        .findOne({
          where: {
            id: findAdminDetails.cityId,
          },
        })
        .catch((err) => {
          error = err;
        });
      const findState: any = await this.stateModel
        .findOne({
          where: {
            id: findAdminDetails.stateId,
          },
        })
        .catch((err) => {
          error = err;
        });
      const findCountry: any = await this.countryModel
        .findOne({
          where: {
            id: findAdminDetails.countryId,
          },
        })
        .catch((err) => {
          error = err;
        });

      if (error) {
        return HandleResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `${Messages.FAILED_TO} view city, state and country.`,
          undefined,
          {
            errorMessage: error.original.sqlMessage,
            field: error.fields,
          },
        );
      }

      findAdminDetails.cityId = findCity.cityName;
      findAdminDetails.stateId = findState.stateName;
      findAdminDetails.countryId = findCountry.countryName;

      return HandleResponse(
        HttpStatus.OK,
        `Admin profile ${Messages.GET_SUCCESS}`,
        findAdminDetails,
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

  async editProfile(
    adminId: number,
    dto: EditAdminDto,
    profileImage: Express.Multer.File,
  ) {
    let error = null;
    let data = profileImage ? { ...dto, profileImage: profileImage.filename} : { ...dto }

    const editAdminDetails: any = await this.adminModel
      .update(
        data,
        {
          where: {
            id: adminId,
          },
        },
      )
      .catch((err) => {
        error = err;
      });

    if (error) {
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `${Messages.FAILED_TO} edit admin profile.`,
        undefined,
        {
          errorMessage: error.original.sqlMessage,
          field: error.fields,
        },
      );
    }

    const [editAdminProfile] = editAdminDetails;

    if (editAdminProfile === 1) {
      return HandleResponse(
        HttpStatus.OK,
        `Admin profile ${Messages.UPDATE_SUCCESS}`,
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
