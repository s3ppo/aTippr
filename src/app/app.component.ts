//Angular
import { Component } from '@angular/core';
//Rxjs
import { Observable } from 'rxjs';
//Backand
import { BackandService } from 'angular2bknd-sdk';
// Services
import { LoginService } from './services/login.service';
import { MembersService } from './services/members.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private loginservice: LoginService,
    private backandService: BackandService,
  ) {
    this.backandService.setAppName('atipper')
    this.backandService.setSignUpToken('ea073201-5dea-4c45-9d7b-3c155513cdda');
    this.backandService.setAnonymousToken('dc201b54-8f35-41b7-8def-eea36ef80ec6');
  }

  private admin: boolean;
 
  logout(): void {
    this.loginservice.logout();
  }

  isAuth(): Boolean {
    return this.loginservice.isLoggedIn();
  }

  isAdmin(): boolean {
    if(this.loginservice.self.hasOwnProperty['admin']) {
      return this.loginservice.self['admin'];
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    return this.loginservice.isAdmin;
  }

}
