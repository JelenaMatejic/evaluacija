import { Component, OnInit } from '@angular/core';
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {GroupService} from "../../../services/group.service";
import {SurveyService} from "../../../services/survey.service";
import {ToastrService} from "ngx-toastr";
import {SimpleGroupDto} from "../../../dto/group/simple-group.dto";
import {CreateSurveyDto} from "../../../dto/survey/create-survey.dto";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent implements OnInit {
  form: any = {
    name: null,
    groups: [],
    questions:[]
  }
  groups: SimpleGroupDto[] = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private groupService: GroupService, private surveyService: SurveyService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Izaberi sve',
      unSelectAllText: 'Poništi izbor',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.groupService.getSimpleGroups().subscribe((data) => {
      this.groups = data;
    });
  }

  onSubmit() {
    const dto = new CreateSurveyDto(
      this.form.name,
      this.form.groups,
      this.form.questions
    );
    this.surveyService.createSurvey(dto).subscribe(data => {
        this.toastr.success("Anketa kreirana");
        this.router.navigate(['/admin/surveys'])
      },
      error => {
        const errm = error.error.message;
        this.toastr.error(Array.isArray(errm) ? errm[0] : errm);
      });
  }

  addQuestion() {
    this.form.questions.push({question: null});
  }
  removeQuestion(i: number) {
    this.form.questions.splice(i, 1);
  }
}
