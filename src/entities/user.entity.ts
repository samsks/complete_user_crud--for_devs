import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Avatar from "./avatar.entity";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 20, unique: true })
  username: string;

  @Column({ type: "varchar", length: 50, unique: true })
  email: string;

  @Column({ type: "varchar", length: 127 })
  password: string;

  @Column({ type: "varchar", length: 30 })
  first_name: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  middle_name?: string | null | undefined;

  @Column({ type: "varchar", length: 20 })
  last_name: string;

  @Column({ type: "varchar", length: 18 })
  phone_number: string;

  @Column({ type: "date" })
  birthday: string;

  @Column({ type: "boolean", default: false })
  is_superuser: boolean;

  @Column({ type: "varchar", nullable: true })
  reset_token?: string | null | undefined;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @OneToOne(() => Avatar, (avatar) => avatar.user)
  avatar: Avatar;
}
