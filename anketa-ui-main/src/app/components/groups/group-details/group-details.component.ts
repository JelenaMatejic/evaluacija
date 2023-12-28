import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {GroupService} from "../../../services/group.service";
import {CreateGroupDto} from "../../../dto/group/create-group.dto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  group: any = undefined;
  id: string = '';
  form: any = {
    users: []
  }

  constructor(private groupService: GroupService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 20, 30, 50],
      processing: true,
      order: []
    };
    this.id = this.activatedRoute.snapshot.params['id'];
    this.load();
  }

  load() {
    this.groupService.getGroupById(this.id).subscribe((data) => {
      this.group = data;
    });
  }

  onSubmit() {
    const emails: string[] = [];
    for (let user of this.form.users) {
      emails.push(user.name);
    }
    this.groupService.addUsers(emails, this.id).subscribe(data => {
        this.toastr.success("Korisnici dodati");
        // @ts-ignore
        document.getElementById('closeModalButton').click();
        this.load();
      },
      error => {
        const errm = error.error.message;
        this.toastr.error(Array.isArray(errm) ? errm[0] : errm);
      });
  }

  delete(userId: string) {
    this.groupService.removeUserFromGroup(this.id, userId).subscribe(data => {
        this.toastr.info("Korisnik uklonjen iz grupe");
        this.load();
      },
      error => {
        this.toastr.error(error);
      });
  }

  addUser() {
    this.form.users.push({name: null});
  }
  removeUser(i: number) {
    this.form.users.splice(i, 1);
  }
}
