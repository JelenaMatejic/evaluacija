import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../dto/auth/register.dto";
import {ProfileDto} from "../dto/user/profile.dto";
import { map } from 'rxjs/operators';
import {UpdateProfileDto} from "../dto/user/update-profile.dto";
import {ChangePasswordDto} from "../dto/user/change-password.dto";
import {AdminUserResponseDto} from "../dto/user/admin-user-response.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  getProfile() {
    return this.http.get(this.baseUrl + '/profile').pipe(
      map((data: any) => this.mapProfile(data))
    );
  }

  getAllUsers() {
    return this.http.get(this.baseUrl + '/users').pipe(
      map((data: any) => data.map((item: any) => this.mapToAdminResp(item))),
    );
  }

  getUserById(id: string) {
    return this.http.get(this.baseUrl + '/users/' + id).pipe(
      map((data: any) => this.mapToAdminResp(data))
    );
  }

  updateProfile(profileDto: UpdateProfileDto) {
    return this.http.put(this.baseUrl + '/profile', profileDto);
  }

  changePassword(changeDto: ChangePasswordDto) {
    return this.http.put(this.baseUrl + '/profile/change-password', changeDto);
  }

  private mapProfile(item: any) {
    return new ProfileDto(
      item.id,
      item.email,
      item.name,
      item.role,
    );
  }

  private mapToAdminResp(item: any) {
    return new AdminUserResponseDto(
      item.id,
      item.email,
      item.name,
      item.role,
      item.numberOfProjects
    );
  }
}


