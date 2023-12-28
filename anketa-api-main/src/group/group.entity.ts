import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/user.entity";
import { Survey } from "../survey/survey.entity";
import { QuestionSubEntity } from "../survey/sub-entity/question.sub-entity";
import { ToaddSubentity } from "./toadd.subentity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToMany(() => User, (user: User) => user.groups, {eager: true})
  @JoinTable()
  users: User[];
  @ManyToMany(() => Survey, (survey: Survey) => survey.groups)
  surveys: Survey[];
  @Column({type: 'jsonb', nullable: true})
  toAdd: ToaddSubentity;
}
