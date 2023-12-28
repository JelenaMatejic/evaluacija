import { QuestionAnswerSubEntity } from "./question-answer.sub-entity";

export class QuestionSubEntity {
  question: string;
  answers: QuestionAnswerSubEntity[] = [];

  constructor(question: string, answers: QuestionAnswerSubEntity[]) {
    this.question = question;
    this.answers = answers;
  }
}
