import { Sequelize } from "sequelize";
import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Default,
  AllowNull,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Users } from "./users.model";
import { IsString, MaxLength } from "class-validator";
import { ProjectAssignTo } from "./projectAssignTo.model";

@Table
export class Project extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @MaxLength(11)
  @Column
  addedBy: number;

  @AllowNull(false)
  @IsString()
  @MaxLength(255)
  @Column
  projectName: string;

  @AllowNull(false)
  @Column
  description: string;

  @AllowNull(false)
  @MaxLength(20)
  @Column
  duration: string;

  @AllowNull(false)
  @Column
  technologies: string;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({ type: "TIMESTAMP" })
  createdAt: Date;

  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal(
      "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ),
  })
  updatedAt: Date;

  @HasMany(() => ProjectAssignTo, { foreignKey: "projectId" })
  ProjectAssignTo: ProjectAssignTo;

  @BelongsTo(() => Users)
  users: Users[];
}
