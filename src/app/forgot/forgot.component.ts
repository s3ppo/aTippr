//Angular
import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material
import { MdSnackBar } from '@angular/material';
//Services
import { LoginService } from '../services/login.service';
//Models
import { ForgotModel } from '../models/forgot';

@Component({
  selector: 'Forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
  providers: [MdSnackBar]
})
export class ForgotComponent {

  constructor(
    private router: Router,
    private loginservice: LoginService,
    private snackBar: MdSnackBar,
  ){}

  forgotmodel = new ForgotModel('');

  doForgot(): void {
    
  }

}