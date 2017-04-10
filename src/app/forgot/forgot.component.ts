//Angular
import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Translate
import { TranslateService } from '@ngx-translate/core';
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
    public router: Router,
    public loginService: LoginService,
    public snackBar: MdSnackBar,
    public translate: TranslateService,
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