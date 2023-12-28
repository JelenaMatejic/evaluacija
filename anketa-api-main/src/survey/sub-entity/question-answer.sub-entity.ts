import { AnswerUserSubEntity } from "./answer-user.sub-entity";

export class QuestionAnswerSubEntity {
  from: AnswerUserSubEntity;
  to: AnswerUserSubEntity;
  answer: string;
  response: string;
  responded:boolean = false;
}
