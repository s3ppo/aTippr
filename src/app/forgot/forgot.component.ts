//Angular
import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Translate
import { TranslateService } from 'ng2-translate';
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
    private loginService: LoginService,
    private snackBar: MdSnackBar,
    private translate: TranslateService,
  ){}

  forgotmodel = new ForgotModel('');

  doForgot(): void {
    this.loginService.resetUserPW(this.forgotmodel).then( resp => {
      this.translate.get('eMail wurde gesendet').subscribe( translation => {
        this.snackBar.open(translation, 'Close', { duration: 2000 })
      })
    }).catch( error => {
      this.snackBar.open(error, 'Close', { duration: 2000 })
    });
  }

}