import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({unique: true})
  token: string;
  @ManyToOne(() => User, user => user.tokens, {eager: true})
  user: User;
  @Column()
  expire: Date
}