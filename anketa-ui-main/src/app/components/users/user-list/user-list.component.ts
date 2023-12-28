import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {ProfileDto} from "../../../dto/user/profile.dto";
import {AdminUserResponseDto} from "../../../dto/user/admin-user-response.dto";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: AdminUserResponseDto[] = [];
  dtOptions: DataTables.Settings = {};
  fetched: boolean = false;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 20, 30, 50],
      processing: true,
      order: []
    };

    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      this.fetched = true;
    });
  }

  getRoleName(role: string) {
    switch (role) {
      case 'ADMIN':
        return 'Administrator';
      case 'USER':
        return 'Korisnik'
      default:
        return 'Unknown';
    }
  }
}
