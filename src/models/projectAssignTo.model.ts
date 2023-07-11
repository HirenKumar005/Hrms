import { Sequelize } from "sequelize";
import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Project } from "./project.model";
import { MaxLength } from "class-validator";
import { Users } from "./users.model";

@Table
export class ProjectAssignTo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Project)
  @AllowNull(false)
  @MaxLength(11)
  @Column
  projectId: number;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @MaxLength(11)
  @Column
  assignTo: number;

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

  @BelongsTo(() => Project)
  project: Project[];

  @BelongsTo(() => Users)
  user: Users[];
}
