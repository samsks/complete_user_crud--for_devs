import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user.entity";

@Entity("users-profile_img")
export default class userProfileImg {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 127 })
  name: string;

  @Column({ type: "text" })
  path: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
