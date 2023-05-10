import {
    Entity,
    Column,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    OneToMany,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
  import { Adresses } from "./adress.entity";
  import { Categories } from "./categories.entity";
  import { SchedulesUsersProperties } from "./schedulesUserProperties.entity";
  
  @Entity()
  export class Properties {
    @PrimaryColumn("uuid")
    readonly id: string;
  
    @Column()
    sold: boolean;
  
    @Column("float")
    value: number;
  
    @Column()
    size: number;
  
    @Column()
    createdAt: string;
  
    @Column()
    updatedAt: string;
  
    @OneToOne((type) => Adresses, {
      eager: true,
    })
    @JoinColumn()
    addressId: Adresses;
  
    @ManyToOne(() => Categories, (categories) => categories.properties)
    categoryId: Categories;
  
    @OneToMany(() => SchedulesUsersProperties, (schedules) => schedules.propertyId,{
      eager: true,
    })
    schedules: SchedulesUsersProperties[];
  
    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
      if (!this.sold) {
        this.sold = false;
      }
    }
  }
  