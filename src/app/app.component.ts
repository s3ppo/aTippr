//Angular
import { Component } from '@angular/core';
//Rxjs
import { Observable } from 'rxjs';
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
    private membersservice: MembersService,
  ) {}

  private admin: boolean;
 
  logout(): void {
    this.loginservice.logout();
  }

  isAuth(): Boolean {
    return this.loginservice.isLoggedIn();
  }

  isAdmin(): boolean {
    if(this.loginservice.self.hasOwnProperty('admin')) {
      return this.loginservice.self['admin'];
    } else {
      return false;
    }
  }

}
