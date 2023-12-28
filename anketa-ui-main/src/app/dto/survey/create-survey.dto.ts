import {SimpleGroupDto} from "../group/simple-group.dto";
import {QuestionDto} from "./question.dto";

export class CreateSurveyDto {
  name: string;
  groups: SimpleGroupDto[];
  questions: QuestionDto[]

  constructor(name: string, groups: SimpleGroupDto[], questions: QuestionDto[]) {
    this.name = name;
    this.groups = groups;
    this.questions = questions;
  }
}
