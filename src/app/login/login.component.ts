import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MdSnackBar } from '@angular/material';

import { LoginService } from '../services/login.service';
import { LoginModel } from '../models/login';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MdSnackBar]
})
export class LoginComponent {

  constructor(
    private loginservice: LoginService,
    private snackBar: MdSnackBar
  ){}

  private loginmodel: LoginModel;

  loginGoogle(): void {
    this.loginservice.loginGoogle();
  }
}