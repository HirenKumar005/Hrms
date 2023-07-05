import * as moment from 'moment';
import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';

@Table
export class SupportIssues extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  issue: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  insertCreated() {
    this.created_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
    );
    this.updated_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
    );
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updated_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
    );
  }

  @Column({ defaultValue: false })
  isDeleted: boolean;
}