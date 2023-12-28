import { IsArray, IsString } from "class-validator";
import { SimpleGroupDto } from "../../group/dto/simple-group.dto";
import { QuestionDto } from "./question.dto";

export class CreateSurveyDto {
  @IsString()
  name: string;
  @IsArray()
  groups: SimpleGroupDto[];
  @IsArray()
  questions: QuestionDto[];
}
