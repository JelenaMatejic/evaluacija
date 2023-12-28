import { QuestionDto } from "./question.dto";
import { QuestionSubEntity } from "../sub-entity/question.sub-entity";

export class SingleUserSurveyDto {
  id: string;
  name: string;
  userId: string;
  questions: QuestionSubEntity[];
}
