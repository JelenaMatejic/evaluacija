import { Component, OnInit } from '@angular/core';
import {AdminUserResponseDto} from "../../../dto/user/admin-user-response.dto";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {GroupTableDto} from "../../../dto/group/group-table.dto";
import {GroupService} from "../../../services/group.service";
import {CreateGroupDto} from "../../../dto/group/create-group.dto";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: GroupTableDto[] = [];
  dtOptions: DataTables.Settings = {};
  fetched: boolean = false;
  form: any = {
    name: null,
    users: []
  }

  constructor(private groupService: GroupService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 20, 30, 50],
      processing: true,
      order: []
    };

    this.load();
  }

  load() {
    this.groupService.getGroups().subscribe((data) => {
      this.groups = data;
      this.fetched = true;
    });
  }

  onSubmit() {
    const emails: string[] = [];
    for (let user of this.form.users) {
      emails.push(user.name);
    }
    const dto = new CreateGroupDto(
      this.form.name,
      emails
    );
    this.groupService.createGroup(dto).subscribe(data => {
      this.toastr.success("Grupa kreirana");
      // @ts-ignore
        document.getElementById('closeModalButton').click();
        this.load();
        },
      error => {
      const errm = error.error.message;
      this.toastr.error(Array.isArray(errm) ? errm[0] : errm);
    });
  }

  delete(id: string) {
    this.groupService.removeGroup(id).subscribe(data => {
        this.toastr.info("Grupa izbrisana");
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
