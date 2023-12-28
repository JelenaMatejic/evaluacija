import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get, Param,
  Post,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SurveyService } from "./survey.service";
import RoleGuard from "../auth/role.guard";
import { RoleEnum } from "../auth/role.enum";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { Survey } from "./survey.entity";
import { SurveyTableDto } from "./dto/survey-table.dto";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";
import { SurveyListForUserDto } from "./dto/survey-list-for-user.dto";
import { SingleUserSurveyDto } from "./dto/single-user-survey.dto";
import { AddGroupsDto } from "./dto/add-groups.dto";
import { ResponseDto } from "./dto/response.dto";

@Controller('survey')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class SurveyController {

  constructor(private surveyService: SurveyService) {
  }

  @Post()
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  getAllUsers(@Body() createDto: CreateSurveyDto): Promise<Survey> {
    return this.surveyService.createSurvey(createDto);
  }

  @Get()
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  getAllGroups(): Promise<SurveyTableDto[]> {
    return this.surveyService.getAllSurveys();
  }

  @Delete('/:id')
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  removeGroup(@Param('id') id: string): Promise<void> {
    return this.surveyService.removeSurvey(id);
  }

  @Get('/for-user/all')
  @UseGuards(RoleGuard(RoleEnum.USER))
  getForUser(@GetUser() user: User): Promise<SurveyListForUserDto[]> {
    return this.surveyService.getSurveysForUser(user);
  }

  @Get('/for-user/one/:id')
  @UseGuards(RoleGuard(RoleEnum.USER))
  getSingleForSpecificUser(@GetUser() user: User, @Param('id') id: string): Promise<SingleUserSurveyDto> {
    return this.surveyService.getSurveyForSpecificUser(user, id);
  }

  @Post('/for-user/one/:id')
  @UseGuards(RoleGuard(RoleEnum.USER))
  surveyAnswer(@GetUser() user: User, @Param('id') id: string, @Body() dto: SingleUserSurveyDto): Promise<void> {
    return this.surveyService.saveAnswer(user, id, dto);
  }

  @Post('/for-user/response/:id')
  @UseGuards(RoleGuard(RoleEnum.USER))
  addResponse(@GetUser() user: User, @Param('id') id: string, @Body() dto: ResponseDto): Promise<void> {
    return this.surveyService.setResponse(id, user, dto);
  }

  @Post('/groups/add/:id')
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  addGroups(@Param('id') id: string, @Body() dto: AddGroupsDto): Promise<void> {
    return this.surveyService.addGroups(id, dto);
  }

  @Get('/result/one/:id')
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  surveyResult(@Param('id') id: string): Promise<Survey> {
    return this.surveyService.getById(id);
  }

  @Get('/result-user/one/:id')
  @UseGuards(RoleGuard(RoleEnum.USER))
  surveyResultUser(@Param('id') id: string): Promise<Survey> {
    return this.surveyService.getById(id);
  }
}
