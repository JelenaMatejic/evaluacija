import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../../services/survey.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-users-survey',
  templateUrl: './users-survey.component.html',
  styleUrls: ['./users-survey.component.css']
})
export class UsersSurveyComponent implements OnInit {
  id = '';
  survey: any = {}

  constructor(private surveyService: SurveyService, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.surveyService.getSurveyForUser(this.id).subscribe(data => {
      this.survey = data;
    })
  }

  onSubmit() {
    if (!this.valid()) {
      this.toastr.error("Morate popuniti sve odgovore!")
    } else {
      this.surveyService.postAnswers(this.id, this.survey).subscribe(data => {
        this.toastr.success("Hvala, uspešno ste popunili anketu");
        this.router.navigate(['/central/surveys']);
      });
    }
  }

  valid() {
    for (let question of this.survey.questions) {
      for (let answer of question.answers) {
        if (answer.answer === undefined || answer.answer === null || answer.answer === '') {
          return false;
        }
      }
    }
    return true;
  }

}
