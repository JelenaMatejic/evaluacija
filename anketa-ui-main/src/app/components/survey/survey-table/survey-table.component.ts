import { Component, OnInit } from '@angular/core';
import {SimpleGroupDto} from "../../../dto/group/simple-group.dto";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {GroupService} from "../../../services/group.service";
import {SurveyService} from "../../../services/survey.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateSurveyDto} from "../../../dto/survey/create-survey.dto";
import {TokenService} from "../../../services/token.service";

@Component({
  selector: 'app-survey-table',
  templateUrl: './survey-table.component.html',
  styleUrls: ['./survey-table.component.css']
})
export class SurveyTableComponent implements OnInit {

  id = '';
  survey: any = {}
  isAdmin = false;
  name = null;

  constructor(private tokenService: TokenService, private surveyService: SurveyService, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.name = this.tokenService.getUser().name;
    if (this.tokenService.getUser().roles.includes('ADMIN')) {
      this.isAdmin = true;
    }
    this.load();
  }

  load() {
    if (this.isAdmin) {
      this.surveyService.getResults(this.id).subscribe(data => {
        this.survey = data;
      });
    } else {
      this.surveyService.getResultsUser(this.id).subscribe(data => {
        this.survey = data;
      });
    }
  }

  postResponse(question: string, response: string, from: string) {
    this.surveyService.postResponse(this.id, {question, response, from}).subscribe(data => {
      this.toastr.success("Uspešno ste poslali odgovor na sugestiju");
      this.load();
    });
  }
}
