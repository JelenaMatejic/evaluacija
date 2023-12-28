import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GroupRepository } from "../group/group.repository";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { Survey } from "./survey.entity";
import { SurveyRepository } from "./survey.repository";
import { Group } from "../group/group.entity";
import { SurveyTableDto } from "./dto/survey-table.dto";
import { User } from "../auth/user.entity";
import { SurveyListForUserDto } from "./dto/survey-list-for-user.dto";
import { SingleUserSurveyDto } from "./dto/single-user-survey.dto";
import { QuestionSubEntity } from "./sub-entity/question.sub-entity";
import { AnswerUserSubEntity } from "./sub-entity/answer-user.sub-entity";
import { QuestionAnswerSubEntity } from "./sub-entity/question-answer.sub-entity";
import { UserRepository } from "../auth/user.repository";
import { AnsweredFromSubentity } from "./sub-entity/answeredFrom.subentity";
import { AddGroupsDto } from "./dto/add-groups.dto";
import { ResponseDto } from "./dto/response.dto";

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(GroupRepository) private groupRepository: GroupRepository,
    @InjectRepository(SurveyRepository) private surveyRepository: SurveyRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async createSurvey(creatDto: CreateSurveyDto): Promise<Survey> {
    const survey = await this.surveyRepository.createSurvey(creatDto);
    const groups: Group[] = [];
    for (let groupId of creatDto.groups) {
      const group = await this.groupRepository.findOne(groupId.id);
      if (group) {
        groups.push(group);
      }
    }
    survey.groups = groups;
    return await this.surveyRepository.save(survey);
  }

  async addGroups(id: string, dto: AddGroupsDto): Promise<void> {
    const survey = await this.surveyRepository.findOne(id);
    if (!survey) {
      throw new NotFoundException("Survey not found");
    }

    const groups: Group[] = [];
    for (let groupId of dto.groups) {
      const group = await this.groupRepository.findOne(groupId.id);
      if (group) {
        groups.push(group);
      }
    }
    if (survey.groups === undefined || survey.groups === null) {
      survey.groups = groups;
    } else {
      survey.groups.push(...groups);
    }

    await this.surveyRepository.save(survey);
  }

  async removeSurvey(id: string): Promise<void> {
    await this.surveyRepository.delete(id);
  }

  async getById(id: string): Promise<Survey> {
    return await this.surveyRepository.findOne(id);
  }

  async getAllSurveys(): Promise<SurveyTableDto[]> {
    const surveys = await this.surveyRepository.find();
    const res: SurveyTableDto[] = [];
    for (let survey of surveys) {
      const dto = new SurveyTableDto(survey.id, survey.name, survey.groups != undefined ? survey.groups.length : 0);
      res.push(dto);
    }

    return res;
  }

  async getSurveysForUser(user: User): Promise<SurveyListForUserDto[]> {
    user = await this.userRepository.findOne(user.id, { relations: ['groups']});
    const groups = user.groups
    const response: SurveyListForUserDto[] = [];
    for (let group of groups) {
      group = await this.groupRepository.findOne(group.id, { relations: ['surveys']})
      for (let survey of group.surveys) {
        const res = new SurveyListForUserDto(survey.id, survey.name);
        res.canDo = true;
        if (survey.answeredFrom !== null) {
          if (survey.answeredFrom.ids.includes(user.id)) {
            res.canDo = false;
          }
        }
        response.push(res);
      }
    }

    return response;
  }

  async getSurveyForSpecificUser(user: User, id: string): Promise<SingleUserSurveyDto> {
    const survey = await this.surveyRepository.findOne(id, {relations: ['groups']});
    if (!survey) {
      throw new NotFoundException("Survey not found");
    }
    const response = new SingleUserSurveyDto();
    response.userId = user.id;
    response.id = survey.id;
    response.name = survey.name;
    const from = this.answerUserSubEntity(user);
    const questions: QuestionSubEntity[] = [];
    for (let question of survey.questions) {
      const q = new QuestionSubEntity();
      q.question = question.question;
      const answers: QuestionAnswerSubEntity[] = [];
      for (let group of survey.groups) {
        if (this.userInGroup(user, group)) {
          for (let userInGroup of group.users) {
            if (user.id !== userInGroup.id) {
              const to = this.answerUserSubEntity(userInGroup);
              const answer = new QuestionAnswerSubEntity();
              answer.from = from;
              answer.to = to;
              answers.push(answer);
            }
          }

          if (group.toAdd !== undefined && group.toAdd !== null) {
            for (let userToBe of group.toAdd.emails) {
              if (user.email !== userToBe) {
                const toBe = new AnswerUserSubEntity();
                toBe.id = undefined;
                toBe.name = userToBe;
                toBe.email = userToBe;
                const answer = new QuestionAnswerSubEntity();
                answer.from = from;
                answer.to = toBe;
                answers.push(answer);
              }
            }
          }
        }
      }
      q.answers = answers;
      questions.push(q);
    }

    response.questions = questions;
    return response;
  }

  async saveAnswer(user: User, id: string, dto: SingleUserSurveyDto): Promise<void> {
    const survey = await this.surveyRepository.findOne(id);
    if (!survey) {
      throw new NotFoundException("Survey not found");
    }

    for (let question of survey.questions) {
      if (question.answers === undefined || question.answers === null) {
        question.answers = [];
      }
      question.answers.push(...dto.questions.find(el => el.question == question.question).answers);
    }

    if (survey.answeredFrom === null) {
      survey.answeredFrom = new AnsweredFromSubentity();
    }

    survey.answeredFrom.ids.push(user.id);

    await this.surveyRepository.save(survey);
  }

  async setResponse(surveyId: string, user: User, res: ResponseDto): Promise<void> {
    const survey = await this.surveyRepository.findOne(surveyId);
    if (!survey) {
      throw new NotFoundException("Survey not found");
    }

    for (let question of survey.questions) {
      if (question.question === res.question) {
        for (let answer of question.answers) {
          if (answer.to.email === user.email && answer.from.email === res.from) {
            answer.responded = true;
            answer.response = res.response;
            await this.surveyRepository.save(survey);
            return;
          }
        }
      }
    }

    return;
  }

  private userInGroup(user: User, group: Group): boolean {
    for (let member of group.users) {
      if (member.id === user.id) {
        return true;
      }
    }
    return false;
  }

  private answerUserSubEntity(user: User): AnswerUserSubEntity {
    const res = new AnswerUserSubEntity();
    res.id = user.id;
    res.name = user.name;
    res.email = user.email;

    return res;
  }
}
