import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {UpdateProfileDto} from "../dto/user/update-profile.dto";
import {ChangePasswordDto} from "../dto/user/change-password.dto";
import {ProfileDto} from "../dto/user/profile.dto";
import {AdminUserResponseDto} from "../dto/user/admin-user-response.dto";
import {GroupTableDto} from "../dto/group/group-table.dto";
import {CreateGroupDto} from "../dto/group/create-group.dto";
import {GroupDetailsDto} from "../dto/group/group-details.dto";
import {SimpleGroupDto} from "../dto/group/simple-group.dto";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  getGroups() {
    return this.http.get(this.baseUrl + '/group').pipe(
      map((data: any) => data.map((item: any) => this.mapToGroupTable(item))),
    );
  }

  getSimpleGroups() {
    return this.http.get(this.baseUrl + '/group/simple/all').pipe(
      map((data: any) => data.map((item: any) => this.mapSimple(item))),
    );
  }

  getGroupById(id: string) {
    return this.http.get(this.baseUrl + '/group/' + id).pipe(
      map((data: any) => this.mapDetails(data))
    );
  }

  createGroup(dto: CreateGroupDto) {
    return this.http.post(this.baseUrl + '/group', dto);
  }

  removeGroup(id: string) {
    return this.http.delete(this.baseUrl + '/group/' + id);
  }

  removeUserFromGroup(id: string, userId: string) {
    return this.http.delete(this.baseUrl + '/group/' + id + '/users/' + userId);
  }


  addUsers(users: string[], id: string) {
    return this.http.put(this.baseUrl + '/group/users/' + id, {users});
  }

  private mapToGroupTable(item: any) {
    return new GroupTableDto(
      item.id,
      item.name,
     item.numberOfUsers
    );
  }

  private mapDetails(item: any) {
    return new GroupDetailsDto(
      item.id,
      item.name,
      item.numberOfUsers,
      item.users,
      item.toAdd
    );
  }

  private mapSimple(item: any) {
    return new SimpleGroupDto(
      item.id,
      item.name
    );
  }
}
