import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {GroupTableDto} from "../dto/group/group-table.dto";
import {GroupDetailsDto} from "../dto/group/group-details.dto";
import {SurveyTableDto} from "../dto/survey/survey-table.dto";
import {CreateGroupDto} from "../dto/group/create-group.dto";
import {CreateSurveyDto} from "../dto/survey/create-survey.dto";
import {SurveyListForUserDto} from "../dto/survey/survey-list-for-user.dto";
import {AddGroupsDto} from "../dto/survey/add-groups.dto";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  getSurveys() {
    return this.http.get(this.baseUrl + '/survey').pipe(
      map((data: any) => data.map((item: any) => this.mapToSurveyTable(item))),
    );
  }

  getSurveysForUser() {
    return this.http.get(this.baseUrl + '/survey/for-user/all').pipe(
      map((data: any) => data.map((item: any) => this.mapToUserSurveyForList(item))),
    );
  }

  getSurveyForUser(surveyId: string) {
    return this.http.get(this.baseUrl + '/survey/for-user/one/' + surveyId);
  }

  getResults(surveyId: string) {
    return this.http.get(this.baseUrl + '/survey/result/one/' + surveyId);
  }

  getResultsUser(surveyId: string) {
    return this.http.get(this.baseUrl + '/survey/result-user/one/' + surveyId);
  }

  createSurvey(dto: CreateSurveyDto) {
    return this.http.post(this.baseUrl + '/survey', dto);
  }

  addGroups(id: any, dto: AddGroupsDto) {
    return this.http.post(this.baseUrl + '/survey/groups/add/' + id, dto);
  }

  postAnswers(id: string, dto: any) {
    return this.http.post(this.baseUrl + '/survey/for-user/one/' + id, dto);
  }

  postResponse(id: string, dto: any) {
    return this.http.post(this.baseUrl + '/survey/for-user/response/' + id, dto);
  }

  removeSurvey(id: string) {
    return this.http.delete(this.baseUrl + '/survey/' + id);
  }

  private mapToSurveyTable(item: any) {
    return new SurveyTableDto(
      item.id,
      item.name,
      item.numberOfGroups
    );
  }

  private mapToUserSurveyForList(item: any) {
    return new SurveyListForUserDto(
      item.id,
      item.name,
      item.canDo
    );
  }

  // private mapDetails(item: any) {
  //   return new GroupDetailsDto(
  //     item.id,
  //     item.name,
  //     item.numberOfUsers,
  //     item.users
  //   );
  // }
}
