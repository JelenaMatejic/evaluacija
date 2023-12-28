import { AnswerUserSubEntity } from "./answer-user.sub-entity";

export class QuestionAnswerSubEntity {
  from: AnswerUserSubEntity;
  to: AnswerUserSubEntity;
  answer: string;

  constructor(from: AnswerUserSubEntity, to: AnswerUserSubEntity, answer: string) {
    this.from = from;
    this.to = to;
    this.answer = answer;
  }
}
