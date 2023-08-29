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

  @Column({ nullable: true })
  @IsNotEmpty()
  signUpDate!: Date;

  @Column({ nullable: true })
  @IsNotEmpty()
  bloodType!: string;

  @Column({ nullable: true })
  @IsNotEmpty()
  dateOfLastDonation!: Date;

  @Column({ nullable: true })
  @IsNotEmpty()
  location!: string;

  @Column({ nullable: true })
  @IsNotEmpty()
  contactInformation!: string;

  @Column({ nullable: true })
  @IsNotEmpty()
  medicalHistory!: string;

  @Column({ nullable: true })
  @IsNotEmpty()
  age!: number;

  @Column({ nullable: true })
  @IsNotEmpty()
  weight!: number;

  @Column({ nullable: true })
  @IsNotEmpty()
  gender!: string;

  @Column({ nullable: true })
  @IsNotEmpty()
  donationPreferences!: string;

  @Column({ nullable: true })
  @IsNotEmpty()
  availability!: string;

  @Column({ nullable: true })
  @IsNotEmpty()
  consentForFutureContact!: boolean;
}
