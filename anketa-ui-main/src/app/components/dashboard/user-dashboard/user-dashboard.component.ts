import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../../../services/survey.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  surveys: any = [];

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.surveyService.getSurveysForUser().subscribe(data => {
      this.surveys = data;
    });
  }

}
