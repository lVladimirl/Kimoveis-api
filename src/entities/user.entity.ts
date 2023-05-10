import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { SchedulesUsersProperties } from "./schedulesUserProperties.entity";


@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  isAdm: boolean;

  @Column()
  isActive: boolean;

  @Column()
  password: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @OneToMany(
    () => SchedulesUsersProperties,
    (ScheduleUserProperties) => ScheduleUserProperties.userId,
    {
      eager: true,
    }
  )
  SchedulesUsersProperties: SchedulesUsersProperties[];

  constructor(){
    if(!this.id) {
        this.id = uuid();
    }
  }
}
