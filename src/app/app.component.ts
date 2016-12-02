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

  isAuth(): boolean {
    if(this.loginservice.auth_status == "OK") {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    return this.loginservice.isAdmin;
  }

}
