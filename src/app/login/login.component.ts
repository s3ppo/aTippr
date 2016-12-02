//Angular
import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material2
import { MdSnackBar } from '@angular/material';
//Services
import { LoginService } from '../services/login.service';
//Models
import { LoginModel } from '../models/login';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MdSnackBar]
})
export class LoginComponent {

  constructor(
    private router: Router,
    private loginservice: LoginService,
    private snackBar: MdSnackBar
  ){}

  loginmodel = new LoginModel('','');

  doLogin(): void {
    this.loginservice.login(this.loginmodel)
        .subscribe(data =>  { this.router.navigate(['/dashboard']); },
                   error => { this.snackBar.open(this.loginservice.auth_status, 'Close')} );
  }

  loginGoogle(): void {

  }

}