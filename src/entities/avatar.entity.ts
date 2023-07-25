import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./user.entity";

@Entity("avatars")
export default class Avatar {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 127 })
  name: string;

  @Column({ type: "text" })
  path: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @OneToOne(() => User, (user) => user.avatar, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;
}
