import { Entity, Column, PrimaryColumn, OneToMany, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { v4 as uuid } from "uuid";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity()
export class SchedulesUsersProperties {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  date: Date;

  @Column()
  hour: string;

  @ManyToOne(() => User, (user) => user.id)
  userId: User;

  @ManyToOne(() => Properties, (properties) => properties.id)
  propertyId: Properties;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
