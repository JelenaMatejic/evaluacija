
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  username: string = '';
  role: string = '';
  metar = {raw: ''};
  form: any = {
    icao: null
  };
  version: string = '0.1.0'

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.tokenService.getUser().name;
    this.role = this.tokenService.getUser().roles[0];
  }

  logout() {
    this.tokenService.signOut();
    this.router.navigate(['/login']);
  }

  onSubmit() {

  }

}
