import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {RegisterDto} from "../../../dto/auth/register.dto";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    email: null,
    name: null,
    password: null,
  };
  registerFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const register = new RegisterDto(
      this.form.email,
      this.form.email,
      this.form.password,
    );
    this.authService.register(register).subscribe((data) => {
      this.toastr.success('Uspešna registracija')
      this.router.navigate(['/login']);
    },
      error => {
        const errm = error.error.message;
        this.errorMessage = Array.isArray(errm) ? errm[0] : errm;
        this.registerFailed = true;
      });
  }

}
