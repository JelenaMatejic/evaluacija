import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/user.entity";
import { Group } from "../group/group.entity";
import { QuestionSubEntity } from "./sub-entity/question.sub-entity";
import { AnsweredFromSubentity } from "./sub-entity/answeredFrom.subentity";

@Entity()
export class Survey {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({type: 'jsonb', nullable: true})
  answeredFrom: AnsweredFromSubentity;
  @ManyToMany(() => Group, (group: Group) => group.surveys, {eager: true})
  @JoinTable()
  groups: Group[];
  @Column({type: 'jsonb', nullable: true})
  questions: QuestionSubEntity[];
}
