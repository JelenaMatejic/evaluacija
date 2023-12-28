import { Component, OnInit } from '@angular/core';
import {GroupTableDto} from "../../../dto/group/group-table.dto";
import {GroupService} from "../../../services/group.service";
import {ToastrService} from "ngx-toastr";
import {CreateGroupDto} from "../../../dto/group/create-group.dto";
import {SurveyTableDto} from "../../../dto/survey/survey-table.dto";
import {SurveyService} from "../../../services/survey.service";
import {SimpleGroupDto} from "../../../dto/group/simple-group.dto";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {CreateSurveyDto} from "../../../dto/survey/create-survey.dto";
import {AddGroupsDto} from "../../../dto/survey/add-groups.dto";

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
  surveys: SurveyTableDto[] = [];
  dtOptions: DataTables.Settings = {};
  fetched: boolean = false;
  form: any = {
    groups: []
  }
  dropdownSettings: IDropdownSettings = {};
  groups: SimpleGroupDto[] = [];
  selectedId: any = null;

  constructor(private groupService: GroupService, private surveyService: SurveyService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 20, 30, 50],
      processing: true,
      order: []
    };

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

    this.load();
  }

  load() {
    this.surveyService.getSurveys().subscribe((data) => {
      this.surveys = data;
      this.fetched = true;
    });
  }

  delete(id: string) {
    this.surveyService.removeSurvey(id).subscribe(data => {
        this.toastr.info("Anketa izbrisana");
        this.load();
      },
      error => {
        this.toastr.error(error);
      });
  }

  onSubmit() {
    const dto = new AddGroupsDto(
      this.form.groups,
    );
    this.surveyService.addGroups(this.selectedId, dto).subscribe(data => {
        this.toastr.success("Grupa dodata");
        // @ts-ignore
        document.getElementById('closeModalButton').click();
       this.load();
      },
      error => {
        const errm = error.error.message;
        this.toastr.error(Array.isArray(errm) ? errm[0] : errm);
      });
  }

  selectSurvey(id: any) {
    this.selectedId = id;
  }

}
