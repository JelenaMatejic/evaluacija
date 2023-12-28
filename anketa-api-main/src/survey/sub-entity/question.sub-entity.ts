import { QuestionAnswerSubEntity } from "./question-answer.sub-entity";

export class QuestionSubEntity {
  question: string;
  answers: QuestionAnswerSubEntity[] = [];
}
