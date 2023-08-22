// server/src/entity/User.ts
import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class User extends BaseEntity {
  @Column()
  username!: string;

  @Column()
  email!: string;
}
