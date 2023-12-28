import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: any = {
    newPassword: null,
  };
  isRequestFailed = false;
  errorMessage: string = '';
  token: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.resetPassword(this.token, this.form.newPassword).subscribe(
      data => {
        this.toastr.success("Lozinka promenjena")
        this.router.navigate(['/login']);
      },
      error => {
        const errm = error.error.message;
        this.errorMessage = Array.isArray(errm) ? errm[0] : errm;
        this.isRequestFailed = true;
      }
    )
  }

}
