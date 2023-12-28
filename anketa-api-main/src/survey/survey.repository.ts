import { EntityRepository, Repository } from "typeorm";
import { Survey } from "./survey.entity";
import { InternalServerErrorException } from "@nestjs/common";
import { CreateSurveyDto } from "./dto/create-survey.dto";

@EntityRepository(Survey)
export class SurveyRepository extends Repository<Survey> {
  async createSurvey(createDto: CreateSurveyDto): Promise<Survey> {
    const { name, questions } = createDto;

    const survey = this.create({
      name,
      questions
    });

    try {
      return await this.save(survey);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
