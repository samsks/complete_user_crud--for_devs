import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 20 })
  username: string;

  @Column({
    type: "varchar",
    length: 50,
    unique: true,
  })
  email: string;

  @Column({ type: "varchar", length: 127 })
  password: string;

  @Column({ type: "varchar", length: 127, nullable: true })
  profile_image: string;

  @Column({ type: "varchar", length: 30 })
  first_name: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  middle_name: string;

  @Column({ type: "varchar", length: 20 })
  last_name: string;

  @Column({ type: "varchar", length: 18 })
  phone_number: string;

  @Column({ type: "date" })
  birthday: string;

  @Column({ nullable: true })
  reset_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
