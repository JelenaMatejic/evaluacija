import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterDto} from "../dto/auth/register.dto";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + '/auth/signin', {
      email,
      password
    }, httpOptions);
  }

  register(register: RegisterDto) {
    return this.http.post(this.baseUrl + '/auth/signup', register);
  }

  forgotPassword(email: string) {
    return this.http.post(this.baseUrl + '/auth/forgot-password', {email});
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post(this.baseUrl + '/auth/reset-password', {token, newPassword});
  }
}
