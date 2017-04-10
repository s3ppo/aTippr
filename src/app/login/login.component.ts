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
import { LoginModel } from '../models/login';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MdSnackBar]
})
export class LoginComponent {

  constructor(
    public router: Router,
    public loginservice: LoginService,
    public snackBar: MdSnackBar,
    public translate: TranslateService
  ){}

  loginmodel = new LoginModel('','');

  doLogin(): void {
    this.loginservice.emailLogin(this.loginmodel)
        .then(data => { this.router.navigate(['/dashboard']) },
              err  => { this.snackBar.open(err, 'Close', {duration: 2000}) });
  }

  loginSocial(provider: string): void {
    if(provider == 'google') {
      this.loginservice.loginGoogle()
          .then(data => { this.router.navigate(['/dashboard']) },
                err  => { this.snackBar.open(err, 'Close', {duration: 2000}) });
    } else if (provider == 'facebook') {
      this.loginservice.loginFacebook()
          .then(data => { this.router.navigate(['/dashboard']) },
                err  => { this.snackBar.open(err, 'Close', {duration: 2000}) });
    } else if (provider == 'twitter') {
      this.translate.get('Twitter login noch nicht möglich!').subscribe( translation => {
        this.snackBar.open(translation, 'Close', {duration: 2000})
      })
    }
  }

  ngOnDestroy() {
    
  }

}