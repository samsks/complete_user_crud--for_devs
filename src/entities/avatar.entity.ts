import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
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

  @OneToOne(() => User, (user) => user.avatar, { cascade: true })
  @JoinColumn()
  user: User;
}
