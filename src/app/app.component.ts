//Angular
import { Component } from '@angular/core';
//Rxjs
import { Observable } from 'rxjs';
//AngularFire
import { AngularFire, FirebaseAuthState } from 'angularfire2';
//Services
import { LoginService } from './services/login.service';
import { MembersService } from './services/members.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private user = {};

  constructor(
    private membersService: MembersService,
    private loginService: LoginService,
    private af: AngularFire,
  ) {
    this.user = this.loginService.user;
  }

  private admin: boolean;
 
  logout(): void {
    this.loginService.logout();
  }

  isAuth(): Observable<boolean> {
    return this.loginService.getAuthenticated()
               .map(user => user && user.hasOwnProperty('uid'));
  }

  isAdmin(): Observable<boolean> {
    return this.loginService.getAdmin();
  }

}
