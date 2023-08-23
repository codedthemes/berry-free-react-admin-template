// server/src/entity/User.ts
import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { IsEmail, Length, IsNotEmpty } from "class-validator";

@Entity()
export class User extends BaseEntity {
  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @IsNotEmpty()
  firstName!: string;

  @Column()
  @IsNotEmpty()
  lastName!: string;

  @Column()
  @Length(8, 50) // Password should be between 8 and 50 characters
  password!: string;
}
